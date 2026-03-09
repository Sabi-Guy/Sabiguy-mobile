declare module "expo-router" {
  import type { ComponentType, ReactNode } from "react";

  export interface Router {
    back(): void;
    canGoBack(): boolean;
    push(href: string): void;
    replace(href: string): void;
  }

  export function useRouter(): Router;

  export const Slot: ComponentType<{ children?: ReactNode }>;
  export const Stack: ComponentType<any>;
  export const Tabs: ComponentType<any>;
}

declare module "expo-router/stack" {
  import type { ComponentType } from "react";

  const Stack: ComponentType<any>;
  export default Stack;
}
