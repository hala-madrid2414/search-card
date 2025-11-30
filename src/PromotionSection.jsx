import { ShopHeader } from './components/ShopHeader'
import { ShopProduct } from './components/ShopProduct'
import './PromotionSection.css'

export function PromotionSection() {
  return (
    <>
        <view className='PromoteProduct'>
          <ShopHeader />
          <ShopProduct />
        </view>
    </>
  )
}
