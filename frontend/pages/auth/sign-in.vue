<!--
File Name: index.client.vue
Author: Alexandre Kévin De Freitas Martins
Creation Date: 2023
Description: The main page of the application.

Copyright (c) 2023 Tux Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
-->

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import type { IUserCookie } from "~/types/IUserCookie";
import type { FormError, FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";

const runtimeConfig = useRuntimeConfig();
const userCookie = useCookie("user");
const router = useRouter();
const toast = useToast();
const i18n = useI18n();

definePageMeta({
    layout: "default",
});

const state = ref({
    emailOrUsername: undefined,
    password: undefined,
});

const isLoading = ref(false);
const validate = (state: any): FormError[] => {
    const errors = [];
    if (!state.emailOrUsername)
        errors.push({ path: "email", message: "Required" });
    if (!state.password) errors.push({ path: "password", message: "Required" });
    return errors;
};

async function submit(event: FormSubmitEvent<any>) {
    console.log("Here");
    console.log(runtimeConfig.public.API_BASE_URL);
    isLoading.value = true;
    const { data, error } = await useFetch(
        `${runtimeConfig.public.API_BASE_URL}/auth/sign-in`,
        { method: "POST", body: JSON.stringify(event.data) },
    );
    if (error.value) {
        isLoading.value = false;
        toast.add({
            color: "red",
            icon: "i-heroicons-exclamation-triangle",
            title: `Error ${error.value.statusCode}`,
            description: error.value.data.message,
        });
    } else {
        isLoading.value = false;
        toast.add({
            color: "green",
            icon: "i-heroicons-check-circle",
            title: "Success",
            description: "You are now logged in",
        });
        const userAuth = Object.assign({} as any, data.value);
        const userObject: IUserCookie = {
            user: userAuth.user,
            accessToken: userAuth.accessToken,
            refreshToken: userAuth.refreshToken,
        };
        userCookie.value = JSON.stringify(userObject);
        await router.push("/app");
    }
}
</script>

<template>
    <div
        class="h-screen w-full flex flex-col gap-4 items-center justify-center"
    >
        <Head>
            <Title>Tuxonaute Sign-In</Title>
            <Meta name="description" content="Put your description here." />
        </Head>
        <NuxtLink
            to="/"
            class="flex items-center gap-2"
            aria-label="Go back to home page"
        >
            <img
                src="/landing/icons/logo.png"
                alt="Tuxonaute Logo"
                width="40"
                height="40"
            />
            <span class="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Tuxonaute
            </span>
        </NuxtLink>
        <UCard class="w-full sm:w-1/2 md:w-1/3">
            <UForm
                :validate="validate"
                :state="state"
                @submit="submit"
                class="flex flex-col gap-4"
            >
                <UFormGroup :label="i18n.t('auth.form.email')" name="email">
                    <UInput
                        v-model="state.emailOrUsername"
                        placeholder="john.doe@example.com"
                    />
                </UFormGroup>
                <UFormGroup
                    :label="i18n.t('auth.form.password')"
                    name="password"
                >
                    <UInput
                        v-model="state.password"
                        type="password"
                        placeholder="********"
                    />
                </UFormGroup>
                <UButton
                    :label="i18n.t('auth.button.signIn')"
                    block
                    size="lg"
                    icon="i-heroicons-arrow-right-on-rectangle"
                    type="submit"
                    :loading="isLoading"
                />
                <UButton
                    :label="i18n.t('auth.button.signUp')"
                    block
                    size="lg"
                    to="/auth/sign-up"
                    color="gray"
                    variant="solid"
                />
                <!-- <NuxtLink
                    class="flex items-center justify-center w-full"
                    to="/auth/forgot-password"
                > -->
                <span
                    class="mx-auto text-center text-sm text-gray-500 dark:text-gray-400 hover:underline"
                    >{{ i18n.t("auth.button.forgotPassword") }}</span
                >
                <!-- </NuxtLink> -->
            </UForm>
        </UCard>
    </div>
</template>
