import {configureStore} from '@reduxjs/toolkit';
import {eqSlice,listSlice,cellSlice,loginSlice, profileSlice, modalTimerSlice, bpmGraphSlice, writetimeGraphSlice, barGraphSlice,nameSlice, ModalSlice, yesterdayArrSlice} from '../components/createslice/createslices';

export const store = configureStore({
    reducer:{
        check: loginSlice.reducer,
        eq: eqSlice.reducer,
        historylast:listSlice.reducer,
        cellValues:cellSlice.reducer,
        profile:profileSlice.reducer,
        modalTimer:modalTimerSlice.reducer,
        bpmGraphValue:bpmGraphSlice.reducer,
        barGraphValue:barGraphSlice.reducer,
        writetimeGraph: writetimeGraphSlice.reducer,
        names:nameSlice.reducer,
        modalData:ModalSlice.reducer,
        yesterdayArrCount:yesterdayArrSlice.reducer,
    }
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;