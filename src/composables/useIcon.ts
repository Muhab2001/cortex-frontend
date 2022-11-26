import { NIcon } from "naive-ui";
import { type Component, h, readonly } from "vue";

export function useIcon() {
  const renderIcon = (icon: Component, options?: { [key: string]: string }) => {
    return () => {
      return h(NIcon, options, {
        default: () => h(icon),
      });
    };
  };

  return readonly({ renderIcon });
}
