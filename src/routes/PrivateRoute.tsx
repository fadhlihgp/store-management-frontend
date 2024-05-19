import {cekToken} from "../apps/cekToken";
import LoginContainer from "../features/User/LoginContainer";
import {ReactNode} from "react";

interface PrivateRouteProps {
    children: ReactNode
}

export const PrivateRoute = ({children}: PrivateRouteProps) => {
    const isToken = cekToken();
    if (isToken) {
        return children;
    } else {
        return <LoginContainer />
    }
    return children;
}
