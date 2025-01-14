
const BASE_URL = "https://world.openfoodfacts.org";

// Fetch products by search term
export const searchProductsByName = async (searchTerm, page = 1, pageSize = 12) => {
  // According to OpenFoodFacts docs:
  // endpoint: https://world.openfoodfacts.org/cgi/search.pl?search_terms={name}&page_size={pageSize}&page={page}&json=true
  const url = `${BASE_URL}/cgi/search.pl?search_terms=${searchTerm}&page_size=${pageSize}&page=${page}&json=true`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};


// Fetch products by category.

export const fetchProductsByCategory = async (category, page = 1, pageSize = 12) => {
  // endpoint: https://world.openfoodfacts.org/category/{category}/{page}.json
  const url = `${BASE_URL}/category/${category}/${page}.json?page_size=${pageSize}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// Fetch products by barcode.

export const fetchProductByBarcode = async (barcode) => {
    const url = `${BASE_URL}/api/v0/product/${barcode}.json`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };


// Fetch categories (this is to fill up the dropdown)

export const fetchAllCategories = async () => {
    try {
      const url = `${BASE_URL}/categories.json`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      return { tags: [] }; 
    }
  };
  