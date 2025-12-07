# Redux实现示例代码

## 1. 完整的Store配置

### 1.1 store/index.ts
```typescript
import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import collectionReducer from './slices/collectionSlice';
import contentReducer from './slices/contentSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    collection: collectionReducer,
    content: contentReducer,
    ui: uiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 1.2 store/hooks.ts
```typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## 2. 完整的Slice实现

### 2.1 collectionSlice.ts
```typescript
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface CollectionState {
  shops: string[];
  isSyncing: boolean;
  lastSyncTime: number;
}

const initialState: CollectionState = {
  shops: [],
  isSyncing: false,
  lastSyncTime: 0
};

// 模拟API调用
const mockApiCall = async (shopId: string, action: boolean): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};

export const syncCollection = createAsyncThunk(
  'collection/sync',
  async ({ shopId, action }: { shopId: string; action: boolean }) => {
    const response = await mockApiCall(shopId, action);
    if (response.success) {
      return { shopId, action };
    }
    throw new Error('同步失败');
  }
);

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setCollections: (state, action: PayloadAction<string[]>) => {
      state.shops = action.payload;
    },
    clearCollections: (state) => {
      state.shops = [];
      state.lastSyncTime = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncCollection.pending, (state) => {
        state.isSyncing = true;
      })
      .addCase(syncCollection.fulfilled, (state, action) => {
        state.isSyncing = false;
        state.lastSyncTime = Date.now();
        const { shopId, action: isCollecting } = action.payload;
        
        if (isCollecting) {
          if (!state.shops.includes(shopId)) {
            state.shops.push(shopId);
          }
        } else {
          state.shops = state.shops.filter(id => id !== shopId);
        }
      })
      .addCase(syncCollection.rejected, (state) => {
        state.isSyncing = false;
      });
  }
});

export const { setCollections, clearCollections } = collectionSlice.actions;
export default collectionSlice.reducer;

// 选择器
export const selectCollections = (state: RootState) => state.collection.shops;
export const selectIsSyncing = (state: RootState) => state.collection.isSyncing;
export const selectIsCollected = (shopId: string) => (state: RootState) => 
  state.collection.shops.includes(shopId);
```

### 2.2 searchSlice.ts
```typescript
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface SearchState {
  keyword: string;
  type: 'normal' | 'shop' | 'restaurant';
  isLoading: boolean;
  error: string | null;
  history: string[];
  suggestions: string[];
}

const initialState: SearchState = {
  keyword: '',
  type: 'normal',
  isLoading: false,
  error: null,
  history: [],
  suggestions: []
};

// 模拟搜索API
const mockSearchApi = async (keyword: string): Promise<{ type: string; suggestions: string[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const suggestions = [
        `${keyword}相关结果1`,
        `${keyword}相关结果2`,
        `${keyword}相关结果3`
      ];
      
      // 模拟搜索结果类型判断
      const type = keyword.includes('餐厅') || keyword.includes('美食') ? 'restaurant' : 
                  keyword.includes('店') ? 'shop' : 'normal';
      
      resolve({ type, suggestions });
    }, 300);
  });
};

export const fetchSearchResults = createAsyncThunk(
  'search/fetchResults',
  async (keyword: string) => {
    const response = await mockSearchApi(keyword);
    return response;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
    setSearchType: (state, action: PayloadAction<'normal' | 'shop' | 'restaurant'>) => {
      state.type = action.payload;
    },
    clearSearch: (state) => {
      state.keyword = '';
      state.suggestions = [];
      state.error = null;
    },
    addToHistory: (state, action: PayloadAction<string>) => {
      state.history = [action.payload, ...state.history.filter(item => item !== action.payload)].slice(0, 10);
    },
    clearHistory: (state) => {
      state.history = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.type = action.payload.type as 'normal' | 'shop' | 'restaurant';
        state.suggestions = action.payload.suggestions;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '搜索失败';
      });
  }
});

export const { setKeyword, setSearchType, clearSearch, addToHistory, clearHistory } = searchSlice.actions;
export default searchSlice.reducer;

// 选择器
export const selectKeyword = (state: RootState) => state.search.keyword;
export const selectSearchType = (state: RootState) => state.search.type;
export const selectIsLoading = (state: RootState) => state.search.isLoading;
export const selectSuggestions = (state: RootState) => state.search.suggestions;
```

