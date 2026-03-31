declare module "expo-router" {
  import type * as React from "react";

  export const Slot: React.ComponentType<any>;
  type StackComponent = React.ComponentType<any> & {
    Screen: React.ComponentType<any>;
  };
  type TabsComponent = React.ComponentType<any> & {
    Screen: React.ComponentType<any>;
  };

  export const Stack: StackComponent;
  export const Tabs: TabsComponent;
  export const Link: React.ComponentType<any>;
  export const Redirect: React.ComponentType<any>;

  export function useRouter(): {
    push: (href: any) => void;
    replace: (href: any) => void;
    back: () => void;
  };

  export function useLocalSearchParams<
    T extends Record<string, string | string[] | undefined> = Record<
      string,
      string | string[] | undefined
    >
  >(): T;
}

declare module "expo-router/stack" {
  import type * as React from "react";
  const Stack: React.ComponentType<any> & {
    Screen: React.ComponentType<any>;
  };
  export default Stack;
}
