import React, { useState, useEffect } from "react";
import {
  searchProductsByName,
  fetchProductsByCategory,
  fetchAllCategories,
} from "../services/openFoodFactsAPI";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductGrid from "../components/ProductGrid";
import BeatLoader from "react-spinners/BeatLoader";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("");
  const [loader, setLoader] = useState(false);
  const [barcodeTerm, setBarcodeTerm] = useState("");

  

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchAllCategories();
        setCategories(data.tags.slice(0, 50));
      } catch (error) {
        console.error(error);
      }
    };
    loadCategories();
  }, []);

  const loadProducts = async (resetPage = false) => {
    setLoader(true);
    try {
      let response;
      if (searchTerm) {
        response = await searchProductsByName(searchTerm, page);
      } else if (category) {
        response = await fetchProductsByCategory(category, page);
      } else {
        response = await searchProductsByName(searchTerm, page);
      }

      const fetchedProducts = response.products || [];
      if (resetPage) {
        setProducts(fetchedProducts);
      } else {
        setProducts((prev) => [...prev, ...fetchedProducts]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  const handleSearchSubmit = (term) => {
    setSearchTerm(term);
    setCategory("");
    setPage(1);
    setProducts([]);
  };

  const handleBarcodeSearch = () => {
    if (!barcodeTerm) return;
    // We can simply navigate to product detail if barcode is known:
    window.location.href = `/product/${barcodeTerm}`;
  };


  const handleCategorySelect = (cat) => {
    setCategory(cat);
    setSearchTerm("");
    setPage(1);
    setProducts([]);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    sortProducts(products, option);
  };

  const sortProducts = (productList, option) => {
    let sorted = [...productList];
    switch (option) {
      case "name-asc":
        sorted.sort((a, b) => (a.product_name ?? "").localeCompare(b.product_name ?? ""));
        break;
      case "name-desc":
        sorted.sort((a, b) => (b.product_name ?? "").localeCompare(a.product_name ?? ""));
        break;
      case "nutrition-asc":
        sorted.sort((a, b) => (a.nutrition_grades ?? "").localeCompare(b.nutrition_grades ?? ""));
        break;
      case "nutrition-desc":
        sorted.sort((a, b) => (b.nutrition_grades ?? "").localeCompare(a.nutrition_grades ?? ""));
        break;
      default:
        break;
    }
    setProducts(sorted);
  };

  useEffect(() => {
    loadProducts(true);
  }, [searchTerm, category]);

  useEffect(() => {
    if (page > 1) {
      loadProducts(false);
    }
  }, [page]);

  useEffect(() => {
    if (sortOption) {
      sortProducts(products, sortOption);
    }
  }, [sortOption]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="home-container">
      <section className="header-section">
        <h1 className="fpe">Food Product Explorer</h1>

        <SearchBar
          onSearch={handleSearchSubmit}
          placeholder="Search product by name..."
        />

        <div className="barcode"  style={{ margin: "10px 0" }}>
            <input
              type="text"
              value={barcodeTerm}
              onChange={(e) => setBarcodeTerm(e.target.value)}
              placeholder="Enter barcode..."
            />
            <button onClick={handleBarcodeSearch}>Search by Barcode</button>
          </div>


        <CategoryFilter
          categories={categories}
          selectedCategory={category}
          onSelectCategory={handleCategorySelect}
        />
        
        
        <div style={{ margin: "10px 0" }}>
          <label htmlFor="sort">Sort By: </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="">--Select--</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="nutrition-asc">Nutrition Grade (A->E)</option>
            <option value="nutrition-desc">Nutrition Grade (E->A)</option>
          </select>
        </div>
      </section>

      {loader ? <div className="loader">
      <BeatLoader color="#141414" size={15} />
      </div>: <ProductGrid products={products} onLoadMore={handleLoadMore} />}

      {!loader && products.length > 0 && (
        <button onClick={handleLoadMore} style={{ margin: "20px auto", display: "block" }}>
          Load More
        </button>
      )}
    </div>
  );

}

export default HomePage;
