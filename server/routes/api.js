const express = require('express');
const router = express.Router();

// 加载 Mock 数据
// 注意：相对路径是相对于当前文件的
const shopHeader = require('../data/shopHeader.json');
const shopProductsRaw = require('../data/shopProducts.json');
const waterfallCardsBase = require('../data/waterfallCards.json');

// 处理数据：为 products 补充 id 字段
const shopProducts = shopProductsRaw.map((item, index) => ({
  ...item,
  id: index.toString(),
}));

// 瀑布流卡片：将基础 15 张图片重复 5 次，并补充 id 字段
const waterfallCardsRaw = [
  ...waterfallCardsBase,
  ...waterfallCardsBase,
  ...waterfallCardsBase,
  ...waterfallCardsBase,
  ...waterfallCardsBase,
];

const waterfallCards = waterfallCardsRaw.map((item, index) => ({
  ...item,
  id: index.toString(),
}));

// 定义路由
// GET /api/shop-header
router.get('/shop-header', (req, res) => {
  res.json(shopHeader);
});

// GET /api/shop-products
router.get('/shop-products', (req, res) => {
  res.json(shopProducts);
});

// GET /api/waterfall-cards
router.get('/waterfall-cards', (req, res) => {
  res.json(waterfallCards);
});

module.exports = router;
