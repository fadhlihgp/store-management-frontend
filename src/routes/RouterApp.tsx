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
import {StoreManagement} from "../pages/protected/StoreManagement.tsx";
import {StoreManagementForm} from "../pages/protected/StoreManagementForm.tsx";
import {StoreManagementDetail} from "../pages/protected/StoreManagementDetail.tsx";
import {Customer} from "../pages/protected/Customer.tsx";
import {CustomerForm} from "../pages/protected/CustomerForm.tsx";
import {CustomerDetail} from "../pages/protected/CustomerDetail.tsx";
import {ProductList} from "../pages/protected/ProductList.tsx";
import {ProductDetail} from "../pages/protected/ProductDetail.tsx";
import {ProductForm} from "../pages/protected/ProductForm.tsx";
import {DebtList} from "../pages/protected/DebtList.tsx";
import {DebtDetail} from "../pages/protected/DebtDetail.tsx";
import {IncomeExpense} from "../pages/protected/IncomeExpense";
import {Note} from "../pages/protected/Note";
import {TransactionPurchase} from "../pages/protected/TransactionPurchase";
import {Profile} from "../pages/protected/Profile";
import {ChangePassword} from "../pages/protected/ChangePassword";
import { TransactionHistory } from "../pages/protected/TransactionHistory.tsx";
import { DebtForm } from "../pages/protected/DebtForm.tsx";
import { ResetPassword } from "../pages/ResetPassword.tsx";
import { PurchaseDetail } from "../pages/protected/PurchaseDetail.tsx";
import PrintComponent from "../pages/testing/PrintComponent.tsx";
import { Supplier } from "../pages/protected/Supplier.tsx";
import { SupplierForm } from "../pages/protected/SupplierForm.tsx";
import { MasterParameterList } from "../pages/protected/MasterParameter.tsx";
import { MasterParameterForm } from "../pages/protected/MasterParameterForm.tsx";
import { StockInList } from "../pages/protected/StockInList.tsx";
import { StockInForm } from "../pages/protected/StockInForm.tsx";
import { StockOutList } from "../pages/protected/StockOutList.tsx";
import { StockOutForm } from "../pages/protected/StockOutForm.tsx";
import { StockInDetail } from "../pages/protected/StockInDetail.tsx";
import { StockOutDetail } from "../pages/protected/StockOutDetail.tsx";
import { StoreProfile } from "../pages/protected/StoreProfile.tsx";

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

                    <Route
                        path={"/store-management"}
                        element={<PrivateRoute><StoreManagement /></PrivateRoute>}
                    />

                    <Route
                        path={"/store-management/detail/:id"}
                        element={<PrivateRoute><StoreManagementDetail /></PrivateRoute>}
                    />

                    <Route
                        path={"/store-management/add"}
                        element={<PrivateRoute><StoreManagementForm /></PrivateRoute>}
                    />

                    <Route
                        path={"/store-management/edit/:id"}
                        element={<PrivateRoute><StoreManagementForm /></PrivateRoute>}
                    />

                    <Route
                        path="/supplier"
                        element={<PrivateRoute><Supplier /></PrivateRoute>}
                    />

                    <Route 
                        path="/supplier/add"
                        element={<PrivateRoute><SupplierForm /></PrivateRoute>}
                    />

                    <Route 
                        path="/supplier/edit/:id"
                        element={<PrivateRoute><SupplierForm /></PrivateRoute>}
                    />
                    
                    <Route
                        path={"/customer"}
                        element={<PrivateRoute><Customer /></PrivateRoute>}
                    />

                    <Route
                        path={"/customer/add"}
                        element={<PrivateRoute><CustomerForm /></PrivateRoute>}
                    />

                    <Route
                        path={"/customer/edit/:id"}
                        element={<PrivateRoute><CustomerForm /></PrivateRoute>}
                    />

                    <Route
                        path={"/customer/detail/:id"}
                        element={<PrivateRoute><CustomerDetail /></PrivateRoute>}
                    />

                    {/* PRODUCT */}

                    <Route
                        path={"/product"}
                        element={<PrivateRoute><ProductList /></PrivateRoute>}
                    />

                    <Route
                        path={"/product/add"}
                        element={<PrivateRoute><ProductForm /></PrivateRoute>}
                    />

                    <Route
                        path={"/product/edit/:id"}
                        element={<PrivateRoute><ProductForm /></PrivateRoute>}
                    />

                    <Route
                        path={"/product/detail/:id"}
                        element={<PrivateRoute><ProductDetail /></PrivateRoute>}
                    />

                    <Route
                        path="/product/stock-in"
                        element={<PrivateRoute><StockInList /></PrivateRoute>}
                    />

                    <Route 
                        path="/product/stock-in/add"
                        element={<PrivateRoute><StockInForm /></PrivateRoute>}
                    />

                    <Route
                        path="/product/stock-in/edit/:id"
                        element={<PrivateRoute><StockInForm /></PrivateRoute>}
                    />

                    <Route
                        path="/product/stock-in/detail/:id"
                        element={<PrivateRoute><StockInDetail /></PrivateRoute>}
                    />

                    <Route
                        path="/product/stock-out"
                        element={<PrivateRoute><StockOutList /></PrivateRoute>}
                    />

                    <Route 
                        path="/product/stock-out/add"
                        element={<PrivateRoute><StockOutForm /></PrivateRoute>}
                    />

                    <Route 
                        path="/product/stock-out/edit/:id"
                        element={<PrivateRoute><StockOutForm /></PrivateRoute>}
                    />

                    <Route
                        path="/product/stock-out/detail/:id"
                        element={<PrivateRoute><StockOutDetail /></PrivateRoute>}
                    />


                    {/* PROFILE */}
                    <Route
                        path={"/profile"}
                        element={<PrivateRoute><Profile /></PrivateRoute>}
                    />

                    <Route
                        path="/store-profile"
                        element={<PrivateRoute><StoreProfile /></PrivateRoute>}
                    />

                    <Route
                        path={"/change-password"}
                        element={<PrivateRoute><ChangePassword /></PrivateRoute>}
                    />

                    {/* DEBT */}
                    <Route
                        path={"/note-debt"}
                        element={<PrivateRoute><DebtList /></PrivateRoute>}
                    />
                    <Route 
                        path="/note-debt/add"
                        element={<PrivateRoute><DebtForm /></PrivateRoute>}
                    />    

                    <Route
                        path={"/note-debt/detail/:id"}
                        element={<PrivateRoute><DebtDetail /></PrivateRoute>}
                    />

                    {/*Income Expense*/}
                    <Route
                        path="/note-incomeExpense"
                        element={<PrivateRoute><IncomeExpense /></PrivateRoute>}
                    />

                    {/*Note*/}
                    <Route
                        path="/note-other"
                        element={<PrivateRoute><Note /></PrivateRoute>}
                    />

                    {/*Transaction Purchase*/}
                    <Route
                        path="/transaction-purchase"
                        element={<PrivateRoute><TransactionPurchase /></PrivateRoute>}
                    />
                    <Route
                        path="/transaction-history"
                        element={<PrivateRoute><TransactionHistory /></PrivateRoute>} 
                    />

                    <Route
                        path="/transaction-detail/:id"
                        element={<PrivateRoute><PurchaseDetail /></PrivateRoute>}
                    />

                    {/* SuperAdmin */}
                    <Route
                        path="/master-parameter"
                        element={<PrivateRoute><MasterParameterList /></PrivateRoute>}
                    />
                    <Route 
                        path="/master-parameter/add"
                        element={<PrivateRoute><MasterParameterForm /></PrivateRoute>}
                    />
                    <Route
                        path="/master-parameter/edit/:id"
                        element={<PrivateRoute><MasterParameterForm /></PrivateRoute>}
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

                    <Route path="/reset-password/:token"
                        element={<PublicRoute><ResetPassword /></PublicRoute>}
                    />
                    
                    <Route path={"/*"}
                           element={<NotFound />}
                    />

                    <Route path="/test-print"
                        element={<PrintComponent />} 
                    />
                </Routes>
            </React.Fragment>
        </BrowserRouter>
    )
}
