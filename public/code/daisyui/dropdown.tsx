"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [language, setLanguage] = useState("english");

  return (
    <div className="card card-bordered card-normal w-full max-w-sm mx-auto p-6">
      <form
        action="
      https://buttondown.com/api/emails/embed-subscribe/{username}
      "
        method="post"
      >
        <div className="grid gap-4">
          <div>
            <h3 className="card-title text-2xl">Stay informed</h3>
            <p className="text-sm">
              You'll be the first to know when we launch.
            </p>
          </div>

          <div className="grid gap-2">
            <label htmlFor="email">Email</label>
            <input
              className="input input-bordered"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>

          <div className="grid gap-2">
            <input type="hidden" name="tag" value={language} />
            <label htmlFor="language">Language</label>
            <select className="select select-bordered" value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="english">English</option>
              <option value="french">French</option>
              <option value="spanish">Spanish</option>
            </select>
          </div>

          <div className="card-actions">
            <button className="btn btn-primary w-full" type="submit">
              {language === "english"
                ? "Subscribe"
                : language === "french"
                  ? "S'abonner"
                  : "Suscribirse"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
