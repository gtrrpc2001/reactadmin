import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {eqSlice,listSlice,cellSlice,loginSlice, profileSlice, modalTimerSlice, bpmGraphSlice, writetimeGraphSlice, barGraphSlice, nameSlice, ModalSlice, yesterdayArrSlice} from '../components/createslice/createslices';
import { persistStore } from 'redux-persist';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
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
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['eq','check','names'] // 지속하고 싶은 상태의 key 목록
    // blacklist: [] // 지속하지 않을 상태의 key 목록도 설정
};

const getPersistReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer:getPersistReducer,
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;

export const persistor = persistStore(store);