function StatsGrid() {
  const stats = [
    {
      title: "Lost & Found",
      value: "24"
    },
    {
      title: "Confessions",
      value: "156"
    },
    {
      title: "Experiences",
      value: "433"
    },
    {
      title: "Attendance",
      value: "82%"
    }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      {stats.map((item) => (
        <div
          key={item.title}
          className="glass-card p-6"
        >
          <p className="text-[var(--muted)] text-sm">
            {item.title}
          </p>

          <h3 className="text-4xl font-bold mt-2">
            {item.value}
          </h3>
        </div>
      ))}

    </section>
  );
}

export default StatsGrid;