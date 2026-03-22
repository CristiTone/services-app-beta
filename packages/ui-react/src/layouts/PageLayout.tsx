import { View, Text } from '../Platform';

export interface PageLayoutProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function PageLayout({ title, children, className = '' }: PageLayoutProps) {
  return (
    <View className={`min-h-screen bg-slate-50 p-4 ${className}`}>
      {title && (
        <Text className="mb-4 text-2xl font-bold text-slate-900">{title}</Text>
      )}
      {children}
    </View>
  );
}
