
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// 配置端口：优先使用环境变量，默认 3001
const PORT = process.env.PORT || 3001;

// 中间件配置
app.use(cors()); // 允许跨域
app.use(express.json()); // 解析 JSON 请求体

// 静态资源服务：映射项目根目录下的 assets 到 /static
// 注意：根据实际项目结构调整路径，假设 server 在项目根目录下
const assetsDir = path.join(__dirname, '..', 'src', 'assets');
app.use('/static', express.static(assetsDir));

// 基础健康检查路由
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// 启动服务
app.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}`);
  console.log(`Static assets available at http://localhost:${PORT}/static`);
});