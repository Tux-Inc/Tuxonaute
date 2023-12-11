<!--
File Name: index.client.vue
Author: Alexandre Kévin De Freitas Martins
Creation Date: 2023
Description: This file is the index page of the website.

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

definePageMeta({
    layout: "navigation",
});

const i18n = useI18n();
</script>

<template>
    <div>
        <Head>
            <Title>Tuxonaute Home</Title>
            <Meta name="description" content="Put your description here." />
        </Head>
        <div
            class="relative py-24 sm:py-32 md:py-40 mb-[calc(var(--header-height)*2)]"
        >
            <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <div class="relative z-[1] text-center">
                    <h1
                        class="text-4xl font-extrabold text-dark dark:text-light sm:text-5xl md:text-6xl"
                        v-html="i18n.t('landing.home.title')"
                    />
                    <p
                        class="mt-6 text-lg tracking-tight text-gray-600 dark:text-gray-300"
                    >
                        {{ i18n.t("landing.home.description") }}
                    </p>
                    <div
                        class="mt-10 flex flex-wrap gap-x-6 gap-y-3 justify-center"
                    >
                        <UButton
                            icon="i-heroicons-rocket-launch"
                            size="lg"
                            to="/auth/sign-in"
                            color="primary"
                            variant="solid"
                            >{{ i18n.t("landing.home.getStarted") }}
                        </UButton>
                        <UButton
                            icon="i-mdi-github"
                            size="lg"
                            to="https://github.com/tux-inc/Tuxonaute"
                            target="_blank"
                            color="white"
                            variant="solid"
                            >{{ i18n.t("landing.home.viewOnGitHub") }}
                        </UButton>
                    </div>
                    <div class="py-24">
                        <UIcon
                            name="i-heroicons-chevron-down"
                            class="text-4xl text-dark dark:text-light animate-bounce"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
