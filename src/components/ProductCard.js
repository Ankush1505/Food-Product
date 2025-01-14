import React from 'react';
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // Destructure properties from the product object
  const { product_name, image_url, categories, ingredients_text, nutrition_grades } = product;

  return (
    <div className="product-card">
      <div className='product-image'>
      <img 
        src={image_url || "/placeholder.png"} 
        alt={product_name} 
        className="product-image" 
      /> </div>
      <div class="product-card-content">
      <h3 className="product-name">{product_name}</h3>
      
      {/* Check if categories exist and render it */}
      <p className="product-category">
        Category: {categories ? categories : "Not available"}
      </p>
      
      {/* Check if ingredients exist and render it */}
      <p className="product-ingredients">
        Ingredients: {ingredients_text || "Not available"}
      </p>

      <p className="product-nutrition-grade">
        Nutrition Grade: {nutrition_grades || "Not available"}
      </p>
      </div>

      <Link to={`/product/${product.id}`} className='view-details'>View Details</Link>
    </div>
  );
};

export default ProductCard;
