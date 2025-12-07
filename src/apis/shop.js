import request from '@/utils/request';

export function getShopHeader() {
  return request('/api/shop-header');
}

export function getShopProducts() {
  return request('/api/shop-products');
}
