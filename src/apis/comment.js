import request from '@/utils/request';

export function getShopComments() {
  return request('/api/waterfall-cards');
}
