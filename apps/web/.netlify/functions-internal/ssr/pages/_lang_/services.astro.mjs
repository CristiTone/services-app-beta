import { f as createComponent, j as renderComponent, r as renderTemplate, i as createAstro, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_DP6PK3ES.mjs';
import 'kleur/colors';
import 'html-escaper';
import { s as servicesApi, $ as $$Layout } from '../../chunks/Layout_DDdcIh9O.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useCallback, useEffect } from 'react';
import { V as View, T as Text, f as formatPrice } from '../../chunks/Platform_C-0FiFMj.mjs';
export { renderers } from '../../renderers.mjs';

function useServices(params) {
  const [services, setServices] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await servicesApi.list(params);
      setServices(res.data);
      setTotal(res.total);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [params?.page, params?.pageSize]);
  useEffect(() => {
    fetchServices();
  }, [fetchServices]);
  return { services, total, loading, error, refetch: fetchServices };
}

function ServiceCard({ service, onPress, className = "" }) {
  return /* @__PURE__ */ jsxs(
    View,
    {
      className: `flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ${className}`,
      onPress,
      children: [
        /* @__PURE__ */ jsx(View, { className: "h-1.5 w-full bg-gradient-to-r from-sky-400 to-sky-600" }),
        /* @__PURE__ */ jsxs(View, { className: "flex flex-1 flex-col p-5", children: [
          /* @__PURE__ */ jsx(Text, { className: "text-base font-semibold leading-snug text-slate-900", children: service.title }),
          /* @__PURE__ */ jsx(Text, { className: "mt-2 line-clamp-2 flex-1 text-sm text-slate-500", children: service.description }),
          /* @__PURE__ */ jsxs(View, { className: "mt-4 flex flex-row items-center justify-between", children: [
            /* @__PURE__ */ jsx(Text, { className: "text-lg font-bold text-sky-600", children: formatPrice(service.price) }),
            service.provider && /* @__PURE__ */ jsx(Text, { className: "text-xs text-slate-400", children: service.provider.name })
          ] })
        ] })
      ]
    }
  );
}

function SkeletonCard() {
  return /* @__PURE__ */ jsxs("div", { className: "animate-pulse rounded-xl border border-slate-200 bg-white p-5 shadow-sm", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-3 h-5 w-3/4 rounded bg-slate-200" }),
    /* @__PURE__ */ jsx("div", { className: "mb-1 h-3 w-full rounded bg-slate-100" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 h-3 w-5/6 rounded bg-slate-100" }),
    /* @__PURE__ */ jsx("div", { className: "h-4 w-1/3 rounded bg-slate-200" })
  ] });
}
function ServicesList({ locale }) {
  const { services, loading, error, refetch } = useServices({ page: 1, pageSize: 20 });
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsx(SkeletonCard, {}, i)) });
  }
  if (error) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center py-20 text-center", children: [
      /* @__PURE__ */ jsx("span", { className: "mb-3 text-4xl", children: "⚠️" }),
      /* @__PURE__ */ jsx("p", { className: "font-medium text-slate-700", children: error.message }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => refetch(),
          className: "mt-4 rounded-lg bg-marketplace-primary px-5 py-2 text-sm font-medium text-white transition hover:bg-sky-600",
          children: locale === "ro" ? "Încearcă din nou" : "Try again"
        }
      )
    ] });
  }
  if (services.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center py-20 text-center", children: [
      /* @__PURE__ */ jsx("span", { className: "mb-3 text-5xl", children: "🔍" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg font-medium text-slate-700", children: locale === "ro" ? "Niciun serviciu găsit" : "No services found" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-slate-500", children: locale === "ro" ? "Revino mai târziu." : "Check back soon." })
    ] });
  }
  return /* @__PURE__ */ jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: services.map((service) => /* @__PURE__ */ jsx("a", { href: `/${locale}/services/${service.id}`, className: "group", children: /* @__PURE__ */ jsx(ServiceCard, { service, className: "h-full transition group-hover:shadow-md group-hover:border-sky-300" }) }, service.id)) });
}

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { lang } = Astro2.params;
  const locale = lang === "ro" ? "ro" : "en";
  const t = {
    en: {
      title: "Services \u2014 Marketplace",
      heading: "Browse Services",
      sub: "Find the right professional for your project",
      all: "All Categories",
      sort: "Sort: Newest"
    },
    ro: {
      title: "Servicii \u2014 Marketplace",
      heading: "R\u0103sfoie\u0219te Servicii",
      sub: "G\u0103se\u0219te profesionistul potrivit pentru proiectul t\u0103u",
      all: "Toate Categoriile",
      sort: "Sortare: Cele mai noi"
    }
  }[locale];
  const categories = locale === "ro" ? ["Instala\u021Bii", "Electricitate", "Cur\u0103\u021Benie", "Design", "Programare", "Fotografie", "Gr\u0103din\u0103rit", "Auto"] : ["Plumbing", "Electrical", "Cleaning", "Design", "Programming", "Photography", "Gardening", "Automotive"];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "locale": locale, "title": t.title, "fullWidth": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="border-b border-slate-200 bg-white px-4 py-10"> <div class="mx-auto max-w-6xl"> <nav class="mb-3 flex items-center gap-2 text-sm text-slate-400"> <a${addAttribute(`/${locale}`, "href")} class="hover:text-slate-600"> ${locale === "ro" ? "Acas\u0103" : "Home"} </a> <span>/</span> <span class="text-slate-700">${locale === "ro" ? "Servicii" : "Services"}</span> </nav> <h1 class="text-3xl font-bold text-slate-900">${t.heading}</h1> <p class="mt-1 text-slate-500">${t.sub}</p> </div> </section>  <section class="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur"> <div class="mx-auto flex max-w-6xl items-center gap-3 overflow-x-auto"> <button class="shrink-0 rounded-full bg-sky-600 px-4 py-1.5 text-sm font-medium text-white"> ${t.all} </button> ${categories.map((cat) => renderTemplate`<button class="shrink-0 rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-600 transition hover:border-sky-400 hover:text-sky-600"> ${cat} </button>`)} </div> </section>  <div class="mx-auto max-w-6xl px-4 py-8"> ${renderComponent($$result2, "ServicesList", ServicesList, { "client:load": true, "locale": locale, "client:component-hydration": "load", "client:component-path": "@/components/ServicesList", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/ctone/dev/personal/my-marketplace/apps/web/src/pages/[lang]/services/index.astro", void 0);

const $$file = "/Users/ctone/dev/personal/my-marketplace/apps/web/src/pages/[lang]/services/index.astro";
const $$url = "/[lang]/services";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
