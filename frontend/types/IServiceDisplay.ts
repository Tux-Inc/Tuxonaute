/*
File Name: IServiceDisplay.ts
Author:  Alexandre Kévin De Freitas Martins
Creation Date: 2023
Description: Interface for the service display component

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
*/

import type { IActionDisplay } from "~/types/IActionDisplay";
import type { IReactionDisplay } from "~/types/IReactionDisplay";

/* The `export interface IServiceDisplay` is defining an interface in TypeScript.
An interface is a way to define the structure of an object. In this case, the
`IServiceDisplay` interface has the following properties: */
export interface IServiceDisplay {
    image: string;
    name: string;
    title: string;
    description: string;
    isConnected: boolean;
    actions: IActionDisplay[];
    reactions: IReactionDisplay[];
}
