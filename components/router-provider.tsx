"use client";

import { useRouter } from "nextjs-toploader/app";
import { RouterProvider as ReactAriaRouterProvider } from "react-aria-components";

type ClientProvidersProps = {
  children: React.ReactNode;
};

export function RouterProvider({ children }: ClientProvidersProps) {
  const router = useRouter();

  return (
    <ReactAriaRouterProvider navigate={router.push}>
      {children}
    </ReactAriaRouterProvider>
  );
}
