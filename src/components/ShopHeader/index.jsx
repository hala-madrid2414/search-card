import { useState } from '@lynx-js/react';
import { useSelector } from 'react-redux';
import './index.css';
import heartIcon from '@/assets/Icons/redHeart.png';
import emptyHeartIcon from '@/assets/Icons/whiteHeart.png';

export function ShopHeader(props) {
  const { shopInfo: defaultShopData } = useSelector((state) => state.shop);
  // Merge default data with passed props
  // Note: This is a shallow merge. If props contains nested objects like 'statistics',
  // it will replace the default 'statistics' entirely.
  const shopData = { ...defaultShopData, ...props };

  const {
    logo,
    isLive,
    shopName,
    topTags,
    statistics = {},
    location = {},
    extras = {},
  } = shopData;

  // Destructure grouped data with default values to prevent crash if groups are missing
  const { score, scoreLabel, reviews, avgPrice } = statistics;
  const { category, address, distance } = location;
  const { ranking, userTags } = extras;

  const [isCollected, setIsCollected] = useState(true);

  const handleCollect = () => {
    // 使用 catchtap 阻止事件冒泡，这里不需要显式调用 stopPropagation
    setIsCollected(!isCollected);
    console.log(isCollected ? '取消收藏' : '收藏成功');
  };

  const handleCardClick = () => {
    console.log('跳转到店铺详情页');
    // 如果有 lynx.showToast 也可以用
    // lynx.showToast({ title: '跳转到店铺详情页', icon: 'none' });
  };

  return (
    <view className="HeaderContainer" bindtap={handleCardClick}>
      {/* Left Side: Logo */}
      <view className="LogoContainer">
        <image src={logo} className={`Logo ${isLive ? 'Logo--live' : ''}`} />
        {isLive && (
          <view className="LiveBadge">
            <text className="LiveText">I.I 直播中</text>
          </view>
        )}
      </view>

      {/* Right Side: Info */}
      <view className="InfoContainer">
        {/* Row 1: Title */}
        <view className="TitleRow">
          <text className="ShopName">{shopName}</text>
          {topTags?.map((tag, index) => (
            <view key={index} className="Tag">
              <text className="TagText">{tag}</text>
            </view>
          ))}
        </view>

        {/* Row 2: Rating */}
        <view className="RatingRow">
          <view catchtap={handleCollect} className="HeartWrapper">
            <image
              src={isCollected ? heartIcon : emptyHeartIcon}
              className="HeartIcon"
            />
          </view>
          <text className="Score">
            {score} {scoreLabel}
          </text>
          <text className="Reviews">{reviews}</text>
          <text className="HeaderPrice">{avgPrice}</text>
        </view>

        {/* Row 3: Location */}
        <view className="LocationRow">
          <text className="Category">{category}</text>
          <text className="Address">{address}</text>
          <text className="Distance">{distance}</text>
        </view>

        {/* Row 4: Ranking/Tags */}
        <view className="RankingRow">
          {ranking && (
            <view className="RankingTag">
              <text className="RankingText">{ranking}</text>
            </view>
          )}
          {userTags?.map((tag, index) => (
            <text key={index} className="SimpleTag">
              {tag}
            </text>
          ))}
        </view>
      </view>
    </view>
  );
}
