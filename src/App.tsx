import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import LoginPage from "./page/login/login";
import Home from "./page/home/home";
import { Graph } from "./page/graph/graph";
import { PersistGate } from "redux-persist/integration/react";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/" element={<LoginPage />} />,
          <Route path="/home" element={<Home />} />,
          <Route path="/home/graph" element={<Graph />} />,
          <Route path="*" element={<Navigate to={"/"} replace={true} />} />,
        </Routes>
      </PersistGate>
    </Provider>
  );
};

export default App;
