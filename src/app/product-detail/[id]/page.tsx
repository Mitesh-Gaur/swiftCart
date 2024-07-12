'use client';

import { baseUrl } from "@/app/auth/utils";
import { ProductDetail } from "@/app/components/product";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getProductDetail(params.id);
  }, [params.id]);

  const getProductDetail = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/getProductDetail/${parseInt(id)}`);
      const data = await response.json();
      console.log("products: ", data?.product?.image_url);
      setProduct(data?.product); 
      setLoading(false);
    } catch (error) {console.log("Error", error);}
  };

  if(!!loading) {
    return (
      <div className='max-w-[1260px] mx-auto'>
        Loading...
      </div>
    );
  }

  return (
    <div className='max-w-[1260px] mx-auto'>
      <ProductDetail product={product} />
    </div>
  );
}