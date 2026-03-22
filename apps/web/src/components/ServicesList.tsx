/**
 * React island: services list using shared useServices hook and ServiceCard.
 * Same hook and component types are used on mobile - maximum code sharing.
 */
import { useServices } from '@marketplace/shared/hooks';
import { ServiceCard } from '@marketplace/ui-react/cards';

interface Props {
  locale: string;
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 h-5 w-3/4 rounded bg-slate-200" />
      <div className="mb-1 h-3 w-full rounded bg-slate-100" />
      <div className="mb-4 h-3 w-5/6 rounded bg-slate-100" />
      <div className="h-4 w-1/3 rounded bg-slate-200" />
    </div>
  );
}

export default function ServicesList({ locale }: Props) {
  const { services, loading, error, refetch } = useServices({ page: 1, pageSize: 20 });

  if (loading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <span className="mb-3 text-4xl">⚠️</span>
        <p className="font-medium text-slate-700">{error.message}</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 rounded-lg bg-marketplace-primary px-5 py-2 text-sm font-medium text-white transition hover:bg-sky-600"
        >
          {locale === 'ro' ? 'Încearcă din nou' : 'Try again'}
        </button>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <span className="mb-3 text-5xl">🔍</span>
        <p className="text-lg font-medium text-slate-700">
          {locale === 'ro' ? 'Niciun serviciu găsit' : 'No services found'}
        </p>
        <p className="mt-1 text-sm text-slate-500">
          {locale === 'ro' ? 'Revino mai târziu.' : 'Check back soon.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <a key={service.id} href={`/${locale}/services/${service.id}`} className="group">
          <ServiceCard service={service} className="h-full transition group-hover:shadow-md group-hover:border-sky-300" />
        </a>
      ))}
    </div>
  );
}
