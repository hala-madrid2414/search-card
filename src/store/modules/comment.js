import { createSlice } from '@reduxjs/toolkit';
import { getShopComments } from '@/apis/comment';
import { baseURL } from '@/utils/request';

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    waterfallCards: [],
  },
  reducers: {
    setWaterfallCards(state, action) {
      state.waterfallCards = action.payload;
    },
  },
});

export const { setWaterfallCards } = commentSlice.actions;

export const fetchWaterfallCards = () => async (dispatch) => {
  try {
    const response = await getShopComments();
    if (response && response.data) {
      const data = response.data.map(item => {
        if (item.src && item.src.startsWith('/')) {
          return {
            ...item,
            src: `${baseURL}${item.src}`
          };
        }
        return item;
      });
      dispatch(setWaterfallCards(data));
    }
  } catch (error) {
    console.error('Failed to fetch waterfall cards:', error);
  }
};

export default commentSlice.reducer;
