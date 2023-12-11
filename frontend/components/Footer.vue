<!--
File Name: Footer.vue
Author: Alexandre Kévin De Freitas Martins
Creation Date: 2023
Description: Component for footer

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

const i18n = useI18n();
const currentYear = new Date().getFullYear();
</script>

<template>
    <div>
        <div
            class="w-full h-px bg-gray-200 dark:bg-gray-800 flex items-center justify-center"
        >
            <div class="bg-gray-50 dark:bg-gray-900 px-2">
                <img
                    src="/landing/icons/logo.png"
                    alt="Tux Inc. Logo"
                    width="50"
                    height="50"
                />
            </div>
        </div>
        <footer class="relative">
            <div
                class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 lg:flex lg:items-center lg:justify-between lg:py-4"
            >
                <div
                    class="lg:flex-1 flex items-center justify-center lg:justify-end gap-x-1.5 lg:order-3"
                >
                    <UButton
                        aria-label="Discord Logo"
                        icon="i-mdi-discord"
                        size="sm"
                        to="https://discord.gg/2YHSAeV"
                        color="gray"
                        variant="ghost"
                    />
                    <UButton
                        aria-label="Linkedin Logo"
                        icon="i-mdi-linkedin"
                        size="sm"
                        to="https://www.linkedin.com/company/tux-inc"
                        color="gray"
                        variant="ghost"
                    />
                    <UButton
                        aria-label="Twitter Logo"
                        icon="i-mdi-twitter"
                        size="sm"
                        to="https://x.com/tuxinc"
                        color="gray"
                        variant="ghost"
                    />
                    <UButton
                        aria-label="Github Logo"
                        icon="i-mdi-github"
                        size="sm"
                        to="https://github.com/tux-inc"
                        color="gray"
                        variant="ghost"
                    />
                </div>
                <div
                    class="mt-3 lg:mt-0 lg:order-2 flex items-center justify-center"
                >
                    <span
                        class="text-sm text-gray-500 dark:text-gray-400"
                        v-html="i18n.t('landing.footer.publishedWith')"
                    />
                </div>
                <div
                    class="lg:flex-1 flex items-center justify-center lg:justify-start gap-x-1.5 lg:order-1"
                >
                    <span
                        class="text-sm text-gray-500 dark:text-gray-400"
                        v-html="i18n.t('landing.footer.poweredBy')"
                    />
                </div>
            </div>
        </footer>
    </div>
</template>