## 3. 组件集成示例

### 3.1 更新后的App.jsx
```jsx
import './App.css'
import { Provider } from 'react-redux'
import { store } from './store'
import { SearchApp } from './SearchApp'

export function App() {
  return (
    <Provider store={store}>
      <SearchApp />
    </Provider>
  )
}
```

### 3.2 SearchApp.jsx
```jsx
import { ShopHeader } from './components/ShopHeader/index.jsx'
import { ShopProduct } from './components/ShopProduct/index.jsx'
import { WaterfallCards } from './components/WaterfallCards/index.jsx'
import { SearchInput } from './components/SearchInput/index.jsx'
import { useAppSelector } from './store/hooks'

export function SearchApp() {
  const searchType = useAppSelector(state => state.search.type)
  const isShopSearch = searchType === 'shop' || searchType === 'restaurant'
  
  return (
    <view className="SearchApp">
      <SearchInput />
      <list
        className="App WaterfallList"
        list-type="waterfall"
        span-count={2}
        scroll-orientation="vertical"
        column-gap="20rpx"
        main-axis-gap="20rpx"
      >
        {isShopSearch && (
          <list-item full-span={true} item-key="header">
            <view className='PromoteProduct'>
              <ShopHeader />
              <ShopProduct />
            </view>
          </list-item>
        )}
        <WaterfallCards />
      </list>
    </view>
  )
}
```

### 3.3 更新后的ShopHeader.jsx
```jsx
import './index.css';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { syncCollection } from '../../store/slices/collectionSlice';
import heartIcon from '../../assets/Icons/redHeart.png';
import emptyHeartIcon from '../../assets/Icons/whiteHeart.png';
import { defaultShopData } from './data';

export function ShopHeader(props) {
  const dispatch = useAppDispatch();
  const shopId = props.shopId || 'default-shop-id';
  
  // 从Redux获取收藏状态
  const isCollected = useAppSelector(state => 
    state.collection.shops.includes(shopId)
  );
  const isSyncing = useAppSelector(state => state.collection.isSyncing);
  
  // 合并数据
  const shopData = { ...defaultShopData, ...props };
  const {
    logo,
    isLive,
    shopName,
    topTags,
    statistics = {},
    location = {},
    extras = {}
  } = shopData;

  const { score, scoreLabel, reviews, avgPrice } = statistics;
  const { category, address, distance } = location;
  const { ranking, userTags } = extras;

  const handleCollect = async () => {
    if (isSyncing) return;
    
    try {
      await dispatch(syncCollection({ shopId, action: !isCollected })).unwrap();
      console.log(isCollected ? '取消收藏' : '收藏成功');
    } catch (error) {
      console.error('收藏操作失败:', error);
    }
  };

  const handleCardClick = () => {
    console.log('跳转到店铺详情页');
  };

  return (
    <view className="HeaderContainer" bindtap={handleCardClick}>
      {/* 左侧Logo */}
      <view className="LogoContainer">
        <image src={logo} className={`Logo ${isLive ? 'Logo--live' : ''}`} />
        {isLive && (
          <view className="LiveBadge">
             <text className="LiveText">I.I 直播中</text>
          </view>
        )}
      </view>

      {/* 右侧信息 */}
      <view className="InfoContainer">
        {/* 第一行：标题 */}
        <view className="TitleRow">
          <text className="ShopName">{shopName}</text>
          {topTags?.map((tag, index) => (
            <view key={index} className="Tag"><text className="TagText">{tag}</text></view>
          ))}
        </view>

        {/* 第二行：评分和收藏 */}
        <view className="RatingRow">
          <view catchtap={handleCollect} className="HeartWrapper">
             {isSyncing ? (
               <text className="SyncText">同步中...</text>
             ) : (
               <image src={isCollected ? heartIcon : emptyHeartIcon} className="HeartIcon" />
             )}
          </view>
          <text className="Score">{score} {scoreLabel}</text>
          <text className="Reviews">{reviews}</text>
          <text className="HeaderPrice">{avgPrice}</text>
        </view>

        {/* 第三行：位置信息 */}
        <view className="LocationRow">
          <text className="Category">{category}</text>
          <text className="Address">{address}</text>
          <text className="Distance">{distance}</text>
        </view>

        {/* 第四行：排名和标签 */}
        <view className="RankingRow">
           {ranking && (
             <view className="RankingTag">
                <text className="RankingText">{ranking}</text>
             </view>
           )}
           {userTags?.map((tag, index) => (
             <text key={index} className="SimpleTag">{tag}</text>
           ))}
        </view>
      </view>
    </view>
  );
}
```

