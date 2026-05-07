import { f as createComponent, j as renderComponent, r as renderTemplate, i as createAstro } from '../../chunks/astro/server_DP6PK3ES.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../../chunks/Layout_DDdcIh9O.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Login = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const { lang } = Astro2.params;
  const locale = lang === "ro" ? "ro" : "en";
  const title = locale === "ro" ? "Conectare \u2014 Marketplace" : "Sign In \u2014 Marketplace";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "locale": locale, "title": title }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "LoginForm", null, { "client:only": "react", "locale": locale, "client:component-hydration": "only", "client:component-path": "@/components/LoginForm", "client:component-export": "LoginForm" })} ` })}`;
}, "/Users/ctone/dev/personal/my-marketplace/apps/web/src/pages/[lang]/login.astro", void 0);

const $$file = "/Users/ctone/dev/personal/my-marketplace/apps/web/src/pages/[lang]/login.astro";
const $$url = "/[lang]/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
