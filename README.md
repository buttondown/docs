<!-- Note that this file is public at https://github.com/buttondown/docs. -->

# Buttondown Docs

## Getting Started

To run Docs for the first time you'll:

1. Clone the `monorepo` and navigate to `docs` (or, if you don't have access, clone the `docs` repo)
2. Use `just install` to install all packages and dependencies (or, if you're using the standalone `docs` repo, run `pnpm install`)
3. Run `pnpm dev` (or, if you're trying to build the docs statically for production, run `just build`)

Now you're ready to work! You can now run `pnpm dev` in your command line.

The docs will now be accessible in your browser.

Terminal will watch for changes, and recompile when they're detected.

> You'll need to refresh your browser to view changes.

### Troubleshooting build issues

**Check your Node version**

You can check your Node version by running `node -v` in your command line.

> Docs v2 is running on Node `20.18.1`

**Check your NPM version**
You can check your NPM version by running `npm -v` in your command line.

**Clear the server cache**
Run `just clear_cache` to reset Next.js

## Content

Each Doc is it's own individual Markdown file in `/content/pages`.

The pages are organized in `navigation.json`

### Creating a new page

There are 4 steps to add a new page to the docs:

**1. Create the page**

First you'll create a new `.mdoc` file in `/content/pages`. The file name will be the url slug.

```
example-page.mdoc
```

**2. Add a page title**

You'll add the page title, by adding the following Markdown at the top of your file

```
---
title: Example Page Title
---
```

**3. Add the page to the navigation**

The sidebar navigation lives in `navigation.json`. Open this file, and you'll see an outline of all the pages in Docs.

This data is structured like so:

- There are three top level nav items: Guides, Reference, API
- Within each of those 3 is an array of subtopics (e.g. Getting Started, Collecting Subscribers)
- Each subtopic has it's own array of articles (`page`)

In addition to `page`s and item might also be a `divider`. This can be used to break up the content, for example separating FAQs.

Add the new page in the correct section, you'll find the correct Subtopic, and create a new object.

> Be sure to use the file name without the `.mdoc` file extension

For example:

```

  "top-level-nav": [
    {
      "name": "Sub Topic title here",
      "items": [
        {
          "discriminant": "page",
          "value": "page-1"
        },
        {
          "discriminant": "page",
          "value": "page-2"
        },
        {
          "discriminant": "divider",
          "value": "FAQ"
        },
        {
          "discriminant": "page",
          "value": "faq-1"
        },
        {
          "discriminant": "page",
          "value": "faq-1"
        }
      ]
    }
  ]
```

**4. Updating search index**

After you add a new page, you'll need to update the search index for tests to pass. This has been added to the build command:

```
just build
```

## Known issues/weirdness

### Code samples using Handlebars syntax require an additional flag

Due to a Markdoc limitation, multiline code blocks require an additional flag to render correctly. If you don't have this tag, all content below the code sample gets "eaten" (for lack of a better term)

To resolve this, you can append ` {% process=false %}` after the three opening tick marks

```
{% if syntax= "looks like handlebars or django" %}
  make sure you have the process false added
{% endif %}
```

![Screenshot of handlebars code sample](https://share.cleanshot.com/fNjxx5JD)

### Code samples using Handlebars syntax cannot be displayed in a snippet

These code samples won't work with a snippet like the Renderable/Preview, etc. It throws a syntax error because the sample is using the same code syntax as the snippet itself.

Instead these will need to be wrapped in the regular Markdown code block syntax

```
{% if syntax= "looks like handlebars or django" %}
  just make it a regular markdown code block
{% endif %}
```

Here's more info on this:

- [Markdoc issue](https://github.com/markdoc/markdoc/issues/72)

## FAQs

### Why do we have three `tsconfig` files?

The core tsconfig.json file contains an `incremental: true` flag which does not work in the context of tests or stand-alone files.

## How do the IFrames work?

You'll notice on pages like https://docs.buttondown.com/subscriber-autonomy and https://docs.buttondown.com/subscriber-cleanup we show _iframes_ of the actual app, rather than screenshots or videos. This [has many nice benefits](https://jmduke.com/posts/post/iframe-docs/).

Architecturally, it's less magical than it looks. We point directly to `demo.buttondown.com` (which, being a demo site, is always logged in and has no sensitive data, thus solving lots of security and authentication concerns) and have built within the app itself a lightweight DSL for changing the app's state:

| DSL | Description | Example |
| emphasis | Highlights any DOM nodes with `data-emphasis-identifier` set to the value of the emphasis. | demo.buttondown.com/settings/basics?emphasis=name |
