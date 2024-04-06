import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { Toaster } from "sonner";
import App from "./App.tsx";
import { ThemeProvider } from "./components/providers/theme-provider.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <App />
          <Toaster visibleToasts={1} position="top-right" richColors />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
