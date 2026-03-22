/**
 * React island: services list using shared useServices hook and ServiceCard.
 * Same hook and component types are used on mobile - maximum code sharing.
 */
import { useServices } from '@marketplace/shared/hooks';
import { ServiceCard } from '@marketplace/ui-react/cards';

interface Props {
  locale: string;
}

export default function ServicesList({ locale }: Props) {
  const { services, loading, error, refetch } = useServices({ page: 1, pageSize: 20 });

  if (loading) {
    return <p className="mt-4 text-slate-600">{locale === 'ro' ? 'Se încarcă...' : 'Loading...'}</p>;
  }
  if (error) {
    return (
      <div className="mt-4">
        <p className="text-red-600">{error.message}</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-2 text-marketplace-primary underline"
        >
          {locale === 'ro' ? 'Încercați din nou' : 'Retry'}
        </button>
      </div>
    );
  }
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <a key={service.id} href={`/${locale}/services/${service.id}`}>
          <ServiceCard service={service} className="h-full transition hover:shadow-md" />
        </a>
      ))}
    </div>
  );
}
