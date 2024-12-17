import React, { useState, useEffect } from 'react';
import config from '../../config/config';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    cat_image: ''  // Changed to match API
  });
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/categories/`);
        const data = await response.json();
        console.log('Fetched categories:', data); // Log the fetched categories
        setCategories(data.data || []); // Ensure 'data' exists and is an array
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setError('Failed to load categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Create category function
  const handleCreateCategory = async () => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/admin-categories-create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newCategory),
      });

      if (!response.ok) {
        throw new Error('Failed to create category');
      }

      const createdCategory = await response.json();
      setCategories([...categories, createdCategory]);
      setNewCategory({
        name: '',
        description: '',
        cat_image: ''  // Changed to match API
      });
      console.log('Category created:', createdCategory);
    } catch (error) {
      console.error('Error creating category:', error);
      setError('Failed to create category');
    }
  };

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY0OTcxMTgxLCJpYXQiOjE3MzM0MzUxODEsImp0aSI6IjQxNDAxZDliNWI0YTQ1ZDE5NWNjOWMzMWZhODhmZDg2IiwidXNlcl9pZCI6Mn0.KiJUAxz6aRtHUqLArEloEC8qYUQKhtB86NebB5DzwGY';

  // Update category function
  const handleUpdateCategory = async (categoryId, categoryData) => {
    try {
      // Send the update request
      const response = await fetch(`${config.API_BASE_URL}/update-category/${categoryId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id: categoryId, ...categoryData }),
      });

      // Check if the response is OK
      if (!response.ok) {
        throw new Error('Failed to update category');
      }

      // Parse the response data (updated category)
      const updatedCategory = await response.json();

      // Update the local state with the updated category
      setCategories((prevCategories) =>
        prevCategories.map((cat) => (cat.id === categoryId ? updatedCategory : cat))
      );

      // Reset the categoryToEdit state to null or handle accordingly
      setCategoryToEdit(null);

      console.log('Category updated:', updatedCategory);
    } catch (error) {
      console.error('Error updating category:', error);
      setError('Failed to update category');
    }
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Categories</h2>

      {/* New Category Form */}
      <div>
        <h3>Create New Category</h3>
        <input
          type="text"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          placeholder="Category Name"
        />
        <input
          type="text"
          value={newCategory.description}
          onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
          placeholder="Category Description"
        />
        <input
          type="text"
          value={newCategory.cat_image}  // Changed to match API
          onChange={(e) => setNewCategory({ ...newCategory, cat_image: e.target.value })}
          placeholder="Category Image URL"
        />
        <button onClick={handleCreateCategory}>Create Category</button>
      </div>

      {/* Edit Category Form */}
      {categoryToEdit && (
        <div>
          <h3>Edit Category</h3>
          <input
            type="text"
            value={categoryToEdit.name}
            onChange={(e) => setCategoryToEdit({ ...categoryToEdit, name: e.target.value })}
            placeholder="Category Name"
          />
          <input
            type="text"
            value={categoryToEdit.description}
            onChange={(e) => setCategoryToEdit({ ...categoryToEdit, description: e.target.value })}
            placeholder="Category Description"
          />
          <input
            type="text"
            value={categoryToEdit.cat_image}  // Changed to match API
            onChange={(e) => setCategoryToEdit({ ...categoryToEdit, cat_image: e.target.value })}
            placeholder="Category Image URL"
          />
          <button onClick={() => handleUpdateCategory(categoryToEdit.id, categoryToEdit)}>Update Category</button>
        </div>
      )}

      {/* Category List */}
      <div>
        <h3>Category List</h3>
        <ul>
          {categories && categories.length > 0 ? (
            categories.map((cat, index) => (
              <li key={index}>
                <h4>{cat.name || 'No name'}</h4>
                <p>{cat.description || 'No description'}</p>
                <img src={cat.cat_image || ''} alt={cat.name || 'No image'} style={{ width: '100px' }} />
                <button onClick={() => setCategoryToEdit(cat)}>Edit</button>
              </li>
            ))
          ) : (
            <p>No categories available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CategoriesPage;
