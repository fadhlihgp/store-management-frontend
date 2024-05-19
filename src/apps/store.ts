import { configureStore } from '@reduxjs/toolkit';
import headerSlice from '../features/common/headerSlice';
import modalSlice from '../features/common/modalSlice';
import rightDrawerSlice from '../features/common/rightDrawerSlice';
import {api} from "./services/api";
import {profileSlice} from "./slice/profileSlice";
// import leadsSlice from '../features/leads/leadSlice';

// const rootReducer = combineReducers({
//     header: headerSlice,
//     rightDrawer: rightDrawerSlice,
//     modal: modalSlice,
//     [api.reducerPath]: api.reducer
//     // lead: leadsSlice.reducer
// });

export const store = configureStore({
    reducer: {
        header: headerSlice,
        rightDrawer: rightDrawerSlice,
        modal: modalSlice,
        [api.reducerPath]: api.reducer,
        [profileSlice.reducerPath]: profileSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
});

export type AppDispatch = typeof store.dispatch;
