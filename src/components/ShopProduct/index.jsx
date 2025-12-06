import './index.css';
import { ShopItem } from './ShopItem/index.jsx';
import { products } from './data.js';

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
