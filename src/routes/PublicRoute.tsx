import {ReactNode} from "react";
import {cekToken} from "../apps/cekToken";
import {Dashboard} from "../pages/protected/Dashboard";

interface PublicRouteProps {
    children: ReactNode
}
export const PublicRoute = ({children}: PublicRouteProps) => {
    if (!cekToken()) {
        return children;
    } else {
        return <Dashboard />
    }
    return children;
}
