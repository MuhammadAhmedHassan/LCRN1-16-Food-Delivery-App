import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {constants} from '../../constants';
import type {RootState} from '../store';

// Define a type for the slice state
interface CounterState {
  selectedTab: string;
}

// Define the initial state using that type
const initialState: CounterState = {
  selectedTab: constants.screens.home,
};

export const counterSlice = createSlice({
  name: 'tabs',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelectedTab: (state, action: PayloadAction<string>) => {
      const {payload} = action;
      state.selectedTab = payload;
    },
  },
});

export const {setSelectedTab} = counterSlice.actions;

export default counterSlice.reducer;
