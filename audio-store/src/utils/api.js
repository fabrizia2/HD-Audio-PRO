// src/utils/api.js

import config from '../config/config';

export const fetchData = async (endpoint, options = {}) => {
  const url = `${config.API_BASE_URL}${endpoint}`;
  const controller = new AbortController();
  const { signal } = controller;
  const timeoutId = setTimeout(() => controller.abort(), config.timeout);

  for (let attempt = 0; attempt < config.retries; attempt++) {
    try {
      const response = await fetch(url, { ...options, signal });

      if (!response.ok) {
        console.error(`Response failed: ${response.statusText}`); // Log response failure
        throw new Error(`Error: ${response.statusText}`);
      }

      clearTimeout(timeoutId);
      const data = await response.json();
      console.log('Fetched data:', data); // Log the fetched data
      return data;
    } catch (error) {
      if (attempt < config.retries - 1) {
        console.warn(`Retrying... (${attempt + 1}/${config.retries})`);
      } else {
        clearTimeout(timeoutId);
        console.error('Fetch failed:', error); // Log the error
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
  return await fetchData(`${config.API_BASE_URL}/admin-categories-create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData),
  });
};

export const updateCategory = async (categoryId, categoryData) => {
  return await fetchData(`${config.API_BASE_URL}/update-category/${categoryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: categoryId, ...categoryData }),
  });
};

export const createProduct = async (productData) => {
  return await fetchData(`${config.API_BASE_URL}/admin-products-create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
};

// updateProduct function
export const updateProduct = async (productId, productData) => {
  try {
    const response = await fetchData(`${config.API_BASE_URL}/update-product/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: productId, ...productData }),
    });

    console.log('Update product response:', response); // Debugging line

    // Ensure response contains valid data before continuing
    if (response && response.data) {
      return response.data; // Return the updated product data
    } else {
      console.error('Failed to update product: No data returned');
      throw new Error('Failed to update product: No data returned');
    }
  } catch (error) {
    console.error('Error updating product:', error);
    throw error; // Rethrow the error to be handled in the calling function
  }
};

