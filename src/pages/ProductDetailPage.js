import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loader, setLoader] = useState(false);
  const lastId = window.location.pathname.split("/").pop()

  console.log(window.location.pathname);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoader(true);
      try {
        const response = await fetch(
          `https://world.openfoodfacts.org/api/v0/product/${lastId}.json`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
  


        if (data && data.product) {
          setProduct(data.product);
        } else {
          console.error("Product not found");
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product details:", error.message);
        setProduct(null);
      } finally {
        setLoader(false);
      }
    };
  
    fetchProductDetails();
  }, [productId]);
  

  if (loader) {
    return (
      <div className="loader">
        <BeatLoader color="#141414" size={15} />
      </div>
    );
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const {
    product_name,
    image_front_url,
    ingredients_text,
    nutriments,
    labels,
  } = product;

  return (
    <div className="product-detail">
      <h2>{product_name}</h2>
      <div className="detail-image">
      <img
        src={image_front_url || "https://via.placeholder.com/300"}
        alt={product_name}
        style={{ maxWidth: "300px" }}
      />
      </div>
      <h3>Ingredients:</h3>
      <p>{ingredients_text || "Not available"}</p>
      <h3>Nutritional Values:</h3>
      {nutriments ? (
        <ul>
          <li>Energy: {nutriments["energy-kcal"] || "N/A"} kcal</li>
          <li>Fat: {nutriments.fat || "N/A"} g</li>
          <li>Carbohydrates: {nutriments.carbohydrates || "N/A"} g</li>
          <li>Proteins: {nutriments.proteins || "N/A"} g</li>
        </ul>
      ) : (
        <p>Not available</p>
      )}
      <h3>Labels:</h3>
      <p>{labels || "No labels"}</p>
    </div>
  );
}

export default ProductDetailPage;
