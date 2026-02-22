"use client";

import NextError from "next/error";

export default function GlobalError({ error }) {
  return (
    <html lang="en">
      <body>
        <NextError />
      </body>
    </html>
  );
}
