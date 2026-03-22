/**
 * Platform-aware primitives: use View/Text on React Native (and react-native-web on web).
 * When bundling for web with react-native-web alias, View renders as div and Text as span.
 * This allows a single component tree to work on both platforms.
 */
import { createElement } from 'react';

// Type for style-like object (RN) or className (web via NativeWind)
export type ViewProps = {
  children?: React.ReactNode;
  className?: string;
  style?: unknown;
  [key: string]: unknown;
};

export type TextProps = ViewProps;

// Default to div/span for web when react-native is not available (e.g. Astro without RN web)
let ViewComponent: React.ComponentType<ViewProps>;
let TextComponent: React.ComponentType<TextProps>;

try {
  const RN = require('react-native');
  ViewComponent = RN.View;
  TextComponent = RN.Text;
} catch {
  ViewComponent = ({ children, className, onPress, ...rest }: ViewProps) =>
    createElement('div', {
      className,
      onClick: onPress as () => void,
      onTouchEnd: onPress as () => void,
      role: onPress ? 'button' : undefined,
      ...rest,
    }, children);
  TextComponent = ({ children, className, ...rest }: TextProps) =>
    createElement('span', { className, ...rest }, children);
}

export const View = ViewComponent;
export const Text = TextComponent;
