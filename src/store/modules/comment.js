import { createSlice } from '@reduxjs/toolkit';
import pic0 from '@/assets/example-pictures/comment-cards/0.png';
import pic1 from '@/assets/example-pictures/comment-cards/1.png';
import pic2 from '@/assets/example-pictures/comment-cards/2.png';
import pic3 from '@/assets/example-pictures/comment-cards/3.png';
import pic4 from '@/assets/example-pictures/comment-cards/4.png';
import pic5 from '@/assets/example-pictures/comment-cards/5.png';
import pic6 from '@/assets/example-pictures/comment-cards/6.png';
import pic7 from '@/assets/example-pictures/comment-cards/7.png';
import pic8 from '@/assets/example-pictures/comment-cards/8.png';
import pic9 from '@/assets/example-pictures/comment-cards/9.png';
import pic10 from '@/assets/example-pictures/comment-cards/10.png';
import pic11 from '@/assets/example-pictures/comment-cards/11.png';
import pic12 from '@/assets/example-pictures/comment-cards/12.png';
import pic13 from '@/assets/example-pictures/comment-cards/13.png';
import pic14 from '@/assets/example-pictures/comment-cards/14.png';

const commentCardsPicturesSubArray = [
  {
    src: pic0,
    width: 315,
    height: 548,
  },
  {
    src: pic1,
    width: 315,
    height: 548,
  },
  {
    src: pic2,
    width: 315,
    height: 548,
  },
  {
    src: pic3,
    width: 315,
    height: 548,
  },
  {
    src: pic4,
    width: 315,
    height: 548,
  },
  {
    src: pic5,
    width: 315,
    height: 548,
  },
  {
    src: pic6,
    width: 315,
    height: 548,
  },
  {
    src: pic7,
    width: 315,
    height: 548,
  },
  {
    src: pic8,
    width: 315,
    height: 548,
  },
  {
    src: pic9,
    width: 315,
    height: 548,
  },
  {
    src: pic10,
    width: 315,
    height: 548,
  },
  {
    src: pic11,
    width: 315,
    height: 548,
  },
  {
    src: pic12,
    width: 315,
    height: 548,
  },
  {
    src: pic13,
    width: 315,
    height: 548,
  },
  {
    src: pic14,
    width: 315,
    height: 548,
  },
];

const commentCardsPictures = [
  ...commentCardsPicturesSubArray,
  ...commentCardsPicturesSubArray,
  ...commentCardsPicturesSubArray,
  ...commentCardsPicturesSubArray,
  ...commentCardsPicturesSubArray,
];

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
  // Simulate async request
  setTimeout(() => {
    dispatch(setWaterfallCards(commentCardsPictures));
  }, 100);
};

export default commentSlice.reducer;
