import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",

  initialState: {
    value: 0,
    tabClickCount: 0
  },

  reducers: {
    increase(state) {
      state.value += 1;
    },

    decrease(state) {
      if (state.value > 0) {
        state.value -= 1;
      } else {
        alert('카운터는 0보다 작아질 수 없습니다.');
      }
    },

    reset(state) {
      state.value = 0;
    },

    tabIncrease(state) {
      state.tabClickCount += 1;
    }
  }
});

export const { increase, decrease, reset, tabIncrease } = counterSlice.actions;

export default counterSlice.reducer;