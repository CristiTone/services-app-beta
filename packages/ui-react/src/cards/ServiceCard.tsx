/**
 * ServiceCard - shared between web (Astro) and mobile (React Native).
 * Uses platform View/Text so the same component works on both.
 * Tailwind: use className; on RN use NativeWind for same class names.
 */
import type { Service } from '@marketplace/shared/types';
import { formatPrice } from '@marketplace/shared/utils';
import { View, Text } from '../Platform';

export interface ServiceCardProps {
  service: Service;
  onPress?: () => void;
  className?: string;
}

export function ServiceCard({ service, onPress, className = '' }: ServiceCardProps) {
  return (
    <View
      className={`rounded-lg border border-slate-200 bg-white p-4 shadow-sm ${className}`}
      onPress={onPress}
    >
      <Text className="text-lg font-semibold text-slate-900">{service.title}</Text>
      <Text className="mt-1 line-clamp-2 text-sm text-slate-600">
        {service.description}
      </Text>
      <Text className="mt-2 text-base font-medium text-marketplace-primary">
        {formatPrice(service.price)}
      </Text>
    </View>
  );
}
