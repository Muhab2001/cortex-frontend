<template>
  <NTag
    @close="$emit('delete', props.fileUrl)"
    class="t-mr-1 t-inline-flex t-items-center"
    :closable="props.editable"
  >
    <a :href="props.fileUrl" download
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
import { type Component, h, defineProps, defineEmits } from "vue";

interface AttachementProps {
  filetype: FileType;
  editable: boolean;
  fileUrl: string;
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
      return renderIcon(FileImage, { color: "#C060A1" });

    case FileType.DOCX:
    case FileType.PDF:
      return renderIcon(File, { color: "#3E6D9C" });
    case FileType.PPT:
    case FileType.PPTX:
      return renderIcon(Tabs24Filled, { color: "#FF731D" });
    case FileType.FOLDER:
      return renderIcon(Folder24Filled);
    default:
      throw new Error("File type unidentified");
  }
};

const renderIcon = (icon: Component, options?: { [key: string]: string }) => {
  return () => {
    return h(NIcon, options, {
      default: () => h(icon),
    });
  };
};

const fileIcon = createIcon(props.filetype);
</script>
<style scoped>
a {
  text-decoration: none;
  color: unset;
}
</style>
