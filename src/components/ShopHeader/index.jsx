import { useState } from '@lynx-js/react';
import './index.css';
import logo from '../../assets/target-header-logo.png';
import heartIcon from '../../assets/Icons/redHeart.png';
import emptyHeartIcon from '../../assets/Icons/whiteHeart.png';

export function ShopHeader() {
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
        <image src={logo} className="Logo" />
        <view className="LiveBadge">
           <text className="LiveText">I.I 直播中</text>
        </view>
      </view>

      {/* Right Side: Info */}
      <view className="InfoContainer">
        {/* Row 1: Title */}
        <view className="TitleRow">
          <text className="ShopName">瑞幸咖啡 (江安花园店)</text>
          <view className="Tag"><text className="TagText">团购</text></view>
          <view className="Tag"><text className="TagText">可配送</text></view>
        </view>

        {/* Row 2: Rating */}
        <view className="RatingRow">
          <view catchtap={handleCollect} className="HeartWrapper">
             <image src={isCollected ? heartIcon : emptyHeartIcon} className="HeartIcon" />
          </view>
          <text className="Score">4.3 推荐</text>
          <text className="Reviews">94条评价</text>
          <text className="HeaderPrice">人均 ¥12</text>
        </view>

        {/* Row 3: Location */}
        <view className="LocationRow">
          <text className="Category">咖啡厅</text>
          <text className="Address">四川大学江安校区</text>
          <text className="Distance">792m</text>
        </view>

        {/* Row 4: Ranking/Tags */}
        <view className="RankingRow">
           <view className="RankingTag">
              <text className="RankingText">入围成都市咖啡厅人气榜</text>
           </view>
           <text className="SimpleTag">购买过</text>
           <text className="SimpleTag">咖啡好喝</text>
        </view>
      </view>
    </view>
  );
}
