import React from "react";
import ReactDOM from "react-dom";
import { ToastProvider } from "react-toast-notifications";
import "./styles/index.css";
import { App } from "./components";
import { AuthProvider, PostsProvider } from "./providers";
import {db} from './utills/firebase'
ReactDOM.render(
  <React.StrictMode>
    <ToastProvider
      autoDismiss={true}
      autoDismissTimeout={5000}
      placement="top-right"
    >
      <AuthProvider>
        <PostsProvider>
          <App />
        </PostsProvider>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
