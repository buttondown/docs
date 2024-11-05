export default function SubscribeForm() {
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

          <div className="card-actions">
            <button className="btn btn-primary w-full" type="submit">
              Subscribe
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
