import {
  ReactNode,
  SyntheticEvent,
  createContext,
  useContext,
  useState,
} from "react";

interface UserLoginProps {
  userType: "일반" | "보호자" | "기업";
  handlePage: (event: SyntheticEvent<Element, Event>, value: any) => void;
  handleUserType: (type: "일반" | "보호자" | "기업") => void;
  page: number;
  setExitParams: React.Dispatch<
    React.SetStateAction<{
      opacity: number;
      x: number;
    }>
  >;
}
export interface UserLoginProvierProps extends UserLoginProps {
  email: string;
  pw: string;
  handleEmail: React.ChangeEventHandler<HTMLInputElement>;
  handlePw: React.ChangeEventHandler<HTMLInputElement>;
}

const LoginContext = createContext<UserLoginProvierProps>({
  email: "",
  pw: "",
  userType: "일반",
  handlePage: () => {},
  handleUserType: () => {},
  handleEmail: () => {},
  handlePw: () => {},
  page: 1,
  setExitParams: () => {},
});

export const LoginProvider: React.FC<{
  children: ReactNode;
  values: UserLoginProps;
}> = ({ children, values }) => {
  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");

  const handleEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const handlePw: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPw(e.target.value);
  };

  return (
    <LoginContext.Provider
      value={{
        email,
        pw,
        handleEmail,
        handlePw,
        ...values,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error("useSignUpContext must be used within a LoginProvider");
  }
  return context;
};
