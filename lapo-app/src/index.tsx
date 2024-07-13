import { createRoot } from "react-dom/client";
import { Root } from "./Root";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { GlobalProvider } from "./context/GlobalContext";

createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <GlobalProvider>
      <Root />
    </GlobalProvider>
  </Provider>
);
