import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {cekToken} from "../apps/cekToken";
import {PublicRoute} from "./PublicRoute";
import {PrivateRoute} from "./PrivateRoute";
import {Dashboard} from "../pages/protected/Dashboard";
import {Login} from "../pages/Login";
import {Register} from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import NotFound from "../pages/protected/NotFound";
import {Testing} from "../pages/protected/Testing";
import {UserManagement} from "../pages/protected/UserManagement";
import {UserManagementForm} from "../pages/protected/UserManagementForm";

export const RouterApp = () => {
    const isToken = cekToken();

    return(
        <BrowserRouter>
            <React.Fragment>
                <Routes>

                    <Route
                        path="/"
                        element={<Navigate to={isToken ? "/dashboard" : "/login"} replace={true} />}
                    />

                    {/*AUTH*/}
                    <Route
                        path="/dashboard"
                        element={<PrivateRoute>
                            <Dashboard/>
                        </PrivateRoute>}
                    />

                    <Route
                        path="/testing"
                        element={<PrivateRoute>
                            <Testing/>
                        </PrivateRoute>}
                    />

                    <Route
                        path={"/user-management"}
                        element={<PrivateRoute><UserManagement /></PrivateRoute>}
                    />

                    <Route
                        path={"/user-management/add"}
                        element={<PrivateRoute><UserManagementForm /></PrivateRoute>}
                    />

                    <Route
                        path={"/user-management/edit/:id"}
                        element={<PrivateRoute><UserManagementForm /></PrivateRoute>}
                    />
                    {/* CLIENT */}
                    <Route
                        path="/login"
                        element={<PublicRoute>
                            <Login />
                        </PublicRoute>}
                    />

                    <Route
                        path="/register"
                        element={<PublicRoute>
                            <Register />
                        </PublicRoute>}
                    />

                    <Route path={"/forgot-password"}
                           element={<PublicRoute><ForgotPassword /></PublicRoute>}
                    />

                    <Route path={"/*"}
                           element={<NotFound />}
                    />
                </Routes>
            </React.Fragment>
        </BrowserRouter>
    )
}
