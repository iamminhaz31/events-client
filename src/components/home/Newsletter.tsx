"use client";

import toast from "react-hot-toast";

export default function Newsletter() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    toast.success("Thanks for subscribing!");
  };

  return (
    <section className="bg-primary py-16 text-primary-content">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl font-bold">Stay in the loop</h2>
        <p className="mx-auto mt-3 max-w-xl opacity-90">
          Get a short update when new community events are announced near you.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder="Enter your email address"
            className="input w-full text-base-content"
          />
          <button type="submit" className="btn btn-neutral sm:w-auto">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}