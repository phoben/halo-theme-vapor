/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />

import type { Alpine } from "alpinejs";

export {};

declare global {
  interface Window {
    Alpine: Alpine;
    [key: string]: any;
  }
}
