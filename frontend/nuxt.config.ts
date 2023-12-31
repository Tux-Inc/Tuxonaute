/*
File Name: nuxt.config.ts
Author: Alexandre Kévin De Freitas Martins
Creation Date: 2023
Description: This is the nuxt configuration file : https://nuxt.com/docs/api/configuration/nuxt-config

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
*/

export default defineNuxtConfig({
    ssr: true,
    devtools: { enabled: true },
    modules: ["@nuxt/ui", "@nuxt/image", "@nuxtjs/device"],
    devServer: {
        port: 8080,
    },
    runtimeConfig: {
        public: {
            API_BASE_URL: process.env.API_BASE_URL || "http://localhost:3000",
        },
    },
    ui: {
        icons: ["heroicons", "mdi"],
    },
    css: ["~/assets/css/main.css"],
});
