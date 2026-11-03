export const metadata = {
  title: "Terms of Service | NeighborHub",
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
      <p className="text-sm opacity-70 mb-8">Last updated: November 2026</p>

      <div className="space-y-6 leading-relaxed">
        <p>
          By using NeighborHub you agree to these simple terms. NeighborHub is a
          student project built for learning purposes.
        </p>

        <section>
          <h2 className="text-xl font-semibold mb-2">Using the platform</h2>
          <p>
            You can create events, join events and manage your own events. Please
            share only real community service events and accurate details.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Your content</h2>
          <p>
            You are responsible for the events and information you post. Do not
            post anything illegal, harmful or misleading. We may remove content
            that breaks these rules.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">No guarantee</h2>
          <p>
            The platform is provided as it is. We do not guarantee that every
            event listed will take place, and we are not responsible for what
            happens at events.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Changes</h2>
          <p>
            We may update these terms from time to time. Continuing to use the
            platform means you accept the updated terms.
          </p>
        </section>
      </div>
    </main>
  );
}