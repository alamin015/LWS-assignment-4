/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { ProductContext } from "../context";

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(null);

  const fetchData = async (category) => {
    try {
      setLoading(true);
      const data = await fetch(
        `https://fakestoreapi.com/products${category ? category : ""}`
      );
      if (!data.ok) {
        throw new Error("Something Went wrong!");
      }
      setProducts(await data.json());
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterItems = (categoryUrl) => {
    setUrl(categoryUrl);
  };

  useEffect(() => {
    setLoading(true);
    const getData = async (test) => {
      fetchData(test);
    };
    getData(url);
  }, [url]);

  useEffect(() => {
    setLoading(true);
    const timerId = setTimeout(() => {
      if (searchText) {
        const myUpdatedData = products.filter((i) =>
          i.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setLoading(false);
        setFilteredProducts(myUpdatedData);
      } else {
        setLoading(false);
        setFilteredProducts(products);
      }
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchText, products]);

  const productsData = {
    products,
    filteredProducts,
    error,
    loading,
    handleFilterItems,
    setLoading,
    setProducts,
    setSearchText,
    searchText,
  };
  return (
    <ProductContext.Provider value={productsData}>
      {children}
    </ProductContext.Provider>
  );
}
