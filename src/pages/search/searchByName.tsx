import React from "react";
import { useSelector } from "react-redux";
import {
  selectProductsData,
  selectCounterProducts,
  selectSearchLoading,
} from "@/redux/features/products/searchSlice";
import LoadingBar from "react-top-loading-bar";
import { formatPrice } from "@/utils/format";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const ProductList: React.FC = () => {
  const products = useSelector(selectProductsData);
  const quantityResuts = useSelector(selectCounterProducts);
  const loading = useSelector(selectSearchLoading);
  const navigate = useNavigate();

  const formatImageUrl = (imagePath: string) => {
    const absolutePathIndex = imagePath.lastIndexOf("\\");
    const relativePath =
      absolutePathIndex !== -1
        ? imagePath.substring(absolutePathIndex + 1)
        : imagePath;
    return `${API_URL}/uploads/${relativePath}`;
  };

  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
    console.log(id);
  };

  return (
    <>
      <LoadingBar
        progress={loading ? 10 : 100}
        height={3}
        color="#0000EE"
        onLoaderFinished={() => {}}
      />
      <h2 className="py-4 font-semibold text-xl text-center lg:text-3xl">
        Có {quantityResuts} kết quả tìm kiếm phù hợp
      </h2>
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-[90%] pb-8">
          {loading ? (
            // Hiển thị skeleton loaders khi đang tải
            <>
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="skeleton-product w-full">
                  <Skeleton height={360} style={{ marginBottom: 10 }} />
                  <Skeleton
                    height={20}
                    width="80%"
                    style={{ marginBottom: 10 }}
                  />
                  <Skeleton height={15} width="60%" />
                </div>
              ))}
            </>
          ) : products.length > 0 ? (
            // Hiển thị danh sách sản phẩm nếu có
            products.map((product) => (
              <div
                key={product._id}
                className="cursor-pointer"
                onClick={() => handleProductClick(product._id)}
              >
                <img
                  className="object-cover w-full"
                  src={formatImageUrl(product.image)}
                  alt={product.name}
                  style={{ maxHeight: "100%", objectFit: "cover" }}
                />
                <div className="py-4">
                  <h2 className="line-clamp-2 text-lg font-semibold pb-2 lg:text-xl">
                    {product.name}
                  </h2>
                  <p className="text-base font-semibold text-[#46694f] pb-2 lg:text-xl">
                    {formatPrice(product.price)}
                  </p>
                  <p className="lg:text-lg">{product.description}</p>
                </div>
              </div>
            ))
          ) : (
            // Thông báo không có sản phẩm
            <p>No products found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
