import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config/config'; // Ensure you have the correct import for the config
import { createCategory, updateCategory } from '../../utils/api'; // Assuming you have a utility to handle API calls

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '', cat_image: '' });
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/categories/`);
        const data = await response.json();
        setCategories(data.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setError('Failed to load categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCreateCategory = async () => {
    try {
      const response = await createCategory(newCategory);
      setCategories([...categories, response]);
      setNewCategory({ name: '', description: '', cat_image: '' });
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      const response = await updateCategory(categoryToEdit.id, categoryToEdit);
      setCategories(categories.map(cat => (cat.id === categoryToEdit.id ? response : cat)));
      setCategoryToEdit(null);
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/categories/${categoryId}`);
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="categories-container">
      
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
          value={newCategory.cat_image}
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
            value={categoryToEdit.cat_image}
            onChange={(e) => setCategoryToEdit({ ...categoryToEdit, cat_image: e.target.value })}
            placeholder="Category Image URL"
          />
          <button onClick={handleUpdateCategory}>Update Category</button>
        </div>
      )}

      {/* Category List */}
      <div className="category-grid">
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => handleCategoryClick(category.id.toString())}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && handleCategoryClick(category.id.toString())}
            >
              <img
                src={category.cat_image}
                alt={`${category.name} - ${category.description}`}
                className="category-image"
              />
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <button onClick={() => setCategoryToEdit(category)}>Edit</button>
            </div>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
