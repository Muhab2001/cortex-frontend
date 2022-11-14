import { defineStore } from "pinia";
import { darkTheme } from "naive-ui";
import { readonly, ref } from "vue";

//  a composable to switch theme of the application look
export const useThemeConfig = defineStore("theme", () => {
  const theme = ref<any>(null);

  function switchTheme(): void {
    theme.value = theme.value ?? darkTheme;
  }

  return readonly({ theme, switchTheme });
});
