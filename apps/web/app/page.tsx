export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16 sm:px-10">
      <section className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/15 bg-white/8 shadow-[0_30px_120px_rgba(2,6,23,0.45)] backdrop-blur-xl">
        <div className="grid gap-12 px-6 py-8 sm:px-10 sm:py-12 lg:grid-cols-[1.15fr_0.85fr] lg:px-14">
          <div className="flex flex-col justify-between gap-10">
            <div className="space-y-6">
              <p className="text-lg font-semibold uppercase tracking-[0.32em] text-red-700">
                betteruptime
              </p>
              <div className="space-y-4">
                <h1 className="max-w-xl font-mono text-2xl leading-none font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
                  monitor your website 24/7
                </h1>
                <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  Tailwind is now wired into this Next app correctly. The page
                  is using utility classes, the global stylesheet imports
                  Tailwind, and shared workspace components can be scanned too.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-full border border-sky-300/30 bg-sky-300/10 px-4 py-2 text-sm text-sky-100">
                Tailwind v4
              </div>
              <div className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-slate-200">
                Next.js App Router
              </div>
              <div className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-100">
                Monorepo-ready
              </div>
            </div>
          </div>

          <div className="grid gap-4 self-stretch">
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                What changed
              </p>
              <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-200 sm:text-base">
                <li>
                  Installed the Tailwind and PostCSS packages for `apps/web`.
                </li>
                <li>
                  Imported Tailwind in `globals.css` and kept only base app
                  styles there.
                </li>
                <li>
                  Replaced the CSS module homepage with Tailwind utility
                  classes.
                </li>
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-sky-400/20 to-cyan-300/5 p-6">
              <p className="text-sm uppercase tracking-[0.28em] text-sky-200/80">
                Next step
              </p>
              <p className="mt-5 text-sm leading-7 text-slate-100 sm:text-base">
                Run the app and keep styling directly in `className` with
                Tailwind utilities instead of moving layout code back into
                `page.module.css`.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
