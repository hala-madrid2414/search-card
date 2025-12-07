import axios from 'axios';

// 以下是npm run server后的信息
// Mock server running at http://localhost:8888
// Static assets available at http://localhost:8888/static
// API endpoints:
//   - GET /api/shop-header
//   - GET /api/shop-products
//   - GET /api/waterfall-cards
// 由于我只能通过电脑连接手机热点，手机扫码预览项目，故开发时采用的是实际地址
export const baseURL = 'http://localhost:8888';

const request = axios.create({
  baseURL,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let message = '网络错误，请稍后重试';
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
      message = '请求超时';
    } else if (error.response) {
      // 服务器有响应，但状态码不在2xx范围内
      const status = error.response.status;
      switch (status) {
        case 400:
          message = '请求参数错误';
          break;
        case 404:
          message = '请求的资源不存在';
          break;
        case 500:
          message = '服务器内部错误';
          break;
        default:
          message = `请求失败（${status}）`;
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应（如网络断开）
      message = '网络异常，请检查网络连接';
    }
    // 抛出错误
    return Promise.reject(new Error(message));
  },
);

export default request;
