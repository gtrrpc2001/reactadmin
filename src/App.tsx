import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import LoginPage from "./page/login/login";
import Home from "./page/home/home";
import { Graph } from "./page/graph/graph";
import { PersistGate } from "redux-persist/integration/react";
import { Ward } from "./page/ward/Ward";
import { UserSignUp } from "./page/signup/user/usersignup";
import { FindAccount } from "./page/findaccount/findAccount";
import { HeaderFooter } from "./page/Header_Footer/HeaderFooter";
import { MainFrame } from "./components/component/login/main_frame";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route element={<MainFrame />}>
              <Route path="/" element={<LoginPage />} />,
              <Route path="/signup/user" element={<UserSignUp />} />,
              <Route path="/findpw/user" element={<FindAccount />} />,
            </Route>
            <Route element={<HeaderFooter />}>
              <Route path="/home" element={<Home />} />,
              <Route path="/home/graph" element={<Graph />} />,
              <Route path="/home/ward" element={<Ward />} />,
            </Route>
            <Route path="*" element={<Navigate to={"/"} replace={true} />} />,
          </Routes>
        </PersistGate>
      </Provider>
      {import.meta.env.VITE_API_NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};

export default App;
