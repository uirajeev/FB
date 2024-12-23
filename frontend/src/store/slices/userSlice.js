import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const userSlice = createSlice({
  name: 'user',
  initialState: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    verify(state, action) {
      return { ...state, verified: action.payload };
    },
  },
});
export const { login, verify } = userSlice.actions;
export default userSlice.reducer;
