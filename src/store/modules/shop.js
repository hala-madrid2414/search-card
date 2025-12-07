import { createSlice } from '@reduxjs/toolkit';
import { getShopHeader, getShopProducts } from '@/apis/shop';
import { baseURL } from '@/utils/request';

const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    shopInfo: null,
    products: [],
  },
  reducers: {
    setShopInfo(state, action) {
      state.shopInfo = action.payload;
    },
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
});

const { setShopInfo, setProducts } = shopSlice.actions;

const fetchShopHeader = () => async (dispatch) => {
  try {
    const response = await getShopHeader();
    if (response && response.data) {
      const data = response.data;
      if (data.logo && data.logo.startsWith('/')) {
        data.logo = `${baseURL}${data.logo}`;
      }
      dispatch(setShopInfo(data));
    }
  } catch (error) {
    console.error('Failed to fetch shop header:', error);
  }
};

const fetchShopProducts = () => async (dispatch) => {
  try {
    const response = await getShopProducts();
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
      dispatch(setProducts(data));
    }
  } catch (error) {
    console.error('Failed to fetch shop products:', error);
  }
};

export { fetchShopHeader, fetchShopProducts };

export default shopSlice.reducer;
