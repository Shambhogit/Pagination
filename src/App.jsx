import React, { useEffect, useState } from "react";

const ProductCard = ({ image, title }) => {
  return (
    <div className="product-card">
      <img className="product-img" src={image} alt="product image" />
      <span className="product-title">{title}</span>
    </div>
  );
};

const PAGE_SIZE = 10;

const App = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const json = await data.json();
    setProducts(json.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalProducts = products.length;
  const numberOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE,
    end = start + PAGE_SIZE;

  const handlePageChange = (n) => {
    setCurrentPage(n);
  };

  const handleGoToPrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleGoToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return !products.length ? (
    <div>
      <h1>Product not found</h1>
    </div>
  ) : (
    <div className="container">
      <h1>Pagination</h1>

      <div className="products-container">
        {products.slice(start, end).map((p) => (
          <ProductCard key={p.id} image={p.thumbnail} title={p.title} />
        ))}
      </div>

      <div>
        <button
          disabled={currentPage === 0}
          className="page-number"
          onClick={() => handleGoToPrevPage(currentPage)}
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
          onClick={() => handleGoToNextPage(currentPage)}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default App;
