import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App"; // ✅ Ensure correct import path

createRoot(document.getElementById("root")).render(
  <Provider store={store}>  {/* ✅ Redux should wrap everything */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
   
);
