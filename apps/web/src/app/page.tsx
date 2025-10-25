"use client";

export default function Home() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      <h1 className="text-4xl">What do you want to be?</h1>
      <h2>(or what are your interests)</h2>
      <input></input>

      <div className="grid gap-6">
        <section className="rounded-lg border p-4">
          <h2 className="mb-2 font-medium">API Status</h2>
        </section>
      </div>
    </div>
  );
}
