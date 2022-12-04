<template>
  <NCard
    hoverable
    class="t-rounded-md t-w-full t-mb-2 t-break-inside-avoid t-cursor-pointer t-border-solid t-border-[2px]"
    content-style="display:flex; align-items: center; padding: 12px; flex-direction: column; padding-bottom: 1px"
    footer-style="padding-bottom: 6px"
  >
    <div name="text-content" class="t-w-full">
      <span
        class="t-inline-flex t-flex-col t-w-full"
        name="item-meta-container"
      >
        <span
          name="item-title"
          class="t-h-full t-inline-flex t-items-center t-justify-between t-w-full t-mb-1"
        >
          <span
            name="item-text-title"
            class="t-inline-flex t-items-center t-flex-wrap"
          >
            <span class="t-mr-2 t-h-full t-flex t-items-center"
              ><headerIcon></headerIcon></span
            ><NEllipsis
              expand-trigger="click"
              :line-clamp="1"
              class="t-font-semibold t-text-lg t-mr-2"
              >{{ itemState.title }}</NEllipsis
            >
            <!-- TODO: add an if-statement to hide for students -->
            <NTag
              v-if="props.isSubmitted && !props.editable"
              type="success"
              :bordered="false"
              round
            >
              Submitted
              <template #icon><NIcon :component="CheckmarkCircle" /></template>
            </NTag>
            <NTag
              v-if="
                !props.isSubmitted &&
                new Date(props.deadline).getTime() < Date.now() &&
                !props.editable
              "
              type="error"
              :bordered="false"
              round
            >
              Expired
              <template #icon
                ><NIcon :component="ErrorCircle24Filled"
              /></template>
            </NTag>
          </span>
          <span
            class="t-inline-flex t-flex-nowrap t-min-w-[120px]"
            v-if="props.editable"
            name="editing-bar"
          >
            <NButton
              class="t-mr-2"
              @click="$emit('delete', props.id)"
              strong
              secondary
              circle
              type="error"
              ><NIcon size="18">
                <Icon>
                  <Delete24Filled></Delete24Filled>
                </Icon>
              </NIcon>
            </NButton>
            <NButton
              class="t-mr-2"
              @click="editItem"
              strong
              secondary
              circle
              type="info"
            >
              <NIcon size="18">
                <Icon>
                  <Edit16Filled></Edit16Filled>
                </Icon>
              </NIcon>
            </NButton>
            <VisibilityDropdown
              :visible="itemState.visible"
              @single-toggle="toggleContentForSection"
            ></VisibilityDropdown>
          </span>
        </span>
        <NEllipsis
          line-clamp="3"
          class="t-text-md t-text-slate-500 t-mb-2"
          v-if="itemState.description"
          name="item-description"
          >{{ itemState.description }}</NEllipsis
        >
      </span>
    </div>
    <div name="file-contents" class="t-w-full t-mt-1">
      <FileAttachement
        @delete="deleteFile"
        v-for="fileURL in itemFiles"
        :editable="props.editable"
        :key="fileURL"
        :file-url="fileURL"
        :filetype="fileURL.split('.').slice(-1)[0] as FileType"
        :active="itemState.visible"
      />
    </div>
    <NDivider title-placement="left" class="t-py-2 t-my-1"
      ><NIcon
        size="22"
        :color="itemState.visible ? '#2080f0' : ''"
        :component="List28Filled"
        class="t-mr-2"
      />
      <span class="t-text-gray-600 t-font-medium dark:t-text-white"
        >Details</span
      ></NDivider
    >

    <NSpace
      name="assignment-specs"
      class="t-flex t-justify-start t-w-full t-px-3 t-pb-3 t-flex-col sm:t-flex-row"
    >
      <NTag
        round
        size="large"
        class="t-flex t-justify-center t-items-center t-py-3"
      >
        <template #icon>
          <NIcon
            class="t-mx-1"
            :component="Clock16Filled"
            :color="itemState.visible ? '#FB2576' : 'grey'"
            size="25"
          />
        </template>
        <div
          class="t-flex t-flex-wrap t-w-full sm:t-w-fit t-text-xs sm:t-text-inherit"
        >
          <span class="t-font-semibold t-text-md t-mr-2">Deadline</span
          ><span>{{ new Date(itemState.deadline).toLocaleString() }}</span>
        </div>
      </NTag>
      <NTag
        round
        size="large"
        class="t-flex t-justify-center t-items-center t-py-3"
      >
        <template #icon>
          <NIcon
            class="t-mx-1"
            :component="Star20Filled"
            :color="itemState.visible ? '#FED049' : 'grey'"
            size="25"
          />
        </template>
        <span
          class="t-font-semibold md:t-text-md t-mr-3 t-text-xs sm:t-text-inherit"
          >Max Points</span
        ><span class="t-font-semibold t-text-yellow-400">{{
          itemState.maxScore
        }}</span>
      </NTag>
      <NTag
        round
        size="large"
        class="t-flex t-justify-center t-items-center t-py-3"
      >
        <template #icon>
          <NIcon
            class="t-mx-1"
            :component="CheckboxCheckedSync16Filled"
            :color="itemState.visible ? '#009EFF' : 'grey'"
            size="25"
          />
        </template>
        <span
          class="t-font-semibold md:t-text-md t-mr-3 t-text-xs sm:t-text-inherit"
          >Submissions</span
        ><span
          v-if="!itemState.isUnlimited"
          class="t-text-blue-500 t-font-medium"
          >{{ itemState.submissions }}</span
        >
        <span
          v-else
          class="t-text-blue-500 t-font-medium t-text-xs sm:t-text-inherit"
          >No Limit</span
        >
      </NTag>

      <NTag
        v-if="!props.isUnlimited && auth.userProfile.role === Role.STUDENT"
        round
        size="large"
        class="t-flex t-justify-center t-items-center t-py-3"
      >
        <template #icon>
          <NIcon
            class="t-mx-1"
            :component="CheckboxChecked20Filled"
            :color="itemState.visible ? '#82CD47' : 'grey'"
            size="25"
          />
        </template>
        <span
          class="t-font-semibold md:t-text-md t-mr-3 t-text-xs sm:t-text-inherit"
          >Submissions Left</span
        ><span class="t-text-green-500 t-font-medium">{{
          itemState.submissionsLeft
        }}</span>
      </NTag>
    </NSpace>
    <template v-if="props.editable">
      <NDivider class="t-py-0 t-my-1"></NDivider>
      <NButton
        secondary
        strong
        @click="
          router.push(
            `/grade/${courseInfo?.courseId}-${courseInfo?.sectionNo}/${props.sectionId}/${props.id}`
          )
        "
        icon-placement="left"
        type="warning"
        class="t-w-full t-my-2 t-flex t-items-center"
        ><template #icon>
          <NIcon :component="Star20Filled" />
        </template>

        Grade Submissions</NButton
      >
    </template>
    <template v-else>
      <NDivider class="t-py-0 t-my-1"></NDivider>
      <NButton
        secondary
        strong
        @click="
          () => {
            $emit('submit', props.title, props.id, props.description);
          }
        "
        :disabled="
          itemState.submissionsLeft === 0 ||
          new Date(props.deadline).getTime() < Date.now()
        "
        icon-placement="left"
        type="primary"
        class="t-w-full t-my-2 t-flex t-items-center"
        ><template #icon>
          <NIcon :component="Star20Filled" />
        </template>

        New Submission</NButton
      >
    </template>

    <NDivider class="t-py-0 t-my-1"></NDivider>
    <template #footer
      ><div class="t-flex t-flex-wrap">
        <span class="t-font-thin t-mr-2">Last Updated </span>
        <span
          :class="`t-font-medium ${
            itemState.visible ? 't-text-blue-400' : 't-text-gray-500'
          }`"
          >{{ new Date(itemState.updatedAt).toLocaleString() }}</span
        >
      </div>
    </template>
  </NCard>
</template>
<script setup lang="ts">
import FileAttachement from "@/components/utils/fileAttachement.vue";
import { useIcon } from "@/composables/useIcon";
import type { FileType } from "@/enums/fileTypes";
import {
  CheckboxChecked20Filled,
  CheckboxCheckedSync16Filled,
  Clock16Filled,
  Delete24Filled,
  Edit16Filled,
  ErrorCircle24Filled,
  List28Filled,
  Star20Filled,
} from "@vicons/fluent";
import { AssignmentRound } from "@vicons/material";
import { Icon } from "@vicons/utils";
import {
  NButton,
  NDivider,
  useDialog,
  NCard,
  NIcon,
  NTag,
  NSpace,
  NEllipsis,
  useMessage,
} from "naive-ui";
import { computed, reactive, ref, inject } from "vue";
import VisibilityDropdown from "../utils/VisibilityDropdown.vue";
import { CheckmarkCircle } from "@vicons/ionicons5";
import { useRouter } from "vue-router";
import { AxiosInstance } from "@/axios";
import { useAuth } from "@/stores/auth";
import { Role } from "@/enums/roles";
import { CourseMeta } from "@/injection_keys/courseView.keys";
interface AssignmentItemProps {
  id: number;
  sectionId: number;
  title: string;
  description?: string;
  updatedAt: string;
  editable: boolean;
  submissions?: number; // an instructor view does not contain the submission count
  submissionsLeft?: number;
  isSubmitted?: boolean;
  isUnlimited: boolean;
  deadline: number;
  fileUrls: string[];
  maxScore: number;
  visible: boolean;
  isSubmittable: boolean;
}

const props = defineProps<AssignmentItemProps>();
console.log("DEADLINE", new Date(props.deadline).toLocaleString());
const courseInfo = inject(CourseMeta);

const emits = defineEmits<{
  (e: "delete", id: number): void;
  (
    e: "edit",
    item: Omit<AssignmentItemProps, "editable" | "lastUpdated">
  ): void;
  (
    e: "submit",
    title: string,
    assignmentId: number,
    description?: string
  ): void;
}>();
const dialog = useDialog();
const itemFiles = ref<string[]>(props.fileUrls);

const iconUtils = useIcon();
const router = useRouter();
const messenger = useMessage();
const auth = useAuth();

const itemState = reactive<AssignmentItemProps>({ ...props });

const headerIcon = computed(() =>
  iconUtils.renderIcon(AssignmentRound, {
    color: itemState.visible ? "#F49D1A" : "grey",
    size: "24",
  })
);

// TODO: supply functions that trigger deletion or editing of content files

function editItem() {
  emits("edit", {
    title: itemState.title,
    description: itemState.description,
    id: props.id,
    fileUrls: itemState.fileUrls,
    visible: itemState.visible,
    deadline: itemState.deadline,
    isUnlimited: itemState.isUnlimited,
    isSubmitted: itemState.isSubmitted,
    maxScore: itemState.maxScore,
    sectionId: props.sectionId,
    isSubmittable: props.isSubmittable,
    updatedAt: props.updatedAt,
  });
}

async function toggleContentForSection() {
  console.log(+!itemState.visible);

  try {
    await AxiosInstance.put("/assignments/" + props.id, {
      visible: +!itemState.visible,
    });
    messenger.success(
      `Assignment ${itemState.visible ? "hidden" : "revealed"} successfully`
    );
    itemState.visible = !itemState.visible;
  } catch (e) {
    messenger.error("Assignment visibility change failed");
  }
}

// function toggleContentForAll() {
//   itemState.visible = !itemState.visible;
//   // TODO: api call to toggle all other items in the same group
// }

function deleteFile(fileURL: string) {
  // fire a confirmation modal, and delete on confirmation
  dialog.warning({
    title: "Delete a file",
    content: "Are you sure you would like to delete the file?",
    positiveText: "Confirm",
    negativeText: "Cancel",
    maskClosable: true,
    onPositiveClick: async () => {
      await AxiosInstance.put("/assignments/files/" + props.id, {
        target: fileURL.replace(/.*\//g, ""),
      });
      itemFiles.value = itemFiles.value.filter((url) => url !== fileURL);
    },
    onMaskClick: () => {},
    onEsc: () => {},
  });
  // on confirmation, remove the delete object from the state, and call the DELETE method on the endpoint
}
</script>

<style></style>
