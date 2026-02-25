import { useEffect, useState } from "react";

export const USERNAME_COOKIE = "buttondown_newsletter_username";

type CookieName = typeof USERNAME_COOKIE;

// undefined = not yet loaded
// null = no username
// string = username

export default function useButtondownCookie(cookie: CookieName) {
  const [value, setValue] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    // We're not using `cookies` from next/headers because its usage opts
    // the route into on-demand server-side rendering.
    const username = document.cookie
      .split(";")
      .find((segment) => segment.includes(`${cookie}=`))
      ?.split("=")[1];

    if (username) {
      setValue(username);
    } else {
      setValue(null);
    }
  }, [cookie]);

  return value;
}
