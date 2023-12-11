<!--
File Name: Navbar.vue
Author: Alexandre Kévin De Freitas Martins
Creation Date: 2023
Description: This file is the navbar component

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
import { useColorMode } from "@vueuse/core";
import type { IUserCookie } from "~/types/IUserCookie";
import type { ISelectOptionsProps } from "~/types/ISelectProps";

const i18n = useI18n();
const colorMode = useColorMode();
const userCookie = useCookie<IUserCookie>("user");

const isDark = computed({
    get() {
        return colorMode.value === "dark";
    },
    set() {
        colorMode.value = colorMode.value === "dark" ? "light" : "dark";
    },
});

let availableLocales = computed(() => i18n.availableLocales);

const localesItems: ISelectOptionsProps[][] = [];

for (const locale of availableLocales.value) {
    localesItems.push([
        {
            name: locale,
            label: i18n.t(`locales.${locale}`),
            icon: "i-heroicons-globe-alt",
            value: locale,
            click: () => (i18n.locale.value = locale),
        },
    ]);
}

function isUserLoggedIn() {
    return userCookie.value?.user !== null;
}
</script>

<template>
    <header
        class="fixed w-full top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-gray-50/75 dark:bg-base-dark/75 dark:bg-opacity-60 backdrop-blur"
    >
        <div
            class="flex items-center justify-between gap-3 h-[--header-height] mx-auto px-4 md:px-6 lg:px-8 max-w-7xl"
        >
            <div class="flex items-center justify-start gap-4">
                <NuxtLink to="/" class="flex items-center gap-2">
                    <img
                        src="/landing/icons/logo.png"
                        alt="Tuxonaute Logo"
                        width="50"
                        height="50"
                    />
                    <span
                        class="text-2xl font-bold text-gray-900 dark:text-gray-100"
                    >
                        Tuxonaute
                    </span>
                </NuxtLink>
            </div>
            <div class="flex flex-row gap-2 items-center">
                <UButton
                    to="/"
                    size="lg"
                    color="gray"
                    variant="ghost"
                    :label="i18n.t('landing.navbar.home')"
                />
                <UButton
                    to="https://github.com/Tux-Inc/Tuxonaute/releases"
                    size="lg"
                    color="gray"
                    variant="ghost"
                    :label="i18n.t('landing.navbar.changelog')"
                />
                <UButton
                    to="https://github.com/Tux-Inc/Tuxonaute/wiki"
                    size="lg"
                    color="gray"
                    variant="ghost"
                    :label="i18n.t('landing.navbar.documentation')"
                />
            </div>
            <div class="flex gap-2 items-center">
                <ClientOnly>
                    <UButton
                        :icon="
                            isDark
                                ? 'i-heroicons-moon-20-solid'
                                : 'i-heroicons-sun-20-solid'
                        "
                        color="gray"
                        variant="ghost"
                        aria-label="Theme"
                        @click="isDark = !isDark"
                    />
                    <UDropdown
                        class="ml-2.5"
                        :items="localesItems"
                        :ui="{ item: { disabled: 'cursor-text select-text' } }"
                        :popper="{ placement: 'bottom-start' }"
                    >
                        <UButton
                            icon="i-heroicons-language"
                            color="gray"
                            variant="ghost"
                            aria-label="Language"
                        />
                    </UDropdown>
                </ClientOnly>
                <UButton
                    v-if="isUserLoggedIn()"
                    icon="i-heroicons-arrow-right-on-rectangle"
                    to="/app"
                    color="primary"
                    variant="solid"
                    :aria-label="i18n.t('auth.goToApp')"
                    :label="i18n.t('auth.goToApp')"
                />
                <UButton
                    v-else
                    icon="i-heroicons-arrow-right-on-rectangle"
                    to="/auth/sign-in"
                    color="primary"
                    variant="solid"
                    :aria-label="i18n.t('auth.signIn')"
                    :label="i18n.t('auth.signIn')"
                />
            </div>
        </div>
    </header>
</template>
