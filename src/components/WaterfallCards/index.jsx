import { commentCardsPictures } from '@/assets/example-pictures/comment-cards/commentCardsPictures';
import './index.css';

export function WaterfallCards() {
  return (
    <>
      {commentCardsPictures.map((item, index) => (
        <list-item
          key={index}
          item-key={index.toString()}
          className="WaterfallItem"
        >
          <view className="Card">
            <image
              src={item.src}
              className="CardImage"
              style={{
                 width: '100%',
                 height: '100%',
                 aspectRatio: `${item.width} / ${item.height}`
              }}
              mode="aspectFill" 
            />

          </view>
        </list-item>
      ))}
    </>
  );
}
