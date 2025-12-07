# Express 后端服务构建指南

本指南详细说明如何在本项目中使用 Express 框架构建轻量级后端服务，用于模拟后端数据接口及提供静态资源服务。

## 1. Express 服务初始化

### 1.1 安装依赖

在项目根目录下创建一个新的 `server` 目录，并在其中初始化项目和安装依赖。

```bash
# 创建并进入 server 目录
mkdir server
cd server

# 初始化 package.json
npm init -y

# 安装核心依赖
# express: Web 框架
# cors: 处理跨域请求
npm install express cors

# 安装开发依赖
# nodemon: 开发时自动重启服务
npm install -D nodemon
```

### 1.2 基本服务器配置

在 `server` 目录下创建 `server.js` 文件：

```javascript
// server/server.js
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
```

### 1.3 启动脚本配置

修改 `server/package.json` 添加启动脚本：

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

## 2. 核心功能实现指南

### 2.1 路由与控制器规范

建议将路由和逻辑分离，保持代码清晰。

**示例结构：**

```javascript
// server/server.js 中添加路由
const shopHeaderData = require('./data/shopHeader.json');

// 定义路由处理函数（控制器逻辑）
const getShopHeader = (req, res) => {
  try {
    // 这里可以添加逻辑，例如数据处理
    res.json(shopHeaderData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// 注册路由
app.get('/api/shop-header', getShopHeader);
```

### 2.2 中间件使用示例

**内置中间件：**
已在初始化中使用的 `express.json()` 和 `express.static()`。

**自定义中间件（例如请求日志）：**

```javascript
// 请求日志中间件
const requestLogger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // 必须调用 next() 将控制权交给下一个中间件
};

// 全局应用中间件
app.use(requestLogger);
```

### 2.3 错误处理机制

在所有路由之后注册全局错误处理中间件：

```javascript
// 404 处理
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// 全局错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});
```

## 3. 项目集成说明

### 3.1 适配现有项目结构

推荐目录结构：

```
project-root/
├── src/               # 前端源码
├── server/            # 后端服务
│   ├── data/          # JSON 数据文件
│   ├── server.js      # 入口文件
│   └── package.json
└── docs/              # 文档
```

### 3.2 数据库连接（建议）

对于简单的 Mock 服务，使用 JSON 文件即可。若需集成数据库（如 MongoDB），建议使用 Mongoose：

```javascript
// 示例：仅作参考，非必须
// const mongoose = require('mongoose');
// mongoose.connect(process.env.DB_URI);
```

### 3.3 API 设计规范

- **URL 命名**：使用 kebab-case，如 `/api/shop-products`。
- **响应格式**：保持统一，例如直接返回数据对象或数组，错误时返回 `{ error: "msg" }`。
- **静态资源**：统一使用 `/static` 前缀，前端引用时拼接完整 URL。

**前端调用示例：**

```javascript
// src/utils/api.js (建议封装)
const API_BASE = 'http://localhost:3001';

export const getShopHeader = async () => {
  const response = await fetch(`${API_BASE}/api/shop-header`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};
```

## 4. 最佳实践

### 4.1 目录结构建议

随着服务复杂度增加，建议重构为：

```
server/
├── config/         # 配置文件
├── controllers/    # 路由处理逻辑
├── middleware/     # 中间件
├── routes/         # 路由定义
├── data/           # Mock 数据
└── server.js       # 入口
```

### 4.2 安全配置

- **CORS 限制**：生产环境应限制允许的 Origin。
  ```javascript
  app.use(cors({ origin: 'http://localhost:3000' }));
  ```
- **输入验证**：对客户端传递的参数进行验证（可使用 `joi` 或 `express-validator`）。

### 4.3 性能优化

- **Gzip 压缩**：安装并使用 `compression` 中间件。
  ```bash
  npm install compression
  ```
  ```javascript
  const compression = require('compression');
  app.use(compression());
  ```
- **静态资源缓存**：设置 `maxAge`。
  ```javascript
  app.use('/static', express.static(assetsDir, { maxAge: '1d' }));
  ```
