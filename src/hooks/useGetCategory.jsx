import { useEffect, useState } from "react";

export default function useGetCategory(url) {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    let ignore = false;
    const getCategory = async () => {
      const response = await fetch(url);
      const result = await response.json();
      if (!ignore) {
        setCategory(result);
      }
    };
    getCategory();
    return () => (ignore = true);
  }, [url]);

  return category;
}
