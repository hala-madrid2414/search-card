import './index.css';
import { ShopItem } from './ShopItem/index.jsx';
import promo1Head from '../../assets/PromotionProduct/newhead-1.jpg';
import promo2Head from '../../assets/PromotionProduct/newhead-2.jpg';
import promo3Head from '../../assets/PromotionProduct/newhead-3.jpg';


const products = [
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
