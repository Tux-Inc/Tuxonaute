<!--
File Name: sign-up.vue
Author: Alexandre Kévin De Freitas Martins
Creation Date: 2023
Description: This file is the sign up page

Copyright (c) 2023 Tux Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the 'Software'), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
-->

<script setup lang="ts">
import { useI18n } from "vue-i18n";

definePageMeta({
    layout: "default",
});

const i18n = useI18n();

import { ref } from "vue";
import type { FormError, FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";

const state = ref({
    email: undefined,
    name: undefined,
    password1: undefined,
    password2: undefined,
});

const isLoading = ref(false);
const validate = (state: any): FormError[] => {
    const errors = [];
    if (!state.email) errors.push({ path: "email", message: "Required" });
    if (!state.name) errors.push({ path: "name", message: "Required" });
    if (!state.password1)
        errors.push({ path: "password", message: "Required" });
    if (!state.password2)
        errors.push({ path: "confirmPassword", message: "Required" });
    return errors;
};

const toast = useToast();
const router = useRouter();
const runtimeConfig = useRuntimeConfig();

async function submit(event: FormSubmitEvent<any>) {
    isLoading.value = true;
    const { error } = await useFetch(
        `${runtimeConfig.public.API_BASE_URL}/auth/sign-up`,
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
            title: "Confirm Email",
            icon: "i-heroicons-envelope",
            color: "primary",
            description: `An email has been sent to ${event.data.email} to confirm your email address.`,
            timeout: 10000,
        });
        await router.push("/auth/sign-in");
    }
}
</script>

<template>
    <div
        class="h-screen w-full flex flex-col gap-4 items-center justify-center"
    >
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
                        v-model="state.email"
                        placeholder="john.doe@example.com"
                    />
                </UFormGroup>
                <UFormGroup :label="i18n.t('auth.form.name')" name="name">
                    <UInput v-model="state.name" placeholder="John Doe" />
                </UFormGroup>
                <UFormGroup
                    :label="i18n.t('auth.form.password')"
                    name="password"
                >
                    <UInput
                        v-model="state.password1"
                        type="password"
                        placeholder="********"
                    />
                </UFormGroup>
                <UFormGroup
                    :label="i18n.t('auth.form.confirmPassword')"
                    name="confirmPassword"
                >
                    <UInput
                        v-model="state.password2"
                        type="password"
                        placeholder="********"
                    />
                </UFormGroup>
                <UButton
                    :label="i18n.t('auth.button.next')"
                    block
                    size="lg"
                    trailing-icon="i-heroicons-arrow-right"
                    type="submit"
                    :loading="isLoading"
                />
                <UButton
                    :label="i18n.t('auth.button.back')"
                    block
                    size="lg"
                    icon="i-heroicons-arrow-left"
                    to="/auth/sign-in"
                    color="primary"
                    variant="ghost"
                />
            </UForm>
        </UCard>
    </div>
</template>
