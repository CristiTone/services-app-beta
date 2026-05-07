import { f as createComponent, j as renderComponent, r as renderTemplate, i as createAstro, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_DP6PK3ES.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_DDdcIh9O.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { lang } = Astro2.params;
  const locale = lang === "ro" ? "ro" : "en";
  const t = {
    en: {
      title: "Marketplace \u2014 Find Local Professionals",
      hero_headline: "Find the perfect professional\nfor any job",
      hero_sub: "Hire trusted local experts \u2014 from plumbers to designers \u2014 quickly and safely.",
      hero_cta: "Explore Services",
      hero_cta2: "Become a Provider",
      categories_title: "Popular Categories",
      categories: [
        { icon: "\u{1F527}", label: "Plumbing" },
        { icon: "\u26A1", label: "Electrical" },
        { icon: "\u{1F3E0}", label: "Cleaning" },
        { icon: "\u{1F3A8}", label: "Design" },
        { icon: "\u{1F4BB}", label: "Programming" },
        { icon: "\u{1F4F8}", label: "Photography" },
        { icon: "\u{1F33F}", label: "Gardening" },
        { icon: "\u{1F697}", label: "Automotive" }
      ],
      how_title: "How It Works",
      steps: [
        { num: "1", title: "Post a request", desc: "Describe what you need done and set your budget." },
        { num: "2", title: "Browse providers", desc: "Compare profiles, reviews, and prices side by side." },
        { num: "3", title: "Hire & pay safely", desc: "Payment is only released when you approve the work." }
      ],
      cta_headline: "Ready to get started?",
      cta_sub: "Thousands of professionals are waiting for you.",
      cta_btn: "Browse Services"
    },
    ro: {
      title: "Marketplace \u2014 G\u0103se\u0219te Profesioni\u0219ti Locali",
      hero_headline: "G\u0103se\u0219te profesionistul perfect\npentru orice job",
      hero_sub: "Angajeaz\u0103 exper\u021Bi locali de \xEEncredere \u2014 de la instalatori la designeri \u2014 rapid \u0219i sigur.",
      hero_cta: "Exploreaz\u0103 Servicii",
      hero_cta2: "Devino Furnizor",
      categories_title: "Categorii Populare",
      categories: [
        { icon: "\u{1F527}", label: "Instala\u021Bii" },
        { icon: "\u26A1", label: "Electricitate" },
        { icon: "\u{1F3E0}", label: "Cur\u0103\u021Benie" },
        { icon: "\u{1F3A8}", label: "Design" },
        { icon: "\u{1F4BB}", label: "Programare" },
        { icon: "\u{1F4F8}", label: "Fotografie" },
        { icon: "\u{1F33F}", label: "Gr\u0103din\u0103rit" },
        { icon: "\u{1F697}", label: "Auto" }
      ],
      how_title: "Cum Func\u021Bioneaz\u0103",
      steps: [
        { num: "1", title: "Posteaz\u0103 o cerere", desc: "Descrie ce ai nevoie \u0219i stabile\u0219te bugetul." },
        { num: "2", title: "R\u0103sfoie\u0219te furnizorii", desc: "Compar\u0103 profiluri, recenzii \u0219i pre\u021Buri." },
        { num: "3", title: "Angajeaz\u0103 \u0219i pl\u0103te\u0219te sigur", desc: "Plata se elibereaz\u0103 doar la aprobarea ta." }
      ],
      cta_headline: "Gata s\u0103 \xEEncepi?",
      cta_sub: "Mii de profesioni\u0219ti te a\u0219teapt\u0103.",
      cta_btn: "R\u0103sfoie\u0219te Servicii"
    }
  }[locale];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "locale": locale, "title": t.title, "fullWidth": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-gradient-to-br from-sky-600 to-sky-800 px-4 py-24 text-white"> <div class="mx-auto max-w-4xl text-center"> <h1 class="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"> ${t.hero_headline.split("\n").map((line, i) => renderTemplate`<span>${i > 0 && renderTemplate`<br class="hidden sm:block">`}${line}</span>`)} </h1> <p class="mt-5 text-lg text-sky-100 sm:text-xl">${t.hero_sub}</p> <div class="mt-8 flex flex-wrap justify-center gap-3"> <a${addAttribute(`/${locale}/services`, "href")} class="rounded-lg bg-white px-6 py-3 font-semibold text-sky-700 shadow-md transition hover:bg-sky-50"> ${t.hero_cta} </a> <a${addAttribute(`/${locale}/services`, "href")} class="rounded-lg border border-white/60 px-6 py-3 font-semibold text-white transition hover:bg-white/10"> ${t.hero_cta2} </a> </div> </div> </section>  <section class="mx-auto max-w-6xl px-4 py-16"> <h2 class="mb-8 text-center text-2xl font-bold text-slate-900">${t.categories_title}</h2> <div class="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8"> ${t.categories.map((cat) => renderTemplate`<a${addAttribute(`/${locale}/services`, "href")} class="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-sky-400 hover:shadow-md"> <span class="text-3xl">${cat.icon}</span> <span class="text-sm font-medium text-slate-700">${cat.label}</span> </a>`)} </div> </section>  <section class="bg-slate-100 px-4 py-16"> <div class="mx-auto max-w-4xl"> <h2 class="mb-12 text-center text-2xl font-bold text-slate-900">${t.how_title}</h2> <div class="grid gap-8 sm:grid-cols-3"> ${t.steps.map((step) => renderTemplate`<div class="flex flex-col items-center text-center"> <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sky-600 text-xl font-bold text-white shadow-md"> ${step.num} </div> <h3 class="mb-2 font-semibold text-slate-900">${step.title}</h3> <p class="text-sm text-slate-600">${step.desc}</p> </div>`)} </div> </div> </section>  <section class="mx-auto max-w-6xl px-4 py-20 text-center"> <h2 class="text-3xl font-bold text-slate-900 sm:text-4xl">${t.cta_headline}</h2> <p class="mt-3 text-slate-500">${t.cta_sub}</p> <a${addAttribute(`/${locale}/services`, "href")} class="mt-8 inline-block rounded-lg bg-marketplace-primary px-8 py-3 font-semibold text-white shadow transition hover:bg-sky-600"> ${t.cta_btn} </a> </section> ` })}`;
}, "/Users/ctone/dev/personal/my-marketplace/apps/web/src/pages/[lang]/index.astro", void 0);

const $$file = "/Users/ctone/dev/personal/my-marketplace/apps/web/src/pages/[lang]/index.astro";
const $$url = "/[lang]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