### 3.4 SearchInput.jsx
```jsx
import { useState, useEffect } from '@lynx-js/react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setKeyword, fetchSearchResults, addToHistory } from '../store/slices/searchSlice';
import './index.css';

export function SearchInput() {
  const dispatch = useAppDispatch();
  const keyword = useAppSelector(state => state.search.keyword);
  const suggestions = useAppSelector(state => state.search.suggestions);
  const isLoading = useAppSelector(state => state.search.isLoading);
  
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  useEffect(() => {
    if (keyword.length > 0) {
      const timer = setTimeout(() => {
        dispatch(fetchSearchResults(keyword));
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [keyword, dispatch]);
  
  const handleInputChange = (e) => {
    const value = e.detail.value;
    dispatch(setKeyword(value));
  };
  
  const handleSearch = () => {
    if (keyword.trim()) {
      dispatch(addToHistory(keyword));
      setShowSuggestions(false);
      // 触发搜索
    }
  };
  
  const handleSuggestionClick = (suggestion) => {
    dispatch(setKeyword(suggestion));
    setShowSuggestions(false);
    handleSearch();
  };
  
  return (
    <view className="SearchInputContainer">
      <view className="SearchBox">
        <input
          className="SearchInput"
          type="text"
          value={keyword}
          onInput={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="搜索美食、餐厅、商品"
          confirm-type="search"
          onConfirm={handleSearch}
        />
        {keyword && (
          <text className="ClearButton" onClick={() => dispatch(setKeyword(''))}>×</text>
        )}
      </view>
      
      {showSuggestions && suggestions.length > 0 && (
        <view className="SuggestionsList">
          {suggestions.map((suggestion, index) => (
            <view 
              key={index} 
              className="SuggestionItem"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <text className="SuggestionText">{suggestion}</text>
            </view>
          ))}
        </view>
      )}
      
      {isLoading && (
        <view className="LoadingIndicator">
          <text>搜索中...</text>
        </view>
      )}
    </view>
  );
}
```

## 4. 使用示例

### 4.1 在组件中使用Redux
```jsx
import { useAppSelector, useAppDispatch } from './store/hooks';
import { setKeyword } from './store/slices/searchSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const keyword = useAppSelector(state => state.search.keyword);
  
  const handleClick = () => {
    dispatch(setKeyword('新的搜索词'));
  };
  
  return (
    <view>
      <text>当前搜索词: {keyword}</text>
      <button onClick={handleClick}>更新搜索词</button>
    </view>
  );
}
```

### 4.2 异步操作示例
```jsx
import { useAppDispatch } from './store/hooks';
import { syncCollection } from './store/slices/collectionSlice';

function CollectionButton({ shopId }) {
  const dispatch = useAppDispatch();
  
  const handleCollect = async () => {
    try {
      await dispatch(syncCollection({ shopId, action: true })).unwrap();
      console.log('收藏成功');
    } catch (error) {
      console.error('收藏失败:', error);
    }
  };
  
  return (
    <button onClick={handleCollect}>收藏</button>
  );
}
```

这个实现示例展示了如何将现有的useState状态管理迁移到Redux，提供了完整的代码示例和使用方法。