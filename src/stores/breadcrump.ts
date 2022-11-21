import { defineStore } from "pinia";
import { reactive, readonly, watch, computed } from "vue";

interface breadcrumbOption {
  label: string;
  path: string;
}

export const useBreadCrumb = defineStore("breadcrumb", () => {
  const state = reactive<{ options: breadcrumbOption[] }>({ options: [] });

  function updateOptions(newOptions: breadcrumbOption[]) {
    state.options = [...newOptions];
  }

  return readonly({ state, updateOptions });
});
