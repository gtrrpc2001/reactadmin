import { ReactNode, createContext, useContext, useState } from "react";

export interface SignUpContextProps extends func {
  email: string;
  pw1: string;
  pw2: string;
  firstName: string;
  lastName: string;
  sex: string;
  birth: string | null;
  weight: string;
  height: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPw1: React.Dispatch<React.SetStateAction<string>>;
  setPw2: React.Dispatch<React.SetStateAction<string>>;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  setSex: React.Dispatch<React.SetStateAction<string>>;
  setBirth: React.Dispatch<React.SetStateAction<string | null>>;
  setWeight: React.Dispatch<React.SetStateAction<string>>;
  setHeight: React.Dispatch<React.SetStateAction<string>>;
}

interface func {
  handlePageNumberUp: () => void;
  handlePageNumberDown: () => void;
}

const SignUpContext = createContext<SignUpContextProps>({
  email: "",
  pw1: "",
  pw2: "",
  firstName: "",
  lastName: "",
  sex: "",
  birth: null,
  weight: "",
  height: "",
  setEmail: () => {},
  setPw1: () => {},
  setPw2: () => {},
  setFirstName: () => {},
  setLastName: () => {},
  setSex: () => {},
  setBirth: () => {},
  setWeight: () => {},
  setHeight: () => {},
  handlePageNumberUp: () => {},
  handlePageNumberDown: () => {},
});

export const SignUpProvider: React.FC<{
  children: ReactNode;
  values: func;
}> = ({ children, values }) => {
  const [email, setEmail] = useState<string>("");
  const [pw1, setPw1] = useState<string>("");
  const [pw2, setPw2] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [birth, setBirth] = useState<string | null>(null);
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");

  return (
    <SignUpContext.Provider
      value={{
        email,
        pw1,
        pw2,
        firstName,
        lastName,
        sex,
        birth,
        weight,
        height,
        setEmail,
        setPw1,
        setPw2,
        setFirstName,
        setLastName,
        setSex,
        setBirth,
        setWeight,
        setHeight,
        ...values,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export const useSignUpContext = () => {
  const context = useContext(SignUpContext);
  if (context === undefined) {
    throw new Error("useSignUpContext must be used within a SignUpProvider");
  }
  return context;
};
