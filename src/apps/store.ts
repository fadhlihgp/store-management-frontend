import { configureStore, combineReducers } from '@reduxjs/toolkit';
import headerSlice from '../features/common/headerSlice';
import modalSlice from '../features/common/modalSlice';
import rightDrawerSlice from '../features/common/rightDrawerSlice';
// import leadsSlice from '../features/leads/leadSlice';

const rootReducer = combineReducers({
    header: headerSlice,
    rightDrawer: rightDrawerSlice,
    modal: modalSlice
    // lead: leadsSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer
});

