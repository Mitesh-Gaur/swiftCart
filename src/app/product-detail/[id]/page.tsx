'use client';

import { baseUrl } from "@/app/auth/utils";
import { ProductDetail } from "@/app/components/product";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // useEffect(() => {
  //   getProductDetail(params.id);
  // }, [params.id]);

  const getProductDetail = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/getProductDetail/${parseInt(id)}`);
      const data = await response.json();
      console.log("products: ", data?.product?.image_url);
      setProduct(data?.product); 
      setLoading(false);
      return data
    } catch (error) {console.log("Error", error);}
  };

  const { isPending, error, data } = useQuery({
    queryKey: ['productDetail'],
    queryFn: () => getProductDetail(params.id)
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const handleBack = () => {
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
      </div>
      <ProductDetail product={data.product} />
    </div>
  );
}