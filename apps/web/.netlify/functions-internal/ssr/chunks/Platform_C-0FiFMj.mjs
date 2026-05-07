import { createElement } from 'react';

function formatPrice(amount, currency = "EUR") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency
  }).format(amount);
}

let ViewComponent;
let TextComponent;
try {
  const RN = require("react-native");
  ViewComponent = RN.View;
  TextComponent = RN.Text;
} catch {
  ViewComponent = ({ children, className, onPress, ...rest }) => createElement("div", {
    className,
    onClick: onPress,
    onTouchEnd: onPress,
    role: onPress ? "button" : void 0,
    ...rest
  }, children);
  TextComponent = ({ children, className, ...rest }) => createElement("span", { className, ...rest }, children);
}
const View = ViewComponent;
const Text = TextComponent;

export { Text as T, View as V, formatPrice as f };
