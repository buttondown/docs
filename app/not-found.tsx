import Link from "next/link";
import "./globals.css";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="flex items-center justify-center h-screen">
        <div className="container m-auto p-8 flex items-center flex-col space-y-8">
          <div className="text-center font-bold text-9xl">Alas!</div>
          <h1 className="text-xl sm:text-3xl font-extrabold mb-8">
            {" "}
            Page not found
          </h1>
          <p className="text-base sm:text-lg">
            Ruh roh, this page doesn’t exist.{" "}
            <Link href="/" className="underline underline-offset-1">
              Head home
            </Link>
            .
          </p>
        </div>
      </body>
    </html>
  );
}
