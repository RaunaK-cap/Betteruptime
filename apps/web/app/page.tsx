const monitoringRegions = [
  { name: "Virginia", latency: "41ms", status: "Stable" },
  { name: "London", latency: "63ms", status: "Stable" },
  { name: "Singapore", latency: "117ms", status: "Watching" },
  { name: "Sydney", latency: "109ms", status: "Stable" },
];

const featureCards = [
  {
    title: "Regional truth, not guesswork",
    description:
      "Track whether an issue is global, regional, or tied to a single provider before your team wastes time on the wrong layer.",
  },
  {
    title: "Latency that actually tells a story",
    description:
      "Compare performance across locations to spot CDN misses, DNS anomalies, and routing regressions in a few seconds.",
  },
  {
    title: "Clean diagnostics in one command center",
    description:
      "Bring status, SSL, DNS, health checks, and incident context into one premium dashboard your team can scan fast.",
  },
];

const statCards = [
  { label: "Global checkpoints", value: "24" },
  { label: "Median detection", value: "<30s" },
  { label: "Verified uptime", value: "99.98%" },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="animate-drift absolute left-[-8rem] top-16 h-72 w-72 rounded-full bg-lime-300/10 blur-3xl" />
        <div className="animate-drift absolute right-[-6rem] top-48 h-96 w-96 rounded-full bg-amber-300/12 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      </div>

      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-20 pt-6 sm:px-10 lg:px-12">
        <header className="animate-reveal-up flex items-center justify-between rounded-full border border-white/10 bg-white/6 px-5 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-lime-300 text-sm font-bold text-stone-950">
              BU
            </div>
            <p className="text-sm font-semibold tracking-[0.26em] text-stone-100 uppercase">
              Better Uptime
            </p>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-stone-300 md:flex">
            <a href="#features">Features</a>
            <a href="#coverage">Coverage</a>
            <a href="#workflow">Workflow</a>
          </nav>
          <a
            href="#cta"
            className="rounded-full bg-lime-300 px-4 py-2 text-sm font-semibold text-stone-950 transition hover:bg-lime-200"
          >
            Start monitoring
          </a>
        </header>

        <section className="grid flex-1 items-center gap-16 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="space-y-9">
            <div className="animate-reveal-up inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-stone-200">
              <span className="h-2.5 w-2.5 rounded-full bg-lime-300 shadow-[0_0_14px_rgba(214,255,114,0.8)]" />
              Premium monitoring for websites, APIs, and infrastructure
            </div>

            <div className="space-y-6">
              <h1 className="animate-reveal-up text-balance max-w-4xl font-sans text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl lg:text-7xl">
                A sharper way to monitor uptime across every region that matters.
              </h1>
              <p className="animate-reveal-up animate-delay-150 max-w-2xl text-lg leading-8 text-stone-300">
                Better Uptime gives your team a refined control center for
                website and server health, with region-by-region status,
                latency intelligence, SSL and DNS detail, and incident context
                that feels built for modern SaaS operations.
              </p>
            </div>

            <div className="animate-reveal-up animate-delay-300 flex flex-col gap-4 sm:flex-row">
              <a
                href="#cta"
                className="rounded-full bg-lime-300 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-lime-200"
              >
                Get early access
              </a>
              <a
                href="#features"
                className="rounded-full border border-white/15 bg-white/4 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                See the product
              </a>
            </div>

            <div className="animate-reveal-up animate-delay-450 grid gap-4 sm:grid-cols-3">
              {statCards.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5 backdrop-blur-sm"
                >
                  <p className="text-3xl font-semibold tracking-[-0.05em] text-white">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm text-stone-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-float-soft relative">
            <div className="absolute inset-5 -z-10 rounded-[2rem] bg-lime-300/10 blur-3xl" />
            <div className="rounded-[2rem] border border-white/10 bg-[#19130f]/85 p-5 shadow-[0_30px_120px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-stone-400">
                    Live overview
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    pulse.shiftlayer.com
                  </h2>
                </div>
                <div className="rounded-full border border-lime-300/20 bg-lime-300/10 px-3 py-1 text-xs font-semibold text-lime-200">
                  24 probes active
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {monitoringRegions.map((region) => (
                  <div
                    key={region.name}
                    className="rounded-[1.5rem] border border-white/10 bg-white/4 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white">
                        {region.name}
                      </p>
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          region.status === "Stable"
                            ? "bg-lime-300"
                            : "bg-amber-300"
                        }`}
                      />
                    </div>
                    <p className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-white">
                      {region.latency}
                    </p>
                    <p className="mt-2 text-sm text-stone-400">
                      {region.status}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/4 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-stone-400">Operational summary</p>
                    <p className="mt-1 text-lg font-medium text-white">
                      EU and US routes healthy, APAC under watch
                    </p>
                  </div>
                  <div className="rounded-full bg-amber-300/12 px-3 py-1 text-xs font-semibold text-amber-200">
                    Monitoring
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between text-sm text-stone-300">
                    <span>SSL certificate</span>
                    <span>Renews in 41 days</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-stone-300">
                    <span>DNS resolution</span>
                    <span>No propagation issues detected</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-stone-300">
                    <span>Incident confidence</span>
                    <span>High signal, low noise</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="grid gap-5 border-t border-white/10 py-16 lg:grid-cols-3"
        >
          {featureCards.map((feature) => (
            <article
              key={feature.title}
              className="rounded-[1.9rem] border border-white/10 bg-white/6 p-6 transition hover:-translate-y-1 hover:bg-white/8"
            >
              <p className="text-lg font-semibold text-white">{feature.title}</p>
              <p className="mt-3 text-sm leading-7 text-stone-300">
                {feature.description}
              </p>
            </article>
          ))}
        </section>

        <section
          id="coverage"
          className="grid gap-6 py-10 lg:grid-cols-[0.86fr_1.14fr]"
        >
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-lime-200">
              Regional coverage
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
              Monitor the same endpoint from the places your customers actually use it.
            </h2>
            <p className="max-w-xl text-base leading-8 text-stone-300">
              Better Uptime separates local incidents from global failures with
              a calmer, cleaner view of uptime and performance signals. Teams
              can spot what changed without reading a wall of noise.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-[#17120f]/80 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-stone-400">
                Experience layer
              </p>
              <ul className="mt-5 space-y-4 text-sm leading-7 text-stone-200">
                <li>Response time by region and checkpoint</li>
                <li>Availability windows and trend history</li>
                <li>Route-level confidence before alerting</li>
              </ul>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-[#17120f]/80 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-stone-400">
                Technical layer
              </p>
              <ul className="mt-5 space-y-4 text-sm leading-7 text-stone-200">
                <li>DNS, SSL, and certificate validity</li>
                <li>Region-specific degradations and anomalies</li>
                <li>Structured signal for faster triage</li>
              </ul>
            </div>
          </div>
        </section>

        <section
          id="workflow"
          className="rounded-[2rem] border border-white/10 bg-white/6 p-8 sm:p-10"
        >
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-lime-200">
                Refined workflow
              </p>
              <h2 className="text-balance text-3xl font-semibold tracking-[-0.05em] text-white">
                Add the endpoint, choose your regions, and watch the signal sharpen.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-white/10 bg-[#17120f]/80 p-5">
                <p className="text-sm text-stone-400">01</p>
                <p className="mt-4 text-lg font-medium text-white">
                  Connect any monitored URL
                </p>
                <p className="mt-2 text-sm leading-7 text-stone-300">
                  Add your website, API, or server endpoint in a few seconds.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-[#17120f]/80 p-5">
                <p className="text-sm text-stone-400">02</p>
                <p className="mt-4 text-lg font-medium text-white">
                  Compare health by geography
                </p>
                <p className="mt-2 text-sm leading-7 text-stone-300">
                  See latency, status, and degradation patterns across regions.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-[#17120f]/80 p-5">
                <p className="text-sm text-stone-400">03</p>
                <p className="mt-4 text-lg font-medium text-white">
                  Investigate with context
                </p>
                <p className="mt-2 text-sm leading-7 text-stone-300">
                  Use diagnostic detail to move from alert to explanation fast.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="cta"
          className="mx-auto mt-14 w-full max-w-5xl rounded-[2.2rem] border border-lime-300/20 bg-[linear-gradient(135deg,rgba(214,255,114,0.16),rgba(214,168,90,0.12))] px-8 py-12 text-center backdrop-blur"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-100">
            Better Uptime
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
            Monitoring should feel premium, not noisy.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-stone-200">
            Better Uptime is designed for teams that want cleaner visibility
            into uptime, regional performance, and incident detail without the
            clutter of legacy monitoring dashboards.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="mailto:founders@betteruptime.app"
              className="rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-lime-200 transition hover:bg-black"
            >
              Book a demo
            </a>
            <a
              href="#features"
              className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/16"
            >
              Explore features
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}
