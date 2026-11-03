export const metadata = {
  title: "Privacy Policy | NeighborHub",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm opacity-70 mb-8">Last updated: November 2026</p>

      <div className="space-y-6 leading-relaxed">
        <p>
          NeighborHub is a community platform where people create, join and
          track social service events in their local area. It is a student
          project built for learning purposes.
        </p>

        <section>
          <h2 className="text-xl font-semibold mb-2">What we collect</h2>
          <p>
            When you register or sign in with Google, we receive your name,
            email address and profile picture. We also store the events you
            create and the events you join.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">How we use it</h2>
          <p>
            We use this information only to sign you in, show your profile, and
            let you manage the events you created or joined.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Sharing</h2>
          <p>
            We do not sell your data. Your data is stored with our hosting and
            database providers (Vercel and MongoDB Atlas) only so the website
            can work.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Your choices</h2>
          <p>
            You can ask us to delete your account and data at any time by
            contacting the project maintainer through the GitHub profile
            iamminhaz31.
          </p>
        </section>
      </div>
    </main>
  );
}