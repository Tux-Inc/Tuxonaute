<!--
File Name: [id].vue
Author: Alexandre Kévin De Freitas Martins
Creation Date: 2023
Description: This file is note slug page

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
import type { INote } from "~/types/INote";
import type { IBlockFullProps } from "~/types/IBlockFullProps";
definePageMeta({
    layout: "app-navigation",
});
const toast = useToast();

const noteId = useRoute().params.id;

const deleted = ref(false);
const isSaving = ref(false);
const editingTitle = ref(false);
const editingDescription = ref(false);
const currentNote = ref<INote>({} as INote);

const contextualItems = [
    [
        {
            label: "Delete",
            icon: "i-heroicons-trash",
            click: async () => {
                await deleteNote();
                deleted.value = true;
                navigateTo("/app/notes");
            },
        },
    ],
];

async function getNote(): Promise<INote | undefined> {
    try {
        const res = await useApiRequest<INote>(`/notes/${noteId}`);
        if (!res._data) {
            navigateTo("/app/notes");
            toast.add({
                color: "red",
                icon: "i-heroicons-exclamation-circle",
                title: `Error`,
                description: `Note not found`,
            });
        } else {
            console.log(res._data);
            return res._data;
        }
    } catch (e: any) {
        navigateTo("/app/notes");
        toast.add({
            color: "red",
            icon: "i-heroicons-exclamation-circle",
            title: `Error ${e.response?.status}`,
            description: e.response?.statusText,
        });
    }
}

async function updateNote(): Promise<INote | undefined> {
    try {
        isSaving.value = true;
        const res = await useApiRequest<INote>(`/notes/${noteId}`, {
            method: "PUT",
            body: JSON.stringify(currentNote.value),
        });
        if (!res._data) {
            isSaving.value = false;
            toast.add({
                color: "red",
                icon: "i-heroicons-exclamation-circle",
                title: `Error`,
                description: `Note not found`,
            });
        } else {
            isSaving.value = false;
            return res._data;
        }
    } catch (e: any) {
        isSaving.value = false;
        toast.add({
            color: "red",
            icon: "i-heroicons-exclamation-circle",
            title: `Error ${e.response?.status}`,
            description: e.response?.statusText,
        });
    }
}

async function deleteNote(): Promise<INote | undefined> {
    try {
        const res = await useApiRequest<INote>(`/notes/${noteId}`, {
            method: "DELETE",
        });
        if (!res._data) {
            toast.add({
                color: "red",
                icon: "i-heroicons-exclamation-circle",
                title: `Error`,
                description: `Note not found`,
            });
        } else {
            return res._data;
        }
    } catch (e: any) {
        toast.add({
            color: "red",
            icon: "i-heroicons-exclamation-circle",
            title: `Error ${e.response?.status}`,
            description: e.response?.statusText,
        });
    }
}
onMounted(async () => {
    currentNote.value = (await getNote()) as INote;
});
onBeforeUnmount(async () => {
    if (!deleted.value) {
        await updateNote();
    }
});

// function noteComponentUpdated(noteDescription: IBlockFullProps[]) {
//     currentNote.value.description = noteDescription;
// }
</script>

<template>
    <div>
        <Head>
            <Title>{{ currentNote.title }} | Notes</Title>
        </Head>
        <div
            class="flex items-start justify-between gap-4 flex-wrap md:flex-nowrap"
        >
            <div class="flex flex-col gap-2">
                <div class="flex flex-col">
                    <div
                        v-if="!editingTitle"
                        @click="editingTitle = true"
                        class="flex items-center cursor-pointer"
                    >
                        <h1
                            class="text-4xl font-bold text-dark dark:text-light"
                        >
                            {{ currentNote.title }}
                        </h1>
                        <UIcon name="i-heroicons-pencil-solid" class="ml-2" />
                    </div>
                    <UInput
                        v-else
                        autofocus
                        v-model="currentNote.title"
                        class="text-4xl font-bold text-dark dark:text-light border rounded"
                        @blur="editingTitle = false"
                    />
                </div>
                <div class="flex flex-col">
                    <label class="text-3xl text-gray-500 dark:text-gray-400">
                        Description
                    </label>
                    <div
                        v-if="!editingDescription"
                        @click="editingDescription = true"
                        class="flex items-center cursor-pointer"
                    >
                        <span
                            class="text-2xl text-dark dark:text-light text-justify"
                        >
                            {{
                                currentNote.description
                                    ? currentNote.description
                                    : "No description"
                            }}
                        </span>
                        <UIcon name="i-heroicons-pencil-solid" class="ml-2" />
                    </div>
                    <UTextarea
                        v-else
                        autofocus
                        v-model="currentNote.description"
                        class="border rounded text-dark dark:text-light w-full"
                        @blur="editingDescription = false"
                    ></UTextarea>
                </div>
            </div>
            <div class="flex gap-2 flex-nowrap">
                <UButton
                    @click.prevent="updateNote"
                    size="md"
                    color="primary"
                    label="Save"
                    icon="i-heroicons-folder-arrow-down"
                    :loading="isSaving"
                />
                <UDropdown
                    :items="contextualItems"
                    :popper="{ placement: 'bottom-start' }"
                >
                    <UButton
                        size="md"
                        color="white"
                        trailing-icon="i-heroicons-ellipsis-vertical"
                    />
                </UDropdown>
            </div>
        </div>
    </div>
</template>
