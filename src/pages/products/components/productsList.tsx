import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductsFilter,
  selectProductsData,
  selectProductsLoading,
  selectProductsError,
} from "@/redux/features/products/productsFilter";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { formatPrice } from "@/utils/format";

interface ListProductsProps {
  categoryId: string | null;
}

const ListProducts: React.FC<ListProductsProps> = (categoryId) => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProductsData);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
    console.log(id);
  };

  // Lấy giá trị categoryId từ đối tượng
  const categoryIdValue = categoryId ? categoryId.categoryId : null;

  useEffect(() => {
    if (typeof categoryIdValue === "string" || categoryIdValue === null) {
      dispatch(fetchProductsFilter(categoryIdValue));
    }
  }, [dispatch, categoryIdValue]);

  const formatImageUrl = (imagePath: string) => {
    const absolutePathIndex = imagePath.lastIndexOf("\\");
    const relativePath =
      absolutePathIndex !== -1
        ? imagePath.substring(absolutePathIndex + 1)
        : imagePath;
    return `${API_URL}/uploads/${relativePath}`;
  };

  return (
    <>
      <LoadingBar
        progress={loading ? 10 : 100}
        height={3}
        color="#0000EE"
        onLoaderFinished={() => {}}
      />
      <div className="lg:mt-4">
        <h2 className="bg-[#46694f] mt-1 px-12 py-2 text-white rounded-sm lg:rounded-xl font-semibold lg:text-lg ">
          Danh sách sản phẩm
        </h2>
        {loading ? (
          <div>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <div className="flex justify-between" key={rowIndex}>
                {Array.from({ length: 3 }).map((_, colIndex) => (
                  <div className="skeleton-product w-[30%]" key={colIndex}>
                    <Skeleton height={360} style={{ marginBottom: 10 }} />
                    <Skeleton
                      height={20}
                      width="80%"
                      style={{ marginBottom: 10 }}
                    />
                    <Skeleton height={15} width="60%" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {products && products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id.$oid}
                  className="border p-4 rounded shadow-md"
                  onClick={() => handleProductClick(product._id)}
                >
                  <img
                    className="object-cover w-full"
                    src={formatImageUrl(product.image)}
                    alt={product.name}
                    style={{ maxHeight: "100%", objectFit: "cover" }}
                  />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="mt-2">{product.description}</p>
                  <p className="mt-2 font-bold">{formatPrice(product.price)}</p>
                </div>
              ))
            ) : (
              <div className="flex justify-between">
                <div className="skeleton-product w-[30%]">
                  <Skeleton height={360} style={{ marginBottom: 10 }} />
                  <Skeleton
                    height={20}
                    width="80%"
                    style={{ marginBottom: 10 }}
                  />
                  <Skeleton height={15} width="60%" />
                </div>
                <div className="skeleton-product w-[30%]">
                  <Skeleton height={360} style={{ marginBottom: 10 }} />
                  <Skeleton
                    height={20}
                    width="80%"
                    style={{ marginBottom: 10 }}
                  />
                  <Skeleton height={15} width="60%" />
                </div>
                <div className="skeleton-product w-[30%]">
                  <Skeleton height={360} style={{ marginBottom: 10 }} />
                  <Skeleton
                    height={20}
                    width="80%"
                    style={{ marginBottom: 10 }}
                  />
                  <Skeleton height={15} width="60%" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ListProducts;
