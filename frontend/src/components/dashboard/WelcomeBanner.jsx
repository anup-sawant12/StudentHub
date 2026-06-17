function WelcomeBanner() {
  return (
    <section className="mb-8">

      <div className="glass-card p-8">

        <h2 className="text-4xl font-bold mb-3">
          Welcome Back 👋
        </h2>

        <p className="text-[var(--muted)] mb-6">
          Manage your college life, track attendance,
          discover placements and connect with peers.
        </p>

        <div className="flex gap-4">

          <button className="bg-[var(--primary)] px-5 py-3 rounded-lg">
            Add Lost Item
          </button>

          <button className="border border-[var(--border)] px-5 py-3 rounded-lg">
            Post Confession
          </button>

          <button className="border border-[var(--border)] px-5 py-3 rounded-lg">
            Add Experience
          </button>

        </div>

      </div>

    </section>
  );
}

export default WelcomeBanner;