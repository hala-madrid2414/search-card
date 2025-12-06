import './index.css';

export function ShopItem({ item }) {
  if (item.type === 'custom') {
    return (
      <view className="PromoCard">
        <view className="ImageContainer">
          <image src={item.src} className="PromoHeadImage" />
        </view>
        
        <view className="PromoInfo">
          <text className="PromoTitle" max-lines="2">{item.title}</text>
          <view className="PromoPrice">
            <text className="Currency">￥</text>
            <text className="Price">{item.newPrice}</text>
            <text className="OldPrice">{item.oldPrice}</text>
            {item.label && (
              <view className="LabelTag">
                <text className="LabelText">{item.label}</text>
              </view>
            )}
          </view>
        </view>
      </view>
    );
  }

  return (
    <view className="PromoCard">
      <image src={item.src} className="PromoImage" />
    </view>
  );
}
