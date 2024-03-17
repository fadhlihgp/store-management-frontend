import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {usersDummyData} from "../../utils/dummyData";

interface User {
    id: string,
    email: string,
    fullName: string,
    userName: string,
    noTelephone?: string,
    password?: string,
    address?: string,
    role: string,
    lastLogin?: Date,
    isActive:boolean
}

interface UserState {
    isLoading: boolean
    users: User[]
}

const initialData: UserState = {
    users: usersDummyData,
    isLoading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialData,
    reducers:{
        addNewUser: (state, action:PayloadAction<User>) => {
            state.users.push(action.payload)
        },

        deleteUser: (state, action:PayloadAction<string>) => {
            state.users.filter(user => user.id !== action.payload)
        }
    }
})

export const getUsers = () => {
    return usersDummyData;
}

// export const getUsers = () => async (dispatch: any) => {
//     dispatch(startLoading());
//     try {
//         const response = await axios.get("/api/users");
//         dispatch(setUsers(response.data));
//     } catch (error) {
//         // Handle error
//     } finally {
//         dispatch(endLoading());
//     }
// };
//
// export const createUser = (userData: User) => async (dispatch: any) => {
//     try {
//         const response = await axios.post("/api/users", userData);
//         dispatch(addUser(response.data));
//     } catch (error) {
//         // Handle error
//     }
// };
//
// export const updateUserById = (userId: string, updatedUserData: User) => async (dispatch: any) => {
//     try {
//         const response = await axios.put(`/api/users/${userId}`, updatedUserData);
//         dispatch(updateUser(response.data));
//     } catch (error) {
//         // Handle error
//     }
// };
//
// export const deleteUserById = (userId: string) => async (dispatch: any) => {
//     try {
//         await axios.delete(`/api/users/${userId}`);
//         dispatch(removeUser(userId));
//     } catch (error) {
//         // Handle error
//     }
// };

export const { addNewUser, deleteUser } = userSlice.actions
export default userSlice.reducer;
