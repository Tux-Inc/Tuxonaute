<!--
File Name: app-navigation.vue
Author: Alexandre Kévin De Freitas Martins
Creation Date: 2023
Description: This file is the app navigation layout

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
const isNewNoteModalOpen = ref(false);
const { $listen } = useNuxtApp();

const pages = [
    {
        path: "app-notes",
        name: "Notes",
    },
    {
        path: "app-settings",
        name: "Settings",
    },
];

$listen("app:newNote", () => {
    isNewNoteModalOpen.value = !isNewNoteModalOpen.value;
});

$listen("app:noteCreated", () => {
    isNewNoteModalOpen.value = false;
});
</script>

<template>
    <div class="antialiased min-h-screen bg-gray-50 dark:bg-base-dark">
        <div>
            <AppNavbar />
            <div class="flex flex-row items-start justify-start">
                <AppSidebar />
                <div
                    class="w-full h-full ml-[--sidebar-width] mt-[--header-height] p-6"
                >
                    <slot />
                </div>
            </div>
        </div>
        <UModal v-model="isNewNoteModalOpen">
            <AppNoteNewForm />
        </UModal>
    </div>
</template>
