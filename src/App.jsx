import './App.css'
import { ShopHeader } from './components/ShopHeader/index.jsx'
import { ShopProduct } from './components/ShopProduct/index.jsx'
import { WaterfallCards } from './components/WaterfallCards/index.jsx'

export function App() {
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
        <view className='PromoteProduct'>
          <ShopHeader />
          <ShopProduct />
        </view>
      </list-item>
      <WaterfallCards />
    </list>
  )
}
