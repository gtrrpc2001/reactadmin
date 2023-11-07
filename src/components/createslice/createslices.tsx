import {PayloadAction, createSlice} from '@reduxjs/toolkit';


export const cellSlice = createSlice({
    name:'cell',
    initialState:[],
    reducers:{  
        cellValues: (state,action: PayloadAction<any>) => state = action.payload,
      
    },
});
export const cellActions = cellSlice.actions;

export const modalTimerSlice = createSlice({
    name:'modalTimer',
    initialState:false,
    reducers:{  
        modalTimerValues: (state,action: PayloadAction<boolean>) => state = action.payload,
      
    },
});
export const modalTimerActions = modalTimerSlice.actions;

export const loginSlice = createSlice({
    name:'login',
    initialState:false,
    reducers:{  
        loginCheck: (state,action: PayloadAction<boolean>) => state = action.payload,
      
    },
});

export const loginActions = loginSlice.actions;

export const eqSlice = createSlice({
    name:'eq',
    initialState:'',
    reducers:{
        eq :(state:string,action: PayloadAction<string>) => state = action.payload,
    }

});
export const eqActions = eqSlice.actions;

export const listSlice = createSlice({
    name:'history_last',
    initialState:[],
    reducers:{
        listHistory:(state:any,action: PayloadAction<any>) => state = action.payload,
    }

});
export const listActions = listSlice.actions;

export const profileSlice = createSlice({
    name:'getProfile',
    initialState:[],
    reducers:{
        profile:(state:any,action: PayloadAction<any>) => state = action.payload,
    }

});
export const profileActions = profileSlice.actions;

export const bpmGraphSlice = createSlice({
    name:'bpmGraph',
    initialState:[],
    reducers:{
        value:(state:any,action: PayloadAction<any>) => state = action.payload,
    }

});
export const bpmGraphActions = bpmGraphSlice.actions;

export const writetimeGraphSlice = createSlice({
    name:'writetime',
    initialState:'',
    reducers:{
        value:(state:any,action: PayloadAction<any>) => state = action.payload,
    }

});
export const writetimeGraphActions = writetimeGraphSlice.actions;