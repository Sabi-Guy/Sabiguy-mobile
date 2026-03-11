declare module "expo-router" {
  import type { ComponentType, ReactNode } from "react";

  export interface Router {
    back(): void;
    canGoBack(): boolean;
    push(href: string): void;
    replace(href: string): void;
  }

  export function useRouter(): Router;

  type Navigator = ComponentType<any> & {
    Screen: ComponentType<any>;
  };

  export const Slot: ComponentType<{ children?: ReactNode }>;
  export const Stack: Navigator;
  export const Tabs: Navigator;
  export const Link: ComponentType<any>;
  export const Redirect: ComponentType<{ href: string }>;
}

declare module "expo-router/stack" {
  import type { ComponentType } from "react";

  const Stack: ComponentType<any>;
  export default Stack;
}
