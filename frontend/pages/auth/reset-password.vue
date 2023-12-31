<!--
File Name: reset-password.vue
Author: Alexandre Kévin De Freitas Martins
Creation Date: 2023
Description: This file is the reset password page

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
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import type { FormError, FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";

definePageMeta({
    layout: "default",
});

const i18n = useI18n();
const router = useRouter();
const toast = useToast();
const runtimeConfig = useRuntimeConfig();
const resetToken = useRoute().query.token;

if (!resetToken) {
    toast.add({
        color: "red",
        icon: "i-heroicons-exclamation-triangle",
        title: `Error`,
        description: "No reset token provided",
    });
    router.push("/auth/sign-in");
}

const state = ref({
    password1: "",
    password2: "",
});

const isLoading = ref(false);

const validate = (state: any): FormError[] => {
    const errors = [];
    if (!state.password1)
        errors.push({ path: "password", message: "Required" });
    if (!state.password2)
        errors.push({ path: "password2", message: "Required" });
    if (state.password1 != state.password2)
        errors.push({ path: "password2", message: "Should be same Password" });
    return errors;
};

async function submit(event: FormSubmitEvent<any>) {
    const { data, pending, error } = await useAsyncData<any, any>("user", () =>
        $fetch(`${runtimeConfig.public.API_BASE_URL}/auth/reset-password`, {
            method: "POST",
            body: JSON.stringify({
                password1: event.data.password1,
                password2: event.data.password2,
                resetToken: resetToken,
            }),
        }),
    );
    if (error.value) {
        toast.add({
            color: "red",
            icon: "i-heroicons-exclamation-triangle",
            title: `Error ${error.value.statusCode}`,
            description: error.value.message,
        });
    } else {
        toast.add({
            color: "green",
            icon: "i-heroicons-check",
            title: "Success",
            description: "Password successfully changed, you can now login",
        });
        await router.push("/auth/sign-in");
    }
}

const isVisible = ref({
    password1: false,
    password2: false,
});

const setVisiblePassword = () =>
    (isVisible.value.password1 = !isVisible.value.password1);

const setVisibleCheckPassworad = () =>
    (isVisible.value.password2 = !isVisible.value.password2);
</script>

<template>
    <div
        class="h-screen w-full flex flex-col gap-4 items-center justify-center"
    >
        <NuxtLink to="/">
            <svg
                class="h-16 fill-primary dark:fill-base-light"
                viewBox="0 0 2262 782"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M198.863 302.876C164.945 208.09 49.406 202.205 0 208.09C11.8797 194.451 47.4614 175.075 82.2401 142.113C111.209 114.658 137.202 75.4932 170.985 43.61C222.095 0.86487 272.275 -2.19441 308.981 0.864822C370.313 5.97645 469.279 31.9951 469.279 147.224C464.633 302.876 377.747 351.727 353.586 426.468C329.425 501.209 353.586 554.307 353.586 554.307C353.586 554.307 357.767 473.991 422.816 450.229C487.865 426.468 541.298 366.131 541.298 366.131C564.065 506.915 436.526 516.607 400.514 652.28C380.535 727.55 431.18 781.554 422.816 778.195C198.863 688.258 243.932 466.891 252.76 426.468C267.981 356.773 389.363 88.115 222.095 90.0737C164.599 90.7469 131.956 113.77 136.602 152.334C141.248 190.899 185.573 211.66 198.863 242.473C214.695 279.179 198.863 302.876 198.863 302.876Z"
                />
                <path
                    d="M186.319 127.71V148.618H161.229C161.229 148.618 161.228 186.718 190.036 186.718C210.944 186.718 221.631 177.954 221.631 156.581C221.631 137.996 210.014 127.71 186.319 127.71Z"
                />
                <path
                    d="M750.6 621V208.2H832.8V621H750.6ZM616.2 271.8V199.2H967.2V271.8H616.2ZM1080.15 627C1054.55 627 1031.75 621.6 1011.75 610.8C992.15 600 976.75 585 965.55 565.8C954.35 546.6 948.75 524.4 948.75 499.2V331.2H1027.95V497.4C1027.95 509.4 1029.95 519.8 1033.95 528.6C1037.95 537 1043.95 543.4 1051.95 547.8C1059.95 552.2 1069.35 554.4 1080.15 554.4C1096.55 554.4 1109.35 549.4 1118.55 539.4C1127.75 529.4 1132.35 515.4 1132.35 497.4V331.2H1210.95V499.2C1210.95 524.8 1205.35 547.2 1194.15 566.4C1183.35 585.6 1167.95 600.6 1147.95 611.4C1128.35 621.8 1105.75 627 1080.15 627ZM1454.74 621L1378.54 503.4L1362.34 491.4L1249.54 331.2H1342.54L1412.74 437.4L1427.74 448.8L1547.14 621H1454.74ZM1243.54 621L1361.74 455.4L1406.74 508.8L1332.34 621H1243.54ZM1430.74 490.8L1384.54 438L1453.54 331.2H1541.74L1430.74 490.8ZM1587.6 621V331.2H1666.8V621H1587.6ZM1627.2 284.4C1614.4 284.4 1603.8 280.2 1595.4 271.8C1587 263 1582.8 252.2 1582.8 239.4C1582.8 227 1587 216.4 1595.4 207.6C1603.8 198.8 1614.4 194.4 1627.2 194.4C1640.4 194.4 1651 198.8 1659 207.6C1667.4 216.4 1671.6 227 1671.6 239.4C1671.6 252.2 1667.4 263 1659 271.8C1651 280.2 1640.4 284.4 1627.2 284.4ZM1774.83 621V300C1774.83 276.8 1779.83 256.4 1789.83 238.8C1799.83 220.8 1814.03 206.6 1832.43 196.2C1850.83 185.8 1872.43 180.6 1897.23 180.6C1916.03 180.6 1932.23 183.8 1945.83 190.2C1959.43 196.6 1971.63 205.4 1982.43 216.6L1932.63 267C1928.23 262.6 1923.43 259.2 1918.23 256.8C1913.03 254.4 1906.43 253.2 1898.43 253.2C1884.03 253.2 1872.83 257.2 1864.83 265.2C1857.23 272.8 1853.43 283.8 1853.43 298.2V621H1774.83ZM1707.63 400.2V331.2H1939.23V400.2H1707.63ZM2071.97 623.4L1950.77 331.2H2035.97L2116.37 554.4H2087.57L2170.97 331.2H2256.77L2127.77 622.8L2071.97 623.4ZM1991.57 742.2L2079.77 555.6L2127.77 622.8L2074.97 742.2H1991.57Z"
                />
            </svg>
        </NuxtLink>
        <UCard class="w-full sm:w-1/2 md:w-1/3">
            <UForm
                :validate="validate"
                class="flex flex-col gap-4"
                :state="state"
                @submit="submit"
            >
                <UFormGroup
                    :label="i18n.t('auth.password.new')"
                    name="password1"
                    v-slot="{ error }"
                    required
                >
                    <div>
                        <UInput
                            v-model="state.password1"
                            :trailing-icon="
                                error &&
                                'i-heroicons-exclamation-triangle-20-solid'
                            "
                            :type="`${
                                isVisible.password1 ? 'text' : 'password'
                            }`"
                            :ui="{ icon: { trailing: { pointer: '' } } }"
                            :placeholder="i18n.t('auth.password.new')"
                            required
                        >
                            <template #trailing>
                                <UButton
                                    v-show="true"
                                    :padded="false"
                                    icon="i-heroicons-eye-slash"
                                    variant="link"
                                    @click="setVisiblePassword"
                                />
                            </template>
                        </UInput>
                    </div>
                </UFormGroup>
                <UFormGroup
                    v-slot="{ error }"
                    :label="i18n.t('auth.form.confirmNewPassword')"
                    name="password2"
                    required
                >
                    <div>
                        <UInput
                            v-model="state.password2"
                            :trailing-icon="
                                error &&
                                'i-heroicons-exclamation-triangle-20-solid'
                            "
                            :type="`${
                                isVisible.password2 ? 'text' : 'password'
                            }`"
                            :ui="{ icon: { trailing: { pointer: '' } } }"
                            :placeholder="
                                i18n.t('auth.form.confirmNewPassword')
                            "
                            required
                        >
                            <template #trailing>
                                <UButton
                                    v-show="true"
                                    :padded="false"
                                    icon="i-heroicons-eye-slash"
                                    variant="link"
                                    @click="setVisibleCheckPassworad"
                                />
                            </template>
                        </UInput>
                    </div>
                </UFormGroup>
                <div class="flex flex-col gap-2">
                    <UButton
                        :label="i18n.t('auth.button.resetPassword')"
                        :loading="isLoading"
                        block
                        icon="i-heroicons-check"
                        size="lg"
                        type="submit"
                    />
                    <UButton
                        :label="i18n.t('auth.button.back')"
                        block
                        color="primary"
                        icon="i-heroicons-arrow-left"
                        size="lg"
                        to="/auth/sign-in"
                        variant="ghost"
                    />
                </div>
            </UForm>
        </UCard>
    </div>
</template>
