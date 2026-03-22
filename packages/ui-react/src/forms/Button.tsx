import { View, Text } from '../Platform';

export interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
}

export function Button({
  children,
  onPress,
  variant = 'primary',
  className = '',
  disabled = false,
}: ButtonProps) {
  const base = 'rounded-lg px-4 py-2 font-medium';
  const variants = {
    primary: 'bg-marketplace-primary text-white',
    secondary: 'bg-slate-200 text-slate-800',
  };
  return (
    <View
      className={`${base} ${variants[variant]} ${disabled ? 'opacity-50' : ''} ${className}`}
      onClick={disabled ? undefined : onPress}
      onTouchEnd={disabled ? undefined : onPress}
      role="button"
    >
      <Text className="text-center">{children}</Text>
    </View>
  );
}
