import { configureStore } from '@reduxjs/toolkit';
import shopReducer from './modules/shop';
import commentReducer from './modules/comment';

const store = configureStore({
  reducer: {
    shop: shopReducer,
    comment: commentReducer,
  },
});

export default store;
