import './index.css';

export function ShopItem({ src }) {
  return (
    <view className="PromoCard">
      <image src={src} className="PromoImage" />
    </view>
  );
}
