import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type UserContextType = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
};

const defaultValue = {
  name: "",
  setName: () => {},
};

const UserContext = createContext<UserContextType>(defaultValue);

type UserProviderProps = {
  children: React.ReactNode;
};

// Provider - for index.js
export const UserProvider = ({ children }: UserProviderProps) => {
  const [name, setName] = useState<string>("");

  return (
    <UserContext.Provider
      value={{
        name,
        setName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// useStore - for componenets
export const useUserStore = () => useContext(UserContext);
