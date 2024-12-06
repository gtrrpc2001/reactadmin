import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const cellSlice = createSlice({
  name: "cell",
  initialState: [],
  reducers: {
    cellValues: (state, action: PayloadAction<any>) => (state = action.payload),
  },
});
export const cellActions = cellSlice.actions;

export const modalTimerSlice = createSlice({
  name: "modalTimer",
  initialState: false,
  reducers: {
    modalTimerValues: (state, action: PayloadAction<boolean>) =>
      (state = action.payload),
  },
});
export const modalTimerActions = modalTimerSlice.actions;

export const loginSlice = createSlice({
  name: "login",
  initialState: false,
  reducers: {
    loginCheck: (state, action: PayloadAction<boolean>) =>
      (state = action.payload),
  },
});

export const loginActions = loginSlice.actions;

export const eqSlice = createSlice({
  name: "eq",
  initialState: "",
  reducers: {
    eq: (state: string, action: PayloadAction<string>) =>
      (state = action.payload),
  },
});
export const eqActions = eqSlice.actions;

export const pageSlice = createSlice({
  name: "page",
  initialState: { currentPage: 0 },
  reducers: {
    setCurrentPage: (state, action: PayloadAction<any>) =>
      (state.currentPage = action.payload),
  },
});

export const pageActions = pageSlice.actions;

export const ModalSlice = createSlice({
  name: "history_last",
  initialState: [],
  reducers: {
    ModalHistory: (state: any, action: PayloadAction<any>) =>
      (state = action.payload),
  },
});
export const ModalActions = ModalSlice.actions;

export const listSlice = createSlice({
  name: "history_last",
  initialState: [],
  reducers: {
    listHistory: (state: any, action: PayloadAction<any>) =>
      (state = action.payload),
  },
});
export const listActions = listSlice.actions;

export const profileSlice = createSlice({
  name: "getProfile",
  initialState: [],
  reducers: {
    profile: (state: any, action: PayloadAction<any>) =>
      (state = action.payload),
  },
});
export const profileActions = profileSlice.actions;

export const bpmGraphSlice = createSlice({
  name: "bpmGraph",
  initialState: [],
  reducers: {
    value: (state: any, action: PayloadAction<any>) => (state = action.payload),
  },
});
export const bpmGraphActions = bpmGraphSlice.actions;

export const barGraphSlice = createSlice({
  name: "barGraph",
  initialState: [],
  reducers: {
    value: (state: any, action: PayloadAction<any>) => (state = action.payload),
  },
});
export const barGraphActions = barGraphSlice.actions;

export const writetimeGraphSlice = createSlice({
  name: "writetime",
  initialState: "",
  reducers: {
    value: (state: any, action: PayloadAction<any>) => (state = action.payload),
  },
});
export const writetimeGraphActions = writetimeGraphSlice.actions;

export const nameSlice = createSlice({
  name: "name",
  initialState: [],
  reducers: {
    value: (state: any, action: PayloadAction<any>) => (state = action.payload),
  },
});
export const nameActions = nameSlice.actions;

export const todayArrCountSlice = createSlice({
  name: "todayArr",
  initialState: 0,
  reducers: {
    todayCount: (state: number, action: PayloadAction<number>) =>
      (state = action.payload),
  },
});
export const todayArrCountAction = todayArrCountSlice.actions;

export const exceptColumnIdSlice = createSlice({
  name: "exceptColumn",
  initialState: ["eqname", "battery", "step", "distanceKM", "cal", "calexe"],
  reducers: {
    value: (state: Array<string>, action: PayloadAction<Array<string>>) =>
      (state = action.payload),
  },
});
export const exceptColumnIdAction = exceptColumnIdSlice.actions;
