import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const userSlice = createSlice({
  name: 'user',
  initialState: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
  reducers: {
    login(state, action) {
      return action.payload;
    },
  },
});
export const { login } = userSlice.actions;
export default userSlice.reducer;
