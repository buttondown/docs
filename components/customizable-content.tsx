"use client";

import useButtondownCookie, {
  USERNAME_COOKIE,
} from "@/hooks/useButtondownCookie";

export default function CustomizableContent(props: {
  loggedInHtml: string;
  anonymousHtml: string;
}) {
  const username = useButtondownCookie(USERNAME_COOKIE);

  const html = username
    ? props.loggedInHtml.replace(/{{username}}/g, username)
    : props.anonymousHtml;

  // biome-ignore lint/security/noDangerouslySetInnerHtml: It's fine
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
