<!--
File Name: index.client.vue
Author: Alexandre Kévin De Freitas Martins
Creation Date: 2023
Description: This file is the oauth page

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
import type { INote } from "~/types/INote";

definePageMeta({
    layout: "app-navigation",
});

const i18n = useI18n();
const toast = useToast();

const notes = ref<INote[]>([]);

async function getNotes() {
    try {
        const res = await useApiRequest<INote[]>("/notes");
        if (!res._data) {
            toast.add({
                color: "red",
                icon: "i-heroicons-exclamation-circle",
                title: `Error`,
                description: `Notes not found`,
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
    const rawNotes: INote[] = (await getNotes()) ?? [];
    rawNotes.sort((a, b) => {
        return (
            new Date(b.created_at as Date).getTime() -
            new Date(a.updated_at as Date).getTime()
        );
    });
    notes.value = rawNotes;
});

async function deleteNotes() {
    try {
        const res = await useApiRequest<INote>(`/notes/`, {
            method: "DELETE",
        });
        toast.add({
            color: "green",
            icon: "i-heroicons-check-circle",
            title: `Success`,
            description: `Notes deleted`,
        });
    } catch (e: any) {
        toast.add({
            color: "red",
            icon: "i-heroicons-exclamation-circle",
            title: `Error ${e.response?.status}`,
            description: e.response?.statusText,
        });
    }
}

const { isMobile } = useDevice();
</script>

<template>
    <div class="flex flex-col gap-x-6 gap-y-10 justify-center max">
        <Head>
            <Title> {{ i18n.t("app.notes.title") }} </Title>
        </Head>
        <div
            class="flex justify-center items-center md:justify-between gap-4 flex-wrap md:flex-nowrap"
        >
            <div>
                <h1
                    v-if="!isMobile"
                    class="text-4xl font-bold text-dark dark:text-light"
                >
                    {{ i18n.t("app.notes.title") }}
                </h1>
                <span class="text-dark dark:text-light">
                    {{ i18n.t("app.notes.description") }}
                </span>
            </div>
            <UButton
                icon="i-heroicons-trash"
                @click="deleteNotes"
                color="primary"
                variant="solid"
                :label="i18n.t('app.notes.boutons.delete')"
            />
        </div>
        <div class="w-full mt-4">
            <div v-if="notes.length === 0">
                <AppNoteEmptyList />
            </div>
            <div v-else>
                <div class="flex flex-col gap-4">
                    <AppNoteCard
                        v-for="note in notes"
                        :key="note.id"
                        :note="note"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
