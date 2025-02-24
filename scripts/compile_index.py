import json
from dataclasses import dataclass

import yaml

FILE_PATH_TEMPLATE = "docs/content/pages/{}.mdoc"
INPUT_PATH = "docs/content/navigation.json"
OUTPUT_PATH = "docs/autogen/index.json"
OPENAPI_PATH = "docs/public/openapi.json"


@dataclass
class NavigationItem:
    title: str
    url: str
    section: str
    schema: str
    description: str
    references: list[str]


def get_raw_data():
    with open(INPUT_PATH, "r") as f:
        return json.load(f)


def read_file(slug: str) -> str:
    file_path = FILE_PATH_TEMPLATE.format(slug)
    with open(file_path, "r") as f:
        return f.read()


def reshape_data(raw_data):
    openapi_data = json.load(open(OPENAPI_PATH))
    schemas = openapi_data["components"]["schemas"]
    data = []
    # Flatten the navigation hierarchy from a tree of `section -> subsection -> slug` to a list of `(section, subsection, slug).`
    pages = []
    for section, subsections in raw_data.items():
        for subsection in subsections:
            for item in subsection.get("items") or []:
                if item.get("discriminant") == "page":
                    pages.append((section, subsection["name"], item.get("value")))

    # Cache the full text of each page since we're doing a lot of O(n^2) stuff and I/O is painful.
    slug_to_full_content = {slug: read_file(slug) for (_, _, slug) in pages}

    # Another caching mechanism that is probably overkill...
    openapi_enum_to_slug = {
        yaml.safe_load(slug_to_full_content[slug].split("---")[1]).get("enum"): slug
        for (_, _, slug) in pages
        if "enum" in slug_to_full_content[slug]
    }

    for section, subsection, slug in pages:
        raw_frontmatter = slug_to_full_content[slug].split("---")[1]
        frontmatter = yaml.safe_load(raw_frontmatter)
        title = frontmatter["title"]
        if frontmatter.get("enum"):
            section_name = "Reference"
        else:
            section_name = section
        references = set()

        # Add references from the OpenAPI spec.
        for schema_name, schema in schemas.items():
            if any(
                title in prop.get("$ref", "")
                for prop in schema.get("properties", {}).values()
            ):
                if schema_name in openapi_enum_to_slug:
                    references.add(openapi_enum_to_slug[schema_name])

        # Add references from other pages.
        for _, _, other_slug in pages:
            if f"/{slug}" in read_file(other_slug):
                references.add(other_slug)

        data.append(
            NavigationItem(
                title=title,
                url=slug,
                section=section_name,
                schema=frontmatter.get("schema") or frontmatter.get("enum"),
                description=frontmatter.get("description"),
                references=sorted(list(references)),
            ).__dict__
        )
    return data


def main():
    raw_data = get_raw_data()
    data = reshape_data(raw_data)
    with open(OUTPUT_PATH, "w") as f:
        f.write(json.dumps(data, indent=2))


main()
