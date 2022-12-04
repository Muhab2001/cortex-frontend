<template>
  <NTag
    @close="$emit('delete', props.fileUrl)"
    class="t-mr-1 t-mb-1 t-inline-flex t-items-center"
    :closable="props.editable"
  >
    <a :href="AxiosInstance.defaults.baseURL + props.fileUrl" download
      ><span> <fileIcon></fileIcon> </span>
      {{ props.fileUrl.replace(/.*\//g, "") }}</a
    >
  </NTag>
</template>
<script setup lang="ts">
import { FileType } from "@/enums/fileTypes";
import { FileImage, File } from "@vicons/fa";
import { Folder24Filled, Tabs24Filled } from "@vicons/fluent";
import { NIcon, NTag } from "naive-ui";
import { type Component, h, computed } from "vue";
import { AxiosInstance } from "@/axios";
interface AttachementProps {
  filetype: FileType;
  editable: boolean;
  fileUrl: string;
  active: boolean;
}

const props = defineProps<AttachementProps>();
const emits = defineEmits<{
  (e: "delete", fileURL: string): void;
}>();

const createIcon = (icon: FileType) => {
  console.log(icon);

  switch (icon) {
    case FileType.JPEG:
    case FileType.JPG:
    case FileType.PNG:
      return renderIcon(FileImage, {
        color: props.active ? "#C060A1" : "grey",
      });

    case FileType.DOCX:
    case FileType.PDF:
      return renderIcon(File, { color: props.active ? "#3E6D9C" : "grey" });
    case FileType.PPT:
    case FileType.PPTX:
      return renderIcon(Tabs24Filled, {
        color: props.active ? "#FF731D" : "grey",
      });
    case FileType.FOLDER:
      return renderIcon(Folder24Filled, { color: props.active ? "" : "grey" });
    default:
      return renderIcon(File, { color: props.active ? "#3E6D9C" : "grey" });
  }
};

const renderIcon = (icon: Component, options?: { [key: string]: string }) => {
  return () => {
    return h(NIcon, options, {
      default: () => h(icon),
    });
  };
};

const fileIcon = computed(() => createIcon(props.filetype));
</script>
<style scoped>
a {
  text-decoration: none;
  color: unset;
}
</style>
