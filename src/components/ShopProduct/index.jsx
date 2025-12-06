import './index.css';
import { ShopItem } from './ShopItem/index.jsx';
import promo1Head from '../../assets/PromotionProduct/1-head.png';
import promo2Head from '../../assets/PromotionProduct/2-head.png';
import promo3Head from '../../assets/PromotionProduct/3-head.png';


const products = [
    { 
      type: 'custom', 
      src: promo1Head, 
      title: '【爆款甄选】瑞门爆款12选1', 
      newPrice: '11.66', 
      oldPrice: '￥32', 
      label: '3.7折'
    },
    { 
      type: 'custom', 
      src: promo2Head, 
      title: '【健康美式】8选1', 
      newPrice: '11.9', 
      oldPrice: '￥32',
      label: '3.8折'
    },
    { 
      type: 'custom', 
      src: promo3Head, 
      title: '【联名PP杯】生椰杨枝甘露（超大杯）', 
      newPrice: '12.8', 
      oldPrice: '￥32',
      label: '4.0折'
    },
        { 
      type: 'custom', 
      src: promo1Head, 
      title: '【爆款甄选】瑞门爆款12选1', 
      newPrice: '11.66', 
      oldPrice: '￥32', 
      label: '3.7折'
    },
    { 
      type: 'custom', 
      src: promo2Head, 
      title: '【健康美式】8选1', 
      newPrice: '11.9', 
      oldPrice: '￥32',
      label: '3.8折'
    },
    { 
      type: 'custom', 
      src: promo3Head, 
      title: '【联名PP杯】生椰杨枝甘露（超大杯）', 
      newPrice: '12.8', 
      oldPrice: '￥32',
      label: '4.0折'
    },
        { 
      type: 'custom', 
      src: promo1Head, 
      title: '【爆款甄选】瑞门爆款12选1', 
      newPrice: '11.66', 
      oldPrice: '￥32', 
      label: '3.7折'
    },
    { 
      type: 'custom', 
      src: promo2Head, 
      title: '【健康美式】8选1', 
      newPrice: '11.9', 
      oldPrice: '￥32',
      label: '3.8折'
    },
    { 
      type: 'custom', 
      src: promo3Head, 
      title: '【联名PP杯】生椰杨枝甘露（超大杯）', 
      newPrice: '12.8', 
      oldPrice: '￥32',
      label: '4.0折'
    },
        { 
      type: 'custom', 
      src: promo1Head, 
      title: '【爆款甄选】瑞门爆款12选1', 
      newPrice: '11.66', 
      oldPrice: '￥32', 
      label: '3.7折'
    },
    { 
      type: 'custom', 
      src: promo2Head, 
      title: '【健康美式】8选1', 
      newPrice: '11.9', 
      oldPrice: '￥32',
      label: '3.8折'
    },
    { 
      type: 'custom', 
      src: promo3Head, 
      title: '【联名PP杯】生椰杨枝甘露（超大杯）', 
      newPrice: '12.8', 
      oldPrice: '￥32',
      label: '4.0折'
    },
        { 
      type: 'custom', 
      src: promo1Head, 
      title: '【爆款甄选】瑞门爆款12选1', 
      newPrice: '11.66', 
      oldPrice: '￥32', 
      label: '3.7折'
    },
    { 
      type: 'custom', 
      src: promo2Head, 
      title: '【健康美式】8选1', 
      newPrice: '11.9', 
      oldPrice: '￥32',
      label: '3.8折'
    },
    { 
      type: 'custom', 
      src: promo3Head, 
      title: '【联名PP杯】生椰杨枝甘露（超大杯）', 
      newPrice: '12.8', 
      oldPrice: '￥32',
      label: '4.0折'
    },
        { 
      type: 'custom', 
      src: promo1Head, 
      title: '【爆款甄选】瑞门爆款12选1', 
      newPrice: '11.66', 
      oldPrice: '￥32', 
      label: '3.7折'
    },
    { 
      type: 'custom', 
      src: promo2Head, 
      title: '【健康美式】8选1', 
      newPrice: '11.9', 
      oldPrice: '￥32',
      label: '3.8折'
    },
    { 
      type: 'custom', 
      src: promo3Head, 
      title: '【联名PP杯】生椰杨枝甘露（超大杯）', 
      newPrice: '12.8', 
      oldPrice: '￥32',
      label: '4.0折'
    },
  ].map((item, index) => ({ ...item, id: index.toString() }));

export function ShopProduct() {
  return (
    <list className='Scroll' scroll-orientation="horizontal" main-axis-gap="16rpx">
      {products.map((item) => (
        <list-item key={item.id} item-key={item.id}>
            <ShopItem item={item} />
        </list-item>
      ))}
    </list>
  );
}
