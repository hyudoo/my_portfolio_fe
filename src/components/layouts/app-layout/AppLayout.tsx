"use client";

import { ReactNode, useEffect } from "react";
import { NotifyProvider } from "./notify-provider/NotifyProvider";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { polyfillTailwindGap } from "../../../utils/polyfill.util";
import { ModalProvider } from "./modal-provider/ModalProvider";

export function AppLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    polyfillTailwindGap();
  }, []);

  return (
    <Provider store={store}>
      <ModalProvider>
        <NotifyProvider>{children}</NotifyProvider>
      </ModalProvider>
    </Provider>
  );
}
