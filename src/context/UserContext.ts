import { TokenResponse } from "expo-auth-session";
import { createContext, useContext } from "react";

export interface IUser {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string
  }

export interface IUserContext {
    loadToken: (token: TokenResponse) => void;
    user: IUser | undefined;
}

const UserContext = createContext<IUserContext>({
    loadToken: () => { },
    user: undefined
});



export const useUserContext = (): IUserContext => useContext(UserContext);

export default UserContext;