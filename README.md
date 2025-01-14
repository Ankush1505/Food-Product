# Food Product Explorer

Food Product Explorer is a web application that allows users to search, filter, and view detailed information about food products using the OpenFoodFacts API. This app is built with ReactJS, HTML, CSS, and JavaScript to deliver an interactive and user-friendly experience.


<img width="1680" alt="Screenshot 2025-01-14 at 8 48 42 PM" src="https://github.com/user-attachments/assets/f5abb617-7567-4164-afea-985935d3b390" />



---

## 🌟 Features

### 1. Homepage
- Displays a list of food products fetched from the OpenFoodFacts API.
- Each product shows key information:
  - **Product Name**
  - **Image**
  - **Category**
  - **Ingredients** (if available)
  - **Nutrition Grade** (A, B, C, D, E)
- Supports pagination via infinite scrolling or load-more functionality.

### 2. Search Functionality
- **Search by Name**: Users can search for food products by entering the product name.
- **Search by Barcode**: Users can search for food products by entering their barcode.

### 3. Filter by Category
- Provides a dropdown or sidebar filter to select food product categories (e.g., Beverages, Dairy, Snacks).
- Dynamically fetches categories from the OpenFoodFacts API.

### 4. Sort Functionality
- Allows sorting of food products by:
  - **Product Name** (A-Z, Z-A)
  - **Nutrition Grade** (Ascending/Descending)

### 5. Product Detail Page
- Clicking on a product redirects users to a detailed product page.
- Displays the following details:
  - **Product Image**
  - **Full List of Ingredients**
  - **Nutritional Values** (e.g., energy, fat, carbs, proteins)
  - **Labels** (e.g., vegan, gluten-free)

### 6. Responsive Design
- Fully responsive design, optimized for both mobile and desktop screens.

---

## 🛠️ Technologies Used

- **ReactJS**: Frontend framework for building the user interface.
- **CSS**: Styling the application for a visually appealing design.
- **OpenFoodFacts API**: Used to fetch food product data.

---

## 🔗 API Endpoints

- **Base URL**: `https://world.openfoodfacts.org/`

- **Sample Endpoints**:
  - Get products by category:  
    `https://world.openfoodfacts.org/category/{category}.json`
  - Search products by name:  
    `https://world.openfoodfacts.org/cgi/search.pl?search_terms={name}&json=true`
  - Get product details by barcode:  
    `https://world.openfoodfacts.org/api/v0/product/{barcode}.json`

- **Example Query**:  
  `https://world.openfoodfacts.org/api/v0/product/737628064502.json`  
  (Retrieves detailed product information for a specific product by barcode.)

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your system.
- A code editor (e.g., VS Code) for development.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/food-product-explorer.git
   
