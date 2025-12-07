import './index.css';
import { ShopItem } from './ShopItem/index.jsx';
import { useSelector } from 'react-redux';

export function ShopProduct() {
  const { products } = useSelector(state => state.shop);
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
