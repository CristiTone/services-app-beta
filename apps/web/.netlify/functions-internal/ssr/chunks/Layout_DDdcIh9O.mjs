import { f as createComponent, h as addAttribute, k as renderHead, j as renderComponent, l as renderSlot, r as renderTemplate, i as createAstro } from './astro/server_DP6PK3ES.mjs';
import 'kleur/colors';
import 'html-escaper';
/* empty css                         */
import { useEffect } from 'react';
import i18n from 'i18next';

let clientConfig = {
  baseUrl: ""
};
function configureApiClient(config) {
  clientConfig = { ...clientConfig, ...config };
}
function getHeaders() {
  const headers = {
    "Content-Type": "application/json"
  };
  const token = clientConfig.getToken?.();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}
async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = data || { message: res.statusText };
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  return data;
}
async function apiGet(path) {
  const res = await fetch(`${clientConfig.baseUrl}${path}`, {
    method: "GET",
    headers: getHeaders()
  });
  return handleResponse(res);
}
const servicesApi = {
  list: (params) => {
    const search = new URLSearchParams();
    if (params?.page != null) search.set("page", String(params.page));
    if (params?.pageSize != null) search.set("pageSize", String(params.pageSize));
    const q = search.toString();
    return apiGet(
      `/api/services${q ? `?${q}` : ""}`
    );
  },
  getById: (id) => apiGet(`/api/services/${id}`)
};

const common$1 = {
	welcome: "Welcome to the marketplace",
	loading: "Loading...",
	error: "Something went wrong",
	retry: "Retry"
};
const services$1 = {
	title: "Services",
	listTitle: "Find a professional",
	detail: "Service details",
	price: "Price",
	book: "Book now"
};
const booking$1 = {
	confirm: "Confirm booking",
	date: "Date",
	status: "Status",
	pending: "Pending",
	confirmed: "Confirmed",
	completed: "Completed",
	cancelled: "Cancelled"
};
const nav$1 = {
	home: "Home",
	services: "Services",
	profile: "Profile"
};
const en = {
	common: common$1,
	services: services$1,
	booking: booking$1,
	nav: nav$1
};

const common = {
	welcome: "Bine ați venit pe piață",
	loading: "Se încarcă...",
	error: "Ceva nu a mers bine",
	retry: "Încercați din nou"
};
const services = {
	title: "Servicii",
	listTitle: "Găsiți un profesionist",
	detail: "Detalii serviciu",
	price: "Preț",
	book: "Rezervați acum"
};
const booking = {
	confirm: "Confirmați rezervarea",
	date: "Data",
	status: "Status",
	pending: "În așteptare",
	confirmed: "Confirmat",
	completed: "Finalizat",
	cancelled: "Anulat"
};
const nav = {
	home: "Acasă",
	services: "Servicii",
	profile: "Profil"
};
const ro = {
	common: common,
	services: services,
	booking: booking,
	nav: nav
};

const defaultNS = "translation";
const supportedLngs = ["en", "ro"];
function initI18n(locale = "en") {
  return i18n.init({
    lng: locale,
    fallbackLng: "en",
    supportedLngs: [...supportedLngs],
    resources: {
      en: { [defaultNS]: en },
      ro: { [defaultNS]: ro }
    },
    defaultNS,
    interpolation: { escapeValue: false }
  });
}

function ClientConfig({ apiUrl, locale }) {
  useEffect(() => {
    configureApiClient({ baseUrl: apiUrl });
    initI18n(locale);
  }, [apiUrl, locale]);
  return null;
}

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { locale = "en", title = "Marketplace", fullWidth = false } = Astro2.props;
  const apiUrl = "http://localhost:3000";
  return renderTemplate`<html${addAttribute(locale, "lang")}> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title>${renderHead()}</head> <body class="min-h-screen bg-slate-50 text-slate-900"> ${renderComponent($$result, "ClientConfig", ClientConfig, { "client:load": true, "apiUrl": apiUrl, "locale": locale, "client:component-hydration": "load", "client:component-path": "/Users/ctone/dev/personal/my-marketplace/apps/web/src/components/ClientConfig", "client:component-export": "ClientConfig" })} <nav class="border-b border-slate-200 bg-white px-4 py-3"> <div class="mx-auto flex max-w-6xl items-center gap-4"> <a${addAttribute(`/${locale}`, "href")} class="font-semibold text-marketplace-primary">Marketplace</a> <a${addAttribute(`/${locale}/services`, "href")} class="text-slate-600 hover:text-slate-900">Services</a> <div class="ml-auto flex items-center gap-4"> <a${addAttribute(`/${locale}/login`, "href")} class="text-sm font-medium text-slate-600 hover:text-slate-900"> ${locale === "ro" ? "Conectare" : "Sign in"} </a> <a href="/en"${addAttribute(locale === "en" ? "font-medium" : "text-slate-500", "class")}>EN</a> <span class="text-slate-300">|</span> <a href="/ro"${addAttribute(locale === "ro" ? "font-medium" : "text-slate-500", "class")}>RO</a> </div> </div> </nav> <main${addAttribute(fullWidth ? "" : "mx-auto max-w-6xl px-4 py-8", "class")}> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "/Users/ctone/dev/personal/my-marketplace/apps/web/src/layouts/Layout.astro", void 0);

export { $$Layout as $, servicesApi as s };
