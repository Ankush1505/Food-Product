import React from "react";
import ProductCard from './ProductCard';



function ProductGrid({ products }) {
  console.log(products);
  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id || product.code}>
          <ProductCard key={product.id} product={product} />
        </div>
      ))}
      
    </div>
  );
}

export default ProductGrid;

