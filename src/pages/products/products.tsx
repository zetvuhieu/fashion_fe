import React, { useState } from "react";
import ProductsList from "./components/productsList";
import FilterBar from "./components/productsBar";

function App() {
  const [selectedCategoriesId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <>
      <div className="lg:flex lg:justify-center">
        <div className="lg:w-[90%] lg:flex lg:justify-center">
          <div className="lg:w-[20%]">
            <FilterBar onChange={handleCategoryChange} />
          </div>
          <div className="lg:w-[80%]">
            <ProductsList categoryId={selectedCategoriesId} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
