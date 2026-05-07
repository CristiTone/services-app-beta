import { f as createComponent, j as renderComponent, r as renderTemplate, i as createAstro } from '../../../chunks/astro/server_DP6PK3ES.mjs';
import 'kleur/colors';
import 'html-escaper';
import { s as servicesApi, $ as $$Layout } from '../../../chunks/Layout_DDdcIh9O.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { V as View, T as Text, f as formatPrice } from '../../../chunks/Platform_C-0FiFMj.mjs';
export { renderers } from '../../../renderers.mjs';

function Button({
  children,
  onPress,
  variant = "primary",
  className = "",
  disabled = false
}) {
  const base = "rounded-lg px-4 py-2 font-medium";
  const variants = {
    primary: "bg-marketplace-primary text-white",
    secondary: "bg-slate-200 text-slate-800"
  };
  return /* @__PURE__ */ jsx(
    View,
    {
      className: `${base} ${variants[variant]} ${disabled ? "opacity-50" : ""} ${className}`,
      onClick: disabled ? void 0 : onPress,
      onTouchEnd: disabled ? void 0 : onPress,
      role: "button",
      children: /* @__PURE__ */ jsx(Text, { className: "text-center", children })
    }
  );
}

function ServiceDetail({ serviceId, locale }) {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!serviceId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    servicesApi.getById(serviceId).then((data) => {
      if (!cancelled) setService(data);
    }).catch((err) => {
      if (!cancelled) setError(err instanceof Error ? err : new Error(String(err)));
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [serviceId]);
  if (loading) return /* @__PURE__ */ jsx("p", { className: "text-slate-600", children: locale === "ro" ? "Se încarcă..." : "Loading..." });
  if (error) return /* @__PURE__ */ jsx("p", { className: "text-red-600", children: error.message });
  if (!service) return /* @__PURE__ */ jsx("p", { children: locale === "ro" ? "Serviciu negăsit" : "Service not found" });
  return /* @__PURE__ */ jsxs("div", { className: "mt-6 max-w-2xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-900", children: service.title }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-slate-600", children: service.description }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-xl font-semibold text-marketplace-primary", children: formatPrice(service.price) }),
    /* @__PURE__ */ jsx(Button, { className: "mt-4", children: locale === "ro" ? "Rezervați acum" : "Book now" })
  ] });
}

const $$Astro = createAstro();
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { lang, id } = Astro2.params;
  const locale = lang === "ro" ? "ro" : "en";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "locale": locale, "title": "Service - Marketplace" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ServiceDetail", ServiceDetail, { "client:load": true, "serviceId": id ?? "", "locale": locale, "client:component-hydration": "load", "client:component-path": "@/components/ServiceDetail", "client:component-export": "default" })} ` })}`;
}, "/Users/ctone/dev/personal/my-marketplace/apps/web/src/pages/[lang]/services/[id].astro", void 0);

const $$file = "/Users/ctone/dev/personal/my-marketplace/apps/web/src/pages/[lang]/services/[id].astro";
const $$url = "/[lang]/services/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
