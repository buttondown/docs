import Link from "next/link";

// Via https://github.com/tailwindlabs/headlessui/issues/20
export default function NextLink(props: any) {
  const { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
}
