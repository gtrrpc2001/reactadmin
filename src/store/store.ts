import {configureStore} from '@reduxjs/toolkit';
import {eqSlice,listSlice,cellSlice,loginSlice, profileSlice, modalTimerSlice} from '../components/createslice/createslices';

export const store = configureStore({
    reducer:{
        check: loginSlice.reducer,
        eq: eqSlice.reducer,
        historylast:listSlice.reducer,
        cellValues:cellSlice.reducer,
        profile:profileSlice.reducer,
        modalTimer:modalTimerSlice.reducer
    }
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;