const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRouter = require('./routes/api');
const waterfallCardsBase = require('./data/waterfallCards.json');

const app = express();

// 配置端口：优先使用环境变量，默认 8888
const PORT = process.env.PORT || 8888;

// 中间件配置
app.use(cors()); // 允许跨域
app.use(express.json()); // 解析 JSON 请求体

// 静态资源服务：映射 server/public 目录到 /static
const assetsDir = path.join(__dirname, 'public');
app.use('/static', express.static(assetsDir, { maxAge: '1d' }));

// 注册路由模块
// 所有 /api 开头的请求都会交给 apiRouter 处理
app.use('/api', apiRouter);

// 额外提供瀑布流数据接口（仅后端拷贝数据，不影响前端）
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

app.get('/api/waterfall-cards', (req, res) => {
  res.json(waterfallCards);
});

// 基础健康检查路由
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// 启动服务
app.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}`);
  console.log(`Static assets available at http://localhost:${PORT}/static`);
  console.log(`API endpoints:`);
  console.log(`  - GET /api/shop-header`);
  console.log(`  - GET /api/shop-products`);
  console.log(`  - GET /api/waterfall-cards`);
});


