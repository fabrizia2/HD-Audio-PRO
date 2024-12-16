// src/utils/api.js

import config from '../config/config';

export const fetchData = async (endpoint, options = {}) => {
  const url = `${config.apiBaseUrl}${endpoint}`;
  const controller = new AbortController();
  const { signal } = controller;
  const timeoutId = setTimeout(() => controller.abort(), config.timeout);

  for (let attempt = 0; attempt < config.retries; attempt++) {
    try {
      const response = await fetch(url, { ...options, signal });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      clearTimeout(timeoutId);
      const data = await response.json();
      return data;
    } catch (error) {
      if (attempt < config.retries - 1) {
        console.warn(`Retrying... (${attempt + 1}/${config.retries})`);
      } else {
        clearTimeout(timeoutId);
        throw error;
      }
    }
  }
};

export const login = async (credentials) => {
  return await fetchData(`${config.API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
};

export const createCategory = async (categoryData) => {
  return await fetchData(`${config.API_BASE_URL}/Admin-categories-create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData),
  });
};

export const updateCategory = async (categoryId, categoryData) => {
  return await fetchData(`${config.API_BASE_URL}/Admin-category-Update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: categoryId, ...categoryData }),
  });
};

export const createProduct = async (productData) => {
  return await fetchData(`${config.API_BASE_URL}/Admin-products-create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
};

export const updateProduct = async (productId, productData) => {
  return await fetchData(`${config.API_BASE_URL}/Admin-products-update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: productId, ...productData }),
  });
};
