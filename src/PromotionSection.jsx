import targetImg from './assets/target.jpg'
import promo1 from './assets/PromotionProduct/1.png'
import promo2 from './assets/PromotionProduct/2.png'
import promo3 from './assets/PromotionProduct/3.png'
import promo4 from './assets/PromotionProduct/4.png'
import promo5 from './assets/PromotionProduct/5.png'
import promo6 from './assets/PromotionProduct/6.png'
import promo7 from './assets/PromotionProduct/7.png'
import promo8 from './assets/PromotionProduct/8.png'
import promo9 from './assets/PromotionProduct/9.png'
import promo10 from './assets/PromotionProduct/10.png'
import promo11 from './assets/PromotionProduct/11.png'
import promo12 from './assets/PromotionProduct/12.png'

export function PromotionSection() {
  const promoImages = [
    promo1, promo2, promo3, promo4, promo5, promo6,
    promo7, promo8, promo9, promo10, promo11, promo12
  ];

  return (
    <>
        <view className='PromoteProduct'>
          <image auto-size style={{ width: '750rpx' }} src={targetImg} />
          <text>Promote your product</text>
        </view>
        <list className='Scroll' scroll-orientation="horizontal">
          {promoImages.map((src, index) => (
            <list-item key={index} item-key={index.toString()} className="PromoCard">
              <image src={src} className="PromoImage" />
              <text className="PromoText">Product {index + 1}</text>
            </list-item>
          ))}
        </list>
    </>
  )
}
