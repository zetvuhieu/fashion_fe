import React from "react";
import { useSelector } from "react-redux";
import { selectProductsData } from "@/redux/features/products/searchSlice";

const ProductList: React.FC = () => {
  const products = useSelector(selectProductsData);

  return (
    <div>
      {products.length > 0 ? (
        <ul>
          {products.map((product: any) => (
            <li key={product._id}>{product.name}</li>
          ))}
        </ul>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default ProductList;
