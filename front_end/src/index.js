import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import PostReducer from "./store/reducers/PostReducers/post";
import ProfileReducer from "./store/reducers/ProfileReducers/profile";
import CommentReducer from "./store/reducers/CommentReducers/comment";
import { BrowserRouter as Router } from "react-router-dom";
const store = configureStore({
  reducer: {
    post: PostReducer,
    profile: ProfileReducer,
    comment: CommentReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
reportWebVitals();
