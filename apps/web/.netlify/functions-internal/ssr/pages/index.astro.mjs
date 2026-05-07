import { f as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_DP6PK3ES.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_DDdcIh9O.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const locale = "en";
  const categories = [
    { icon: "\u{1F527}", label: "Plumbing" },
    { icon: "\u26A1", label: "Electrical" },
    { icon: "\u{1F3E0}", label: "Cleaning" },
    { icon: "\u{1F3A8}", label: "Design" },
    { icon: "\u{1F4BB}", label: "Programming" },
    { icon: "\u{1F4F8}", label: "Photography" },
    { icon: "\u{1F33F}", label: "Gardening" },
    { icon: "\u{1F697}", label: "Automotive" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "locale": locale, "title": "Marketplace \u2014 Find Local Professionals", "fullWidth": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-gradient-to-br from-sky-600 to-sky-800 px-4 py-24 text-white"> <div class="mx-auto max-w-4xl text-center"> <h1 class="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
Find the perfect professional<br class="hidden sm:block"> for any job
</h1> <p class="mt-5 text-lg text-sky-100 sm:text-xl">
Hire trusted local experts — from plumbers to designers — quickly and safely.
</p> <div class="mt-8 flex flex-wrap justify-center gap-3"> <a${addAttribute(`/${locale}/services`, "href")} class="rounded-lg bg-white px-6 py-3 font-semibold text-sky-700 shadow-md transition hover:bg-sky-50">
Explore Services
</a> <a${addAttribute(`/${locale}/services`, "href")} class="rounded-lg border border-white/60 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
Become a Provider
</a> </div> </div> </section>  <section class="mx-auto max-w-6xl px-4 py-16"> <h2 class="mb-8 text-center text-2xl font-bold text-slate-900">Popular Categories</h2> <div class="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8"> ${categories.map((cat) => renderTemplate`<a${addAttribute(`/${locale}/services`, "href")} class="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-sky-400 hover:shadow-md"> <span class="text-3xl">${cat.icon}</span> <span class="text-sm font-medium text-slate-700">${cat.label}</span> </a>`)} </div> </section>  <section class="bg-slate-100 px-4 py-16"> <div class="mx-auto max-w-4xl"> <h2 class="mb-12 text-center text-2xl font-bold text-slate-900">How It Works</h2> <div class="grid gap-8 sm:grid-cols-3"> ${[
    { num: "1", icon: "\u{1F4CB}", title: "Post a request", desc: "Describe what you need done and set your budget." },
    { num: "2", icon: "\u{1F50D}", title: "Browse providers", desc: "Compare profiles, reviews, and prices side by side." },
    { num: "3", icon: "\u2705", title: "Hire & pay safely", desc: "Payment is only released when you approve the work." }
  ].map((step) => renderTemplate`<div class="flex flex-col items-center text-center"> <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sky-600 text-xl font-bold text-white shadow-md"> ${step.num} </div> <h3 class="mb-2 font-semibold text-slate-900">${step.title}</h3> <p class="text-sm text-slate-600">${step.desc}</p> </div>`)} </div> </div> </section>  <section class="mx-auto max-w-6xl px-4 py-20 text-center"> <h2 class="text-3xl font-bold text-slate-900 sm:text-4xl">Ready to get started?</h2> <p class="mt-3 text-slate-500">Thousands of professionals are waiting for you.</p> <a${addAttribute(`/${locale}/services`, "href")} class="mt-8 inline-block rounded-lg bg-marketplace-primary px-8 py-3 font-semibold text-white shadow transition hover:bg-sky-600">
Browse Services
</a> </section> ` })}`;
}, "/Users/ctone/dev/personal/my-marketplace/apps/web/src/pages/index.astro", void 0);

const $$file = "/Users/ctone/dev/personal/my-marketplace/apps/web/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
