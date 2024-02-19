import Link from "next/link";
import React from "react";

// Via https://github.com/tailwindlabs/headlessui/issues/20
const NextLink = React.forwardRef((props: any, ref) => {
  const { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a {...rest} ref={ref}>
        {children}
      </a>
    </Link>
  );
});

export default NextLink;
