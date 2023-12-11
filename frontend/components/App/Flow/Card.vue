<!--
File Name: Card.vue
Author: Alexandre Kévin De Freitas Martins
Creation Date: 2023
Description: Component for card

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
import type { INote } from "~/types/INote";

const props = defineProps({
    note: {
        type: Object as PropType<INote>,
        required: true,
    },
});

async function redirectToFlow() {
    navigateTo(`/app/note/${props.note.id}`);
}
</script>

<template>
    <div
        @click.prevent="redirectToFlow"
        class="flex justify-between items-center bg-white dark:bg-transparent p-4 border border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
    >
        <div class="flex flex-col gap-1 w-full">
            <div class="flex gap-2 items-center">
                <span
                    class="text-2xl font-bold text-ellipsis overflow-hidden line-clamp-1"
                >
                    {{ note.title ? note.title : "No title" }}
                </span>
            </div>
            <div class="w-2/3">
                <span
                    class="text-ellipsis overflow-hidden line-clamp-1 text-gray-500 dark:text-gray-400"
                >
                    {{ note.description ? note.description : "No description" }}
                </span>
            </div>
        </div>
        <div>
            <UIcon
                name="i-heroicons-chevron-right"
                class="text-gray-500 dark:text-gray-400 text-2xl"
            />
        </div>
    </div>
</template>
