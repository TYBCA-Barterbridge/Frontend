import "./index.css";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import React from "react";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SocketProvider } from "./contexts/SocketContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SocketProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </SocketProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
