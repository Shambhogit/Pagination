# React Product Pagination

This project is a simple React app that demonstrates client-side pagination for a list of products fetched from an API. It displays products in a paginated format, allowing users to navigate between pages using navigation buttons.

---

## Features

- Fetches up to 500 products from [dummyjson.com](https://dummyjson.com/products).
- Displays products in pages of 10 items each.
- Pagination controls: previous/next arrows and page numbers.
- Highlights the active page.
- Responsive and clean UI.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Shambhogit/Pagination
   cd Pagination
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

### Running the App

To start the development server:
```sh
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

To build for production:
```sh
npm run build
```

To preview the production build:
```sh
npm run preview
```

---

## How the Code Works

### 1. Fetching Products

When the app loads, it fetches up to 500 products from the API and stores them in state:

```jsx
const [products, setProducts] = useState([]);
useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  const data = await fetch("https://dummyjson.com/products?limit=500");
  const json = await data.json();
  setProducts(json.products);
};
```

### 2. Pagination Logic

The app divides products into pages of 10 items each:

```jsx
const PAGE_SIZE = 10;
const [currentPage, setCurrentPage] = useState(0);

const totalProducts = products.length;
const numberOfPages = Math.ceil(totalProducts / PAGE_SIZE);
const start = currentPage * PAGE_SIZE;
const end = start + PAGE_SIZE;
```

- `currentPage` tracks the current page (starting from 0).
- `numberOfPages` is calculated based on the total number of products.

### 3. Displaying Products

Only the products for the current page are displayed:

```jsx
<div className="products-container">
  {products.slice(start, end).map((p) => (
    <ProductCard key={p.id} image={p.thumbnail} title={p.title} />
  ))}
</div>
```

### 4. Pagination Controls

The user can navigate pages using buttons:

```jsx
<button
  disabled={currentPage === 0}
  className="page-number"
  onClick={handleGoToPrevPage}
>
  ←
</button>
{[...Array(numberOfPages).keys()].map((n) => (
  <button
    className={"page-number " + (n === currentPage ? "active" : "")}
    key={n}
    onClick={() => handlePageChange(n)}
  >
    {n + 1}
  </button>
))}
<button
  disabled={currentPage === numberOfPages - 1}
  className="page-number"
  onClick={handleGoToNextPage}
>
  →
</button>
```

- The left arrow (`←`) goes to the previous page (disabled on the first page).
- The right arrow (`→`) goes to the next page (disabled on the last page).
- Numbered buttons allow direct navigation to any page. The active page is highlighted.

### 5. Product Card

Each product is shown using a simple card:

```jsx
const ProductCard = ({ image, title }) => (
  <div className="product-card">
    <img className="product-img" src={image} alt="product image" />
    <span className="product-title">{title}</span>
  </div>
);
```

---

## Styling

All styles are defined in [`src/index.css`](src/index.css), including layout, card appearance, and active page highlighting.

Example:

```css
.product-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  border: 1px solid black;
  padding: 5px;
  border-radius: 10px;
  margin: 10px;
}
.active {
  background-color: aqua;
}
```

---

## File Structure

```
src/
  ├── App.jsx        # Main React component with pagination logic
  ├── index.css      # Styling for the app
  └── main.jsx       # Entry point (standard Vite/React)
```

---

## License

This project is for educational purposes.

## Author
Shambho Jaybhaye