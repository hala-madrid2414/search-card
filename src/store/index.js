import { configureStore } from '@reduxjs/toolkit';
import commentReducer from './modules/comment';
import shopReducer from './modules/shop';

const store = configureStore({
  reducer: {
    shop: shopReducer,
    comment: commentReducer,
  },
});

export default store;
