"use client";
import SocketProvider from "@/context/SocketContextApi";
import { persistor, store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SocketProvider>{children}</SocketProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
