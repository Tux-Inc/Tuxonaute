<!--
File Name: AppNavbar.vue
Author: Alexandre Kévin De Freitas Martins
Creation Date: 2023
Description: Navbar of the application

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
import { useI18n } from "vue-i18n";
import { useColorMode } from "@vueuse/core";
import type { IUserCookie } from "~/types/IUserCookie";

const i18n = useI18n();
const localesItems: any = [];
const { $event } = useNuxtApp();
const colorMode = useColorMode();
const { metaSymbol } = useShortcuts();
const userCookie = useCookie<IUserCookie>("user");
const availableLocales = computed(() => i18n.availableLocales);

const isDark = computed({
    get() {
        return colorMode.value === "dark";
    },
    set() {
        colorMode.value = colorMode.value === "dark" ? "light" : "dark";
    },
});

for (const locale of availableLocales.value) {
    localesItems.push([
        {
            label: i18n.t(`locales.${locale}`),
            icon: "i-heroicons-globe-alt",
            click: () => (i18n.locale.value = locale),
        },
    ]);
}

const items = [
    [
        {
            label: "User",
            slot: "account",
            disabled: true,
        },
    ],
    [
        {
            label: "Settings",
            icon: "i-heroicons-cog-8-tooth",
            to: "/app/settings",
        },
    ],
    [
        {
            label: "Documentation",
            icon: "i-heroicons-book-open",
            to: "https://github.com/tux-inc/Tuxify/wiki",
            target: "_blank",
        },
        {
            label: "Changelog",
            icon: "i-heroicons-megaphone",
            to: "https://github.com/tux-inc/Tuxify/releases",
            target: "_blank",
        },
        {
            label: "Status",
            icon: "i-heroicons-signal",
            to: "https://stats.uptimerobot.com/pPJ16SQOWq",
            target: "_blank",
        },
    ],
    [
        {
            label: "Sign out",
            icon: "i-heroicons-arrow-left-on-rectangle",
            to: "/",
        },
    ],
];

function getUserImage() {
    // try {
    //     return `https://www.gravatar.com/avatar/${md5(
    //         userCookie.value.user.email.trim().toLowerCase(),
    //     )}`;
    // } catch (error) {
    return "https://www.gravatar.com/avatar/feur";
    // }
}

function getUserAlt() {
    try {
        return "User" + " avatar";
    } catch (error) {
        return "User";
    }
}
</script>

<template>
    <header
        class="fixed w-full top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-gray-50/75 dark:bg-base-dark/75 dark:bg-opacity-60 backdrop-blur"
    >
        <div
            class="flex items-center justify-between gap-3 h-[--header-height] px-6"
        >
            <div class="flex items-center justify-start gap-4">
                <NuxtLink
                    to="/app"
                    aria-label="Go back to home page"
                    class="flex items-center gap-2"
                >
                    <img
                        src="/landing/icons/logo.png"
                        alt="Tuxonaute Logo"
                        width="75"
                        height="75"
                    />
                    <span
                        class="text-2xl font-bold text-gray-900 dark:text-gray-100"
                    >
                        Tuxonaute
                    </span>
                </NuxtLink>
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
                    <UDropdown
                        class="ml-2.5"
                        :items="items"
                        :ui="{ item: { disabled: 'cursor-text select-text' } }"
                        :popper="{ placement: 'bottom-start' }"
                    >
                        <UAvatar
                            :src="getUserImage()"
                            :alt="getUserAlt()"
                            class="flex-shrink-0 h-8 w-8 bg-base-dark dark:bg-base-light"
                        />
                        <template #account="{ item }">
                            <div class="text-left w-full">
                                <p>Signed in as</p>
                                <p
                                    class="text-ellipsis overflow-hidden font-medium text-gray-900 dark:text-white"
                                >
                                    {{ item.label }}
                                </p>
                            </div>
                        </template>
                        <template #item="{ item }">
                            <span class="truncate">{{ item.label }}</span>
                            <UIcon
                                :name="item.icon"
                                class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
                            />
                        </template>
                    </UDropdown>
                </ClientOnly>
            </div>
        </div>
    </header>
</template>
