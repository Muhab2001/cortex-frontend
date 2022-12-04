import { defineStore } from "pinia";
import { readonly, reactive } from "vue";

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

//  a composable to switch theme of the application look
export const useThemeConfig = defineStore("theme", () => {
  const theme = reactive<{ value: Theme }>({
    value: (localStorage.getItem("cortex-theme") as Theme) ?? Theme.DARK,
  });

  function switchTheme(): void {
    if (theme.value == Theme.DARK) {
      localStorage.setItem("cortex-theme", Theme.LIGHT);
      theme.value = Theme.LIGHT;
    } else {
      localStorage.setItem("cortex-theme", Theme.DARK);
      theme.value = Theme.DARK;
    }
  }

  return { theme, switchTheme };
});
