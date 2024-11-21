import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import LoginPage from "./page/login/login";
import Home from "./page/home/home";
import { Graph } from "./page/graph/graph";
import { PersistGate } from "redux-persist/integration/react";
import { Ward } from "./page/ward/Ward";
import { UserSignUp } from "./page/signup/user/usersignup";
import { FindAccount } from "./page/findaccount/findAccount";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/" element={<LoginPage />} />,
          <Route path="/home" element={<Home />} />,
          <Route path="/home/graph" element={<Graph />} />,
          <Route path="/home/ward" element={<Ward />} />,
          <Route path="/signup/user" element={<UserSignUp />} />,
          <Route path="/findpw/user" element={<FindAccount />} />,
          <Route path="*" element={<Navigate to={"/"} replace={true} />} />,
        </Routes>
      </PersistGate>
    </Provider>
  );
};

export default App;
