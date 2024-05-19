import {createSlice} from "@reduxjs/toolkit";

interface UserLogin {
    fullName: string | null,
    email: string | null,
    roleId: string | null,
    role: string | null
}

const initialData: UserLogin = {
    fullName: null,
    role: null,
    email: null,
    roleId: null
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState: initialData,
    reducers: {
        loginSuccess: (state, action) => {
            const { fullName, role, email, roleId } = action.payload;
            state.role = role;
            state.roleId = roleId;
            state.email = email;
            state.fullName = fullName;
        },
        loginFailed: (state) => {
            state.fullName = null;
            state.role = null;
            state.email = null;
            state.roleId = null
        },
        logoutSuccess: (state) => {
            state.fullName = null;
            state.role = null;
            state.email = null;
            state.roleId = null
        }
    },
})

export const { loginSuccess, logoutSuccess, loginFailed } = profileSlice.actions;
