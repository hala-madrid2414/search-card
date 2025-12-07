import { createSlice } from '@reduxjs/toolkit';
import logo from '@/assets/target-header-logo.png';
import promo1Head from '@/assets/PromotionProduct/newhead-1.jpg';
import promo2Head from '@/assets/PromotionProduct/newhead-2.jpg';
import promo3Head from '@/assets/PromotionProduct/newhead-3.jpg';

const defaultShopData = {
  shopName: '瑞幸咖啡 (江安花园店)',
  topTags: ['团购', '可配送'],
  logo: logo,
  isLive: true,
  statistics: {
    score: '4.3',
    scoreLabel: '推荐',
    reviews: '94条评价',
    avgPrice: '人均 ¥12',
  },
  location: {
    category: '咖啡厅',
    address: '四川大学江安校区',
    distance: '792m',
  },
  extras: {
    ranking: '入围成都市咖啡厅人气榜',
    userTags: ['购买过', '咖啡好喝'],
  }
};

const defaultProducts = [
    { 
      type: 'custom', 
      src: promo1Head, 
      label: '到店',
      title: '【爆款甄选】瑞门爆款12选1', 
      newPrice: '11.66', 
      oldPrice: '￥32', 
      discount: '3.7折'
    },
    { 
      type: 'custom', 
      src: promo2Head, 
      label: '外卖',
      title: '【健康美式】8选1', 
      newPrice: '11.9', 
      oldPrice: '￥32',
      discount: '3.8折'
    },
    { 
      type: 'custom', 
      src: promo3Head, 
      label: '到店',
      title: '【联名PP杯】生椰杨枝甘露（超大杯）', 
      newPrice: '12.8', 
      oldPrice: '￥32',
      discount: '4.0折'
    },
        { 
      type: 'custom', 
      src: promo1Head, 
      label: '外卖',
      title: '【爆款甄选】瑞门爆款12选1', 
      newPrice: '11.66', 
      oldPrice: '￥32', 
      discount: '3.7折'
    },
    { 
      type: 'custom', 
      src: promo2Head, 
      label: '到店',
      title: '【健康美式】8选1', 
      newPrice: '11.9', 
      oldPrice: '￥32',
      discount: '3.8折' 
    },
    { 
      type: 'custom', 
      src: promo3Head, 
      label: '到店',
      title: '【联名PP杯】生椰杨枝甘露（超大杯）', 
      newPrice: '12.8', 
      oldPrice: '￥32',
      discount: '4.0折'
    },
        { 
      type: 'custom', 
      src: promo1Head, 
      label: '到店',
      title: '【爆款甄选】瑞门爆款12选1', 
      newPrice: '11.66', 
      oldPrice: '￥32', 
      discount: '3.7折'
    },
    { 
      type: 'custom', 
      src: promo2Head, 
      label: '到店',
      title: '【健康美式】8选1', 
      newPrice: '11.9', 
      oldPrice: '￥32',
      discount: '3.8折'
    },
    { 
      type: 'custom', 
      src: promo3Head, 
      label: '到店',
      title: '【联名PP杯】生椰杨枝甘露（超大杯）', 
      newPrice: '12.8', 
      oldPrice: '￥32',
      discount: '4.0折'
    },
        { 
      type: 'custom', 
      src: promo1Head, 
      label: '到店',
      title: '【爆款甄选】瑞门爆款12选1', 
      newPrice: '11.66', 
      oldPrice: '￥32', 
      discount: '3.7折'
    },
    { 
      type: 'custom', 
      src: promo2Head, 
      label: '到店',
      title: '【健康美式】8选1', 
      newPrice: '11.9', 
      oldPrice: '￥32',
      discount: '3.8折'
    },
    { 
      type: 'custom', 
      src: promo3Head, 
      label: '到店',
      title: '【联名PP杯】生椰杨枝甘露（超大杯）', 
      newPrice: '12.8', 
      oldPrice: '￥32',
      discount: '4.0折'
    },
    { 
      type: 'custom', 
      src: promo1Head, 
      label: '到店',
      title: '【爆款甄选】瑞门爆款12选1', 
      newPrice: '11.66', 
      oldPrice: '￥32', 
      discount: '3.7折'
    },
    { 
      type: 'custom', 
      src: promo2Head, 
      label: '到店',
      title: '【健康美式】8选1', 
      newPrice: '11.9', 
      oldPrice: '￥32',
      discount: '3.8折'
    },
    { 
      type: 'custom', 
      src: promo3Head, 
      label: '到店',
      title: '【联名PP杯】生椰杨枝甘露（超大杯）', 
      newPrice: '12.8', 
      oldPrice: '￥32',
      discount: '4.0折'
    },
        { 
      type: 'custom', 
      src: promo1Head, 
      label: '到店',
      title: '【爆款甄选】瑞门爆款12选1', 
      newPrice: '11.66', 
      oldPrice: '￥32', 
      discount: '3.7折'
    },
    { 
      type: 'custom', 
      src: promo2Head, 
      label: '到店',
      title: '【健康美式】8选1', 
      newPrice: '11.9', 
      oldPrice: '￥32',
      discount: '3.8折'
    },
    { 
      type: 'custom', 
      src: promo3Head, 
      label: '到店',
      title: '【联名PP杯】生椰杨枝甘露（超大杯）', 
      newPrice: '12.8', 
      oldPrice: '￥32',
      discount: '4.0折'
    },
  ].map((item, index) => ({ ...item, id: index.toString() }));

const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    shopInfo: defaultShopData,
    products: defaultProducts,
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

export const { setShopInfo, setProducts } = shopSlice.actions;
export default shopSlice.reducer;
