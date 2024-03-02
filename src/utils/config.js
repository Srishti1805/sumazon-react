const baseURL = 'http://localhost:8000';

export const endpoints = {
  login: `${baseURL}/login/`,
  register: `${baseURL}/register/`,
  refresh: `${baseURL}/login/refresh/`,
  logout: `${baseURL}/logout/`,
  users: `${baseURL}/users/`,
  products: `${baseURL}/products/`,
  order: `${baseURL}/order/`,
};
