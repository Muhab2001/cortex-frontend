<script setup lang="ts">
import axios from "axios";
import {
  type FormValidationError,
  NButton,
  NForm,
  NFormItem,
  NInput,
  useMessage,
  type FormInst,
  type FormRules,
} from "naive-ui";
import { ref } from "vue";

// UI framwork logic
const formRef = ref<FormInst | null>(null);
const messenger = useMessage();

// interfaces
interface LoggingModel {
  username: string | null;
  password: string | null;
}
// state
const model = ref<LoggingModel>({
  username: null,
  password: null,
});

const rules: FormRules = {
  username: {
    required: true,
    message: "Please enter your username",
    trigger: ["blur"],
  },
  password: {
    required: true,
    message: "Please enter your password",
    trigger: ["blur"],
  },
};

// handlers

const submitForm = () => {
  console.log("HELLOOO!!");

  formRef.value?.validate(
    async (errors: Array<FormValidationError> | undefined) => {
      if (!errors) {
        try {
          console.log(
            await axios.post("/login", {
              username: model.value.username,
              password: model.value.password,
            })
          );
          messenger.success("Successful sign in!");
        } catch (e: any) {
          messenger.error("Login Failed!");
        }
      } else {
        console.log(errors);
        messenger.error("Login Failed!");
      }
    }
  );
};
</script>

<template>
  <main
    class="t-w-[100vw] t-flex t-flex-col t-items-center t-justify-center t-h-full t-px-[12vw]"
  >
    <header class="t-flex-col t-items-center t-text-center">
      <h1 class="t-font-sans t-font-bold t-m-auto t-text-[4rem]">Cortex</h1>
      <p class="t-mb-10">New Era of premium learning experience</p>
    </header>
    <NForm
      class="sm:t-w-full md:t-w-72 lg:t-w-80"
      ref="formRef"
      :label-width="80"
      :model="model"
      :rules="rules"
    >
      <NFormItem path="username" label="Username">
        <NInput
          type="text"
          v-model:value="model.username"
          @keydown.enter.prevent
        />
      </NFormItem>
      <NFormItem path="password" label="Password">
        <NInput
          type="password"
          v-model:value="model.password"
          @keydown.enter.prevent
        />
      </NFormItem>
      <NButton
        @click="submitForm"
        class="t-w-full hover:t-bg-green-500 hover:t-text-white"
        >Login</NButton
      >
    </NForm>
  </main>
</template>

<style></style>
