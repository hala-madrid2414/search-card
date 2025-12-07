import { useEffect } from '@lynx-js/react';
import { useDispatch } from 'react-redux';
import { fetchWaterfallCards } from './store/modules/comment';
import { fetchShopHeader, fetchShopProducts } from './store/modules/shop';
import './App.css';
import { ShopHeader } from './components/ShopHeader/index.jsx';
import { ShopProduct } from './components/ShopProduct/index.jsx';
import { WaterfallCards } from './components/WaterfallCards/index.jsx';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShopHeader());
    dispatch(fetchShopProducts());
    dispatch(fetchWaterfallCards());
  }, []);

  return (
    <list
      className="App WaterfallList"
      list-type="waterfall"
      span-count={2}
      scroll-orientation="vertical"
      column-gap="20rpx"
      main-axis-gap="20rpx"
    >
      <list-item full-span={true} item-key="header">
        <view className="PromoteProduct">
          <ShopHeader />
          <ShopProduct />
        </view>
      </list-item>
      <WaterfallCards />
    </list>
  );
}
