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
      className={`flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}
      onPress={onPress}
    >
      <View className="h-1.5 w-full bg-gradient-to-r from-sky-400 to-sky-600" />
      <View className="flex flex-1 flex-col p-5">
        <Text className="text-base font-semibold leading-snug text-slate-900">
          {service.title}
        </Text>
        <Text className="mt-2 line-clamp-2 flex-1 text-sm text-slate-500">
          {service.description}
        </Text>
        <View className="mt-4 flex flex-row items-center justify-between">
          <Text className="text-lg font-bold text-sky-600">
            {formatPrice(service.price)}
          </Text>
          {service.provider && (
            <Text className="text-xs text-slate-400">{service.provider.name}</Text>
          )}
        </View>
      </View>
    </View>
  );
}
