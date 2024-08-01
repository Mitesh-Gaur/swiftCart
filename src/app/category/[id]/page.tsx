'use client';

import { AdjustmentsHorizontalIcon, ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductList, PriceRangeFilter, BrandList } from "@/app/components/product";
import Modal from "@/app/components/Modal";
import { baseUrl } from "@/app/auth/utils";
import { useQuery } from "@tanstack/react-query";

export default function Page({ params }: { params: { id: string } }) {
  const [products, setProducts] = useState<any[]>([]);
  const [searchProducts, setSearchProducts] = useState<any[]>([]);
  const [brands, setBrands] = useState<[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<number | undefined>();
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("brands");
  const router = useRouter();
  const path = usePathname();

  // useEffect(() => {
  //   getProductsForCategory(params.id);
  // }, [params.id]);

  const getProductsForCategory = async (id: string) => {
    const response = await fetch(`${baseUrl}/api/getProductsForCategory/${parseInt(id)}`);
    const data = await response.json();
    console.log("products: ", data);
    setProducts(data?.products);
    setSearchProducts(data?.products);
    setBrands(data?.brands);
    return data
  };

  const { isPending, error, data } = useQuery({
    queryKey: ['productsAndBrands'],
    queryFn: () => getProductsForCategory(params.id)
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const onAllBrandOptionClick = () => {
    setSelectedBrand(0);
  };

  const onBrandClick = (brand: any) => {
    setSelectedBrand(brand?.id);
  };

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const filterProducts = (brandId: number | undefined, minPrice: number, maxPrice: number) => {
    let filteredProducts = data.products;
    if (brandId && brandId !== 0) {
      filteredProducts = filteredProducts.filter((item: any) => item.brand === brandId);
    }
    setSearchProducts(filteredProducts);
  };

  const handleApply = () => {
    filterProducts(selectedBrand, minPrice, maxPrice);
    setIsModalOpen(false);
  };

  const handleBack = () => {
    setSelectedBrand(undefined);
    setMinPrice(0);
    setMaxPrice(100000);
    setSearchProducts(data.products);

    router.back();
  };

  return (
    <div className='max-w-[1260px] mx-auto'>
      <div className="flex items-center mb-4 py-4">
        <button
          onClick={handleBack}
          className="text-[#cb202d] py-2 rounded flex items-center mr-4"
        >
          <ArrowLeftIcon className={clsx('w-6 text-[#cb202d] mr-2')} /> Back
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-[#cb202d] py-2 px-4 rounded flex items-center"
        >
          <AdjustmentsHorizontalIcon
            className={clsx('w-6 text-[#cb202d] mr-2')}
          /> Filters
        </button>
      </div>

      <ProductList products={searchProducts} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} modalContainerStyle={'!p-0 !rounded overflow-hidden'} showCustomClose>
        <div className="filterHeader flex items-center justify-between py-6 px-5 border-b border-gray-300">
          <h1>Filters</h1>

          <button onClick={() => setIsModalOpen(false)}>
            <XMarkIcon
              className={clsx('w-6 text-[#cb202d] mr-2')}
            />
          </button>
        </div>
        <div className="flex">
          <div className="w-1/4 bg-[#f4f4f2] relative">
            <div className={clsx("h-[8rem] w-[0.4rem] rounded-[2px] bg-[#cb202ec0] transition-all absolute top-[0] left-[0] z-[2]", activeTab === "brands" ? "translate-y-[0rem]" : "translate-y-[8rem]")} />
            <div className="flex flex-col">
              <button onClick={() => setActiveTab("brands")} className={clsx("h-[8rem] z-[1]", activeTab === "brands" && "bg-white !rounded-bl")}>
                Brands
              </button>
              <button onClick={() => setActiveTab("price")} className={clsx("h-[8rem] z-[1]", activeTab === "price" && "bg-white !rounded-tl")}>
                Price Range
              </button>
            </div>
          </div>
          <div className="w-3/4 p-4">
            <div className="mt-4">
              {activeTab === "brands" ? (
                <BrandList
                  brands={data?.brands}
                  onBrandClick={onBrandClick}
                  onAllBrandOptionClick={onAllBrandOptionClick}
                  selectedBrand={selectedBrand}
                />
              ) : (
                <div className="mt-4">
                  <h3 className="text-lg mb-2">Price Range</h3>
                  <PriceRangeFilter
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    onPriceChange={handlePriceChange}
                  />
                </div>
              )}
            </div>

          </div>
        </div>
        <div className="filterFooter py-4 pr-4 text-right border-t border-gray-300">
          <button>Clear all</button>

          <button
            onClick={handleApply}
            className="bg-[#cb202d] text-white py-2 px-4 rounded ml-4"
          >
            Apply
          </button>
        </div>
      </Modal>
    </div>
  );
}