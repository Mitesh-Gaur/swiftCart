'use client';

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CartData } from "../components/cart";
import { setOrderCart } from "@/lib/slices/user.slice";

export default function Page({ params }: { params: { id: string } }) {
  const cart = useAppSelector(state => state.user.newCart || [])?.toReversed();
  const user = useAppSelector(state => state.user.user);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleBack = () => {
    router.back();
  };

  const onProceedToCheckout = () => {
    dispatch(setOrderCart(cart));
    setTimeout(() => {
      router.push('/checkout')
    }, 200)
  }

  return (
    <div className='max-w-[1260px] mx-auto'>
      <div className="flex items-center mb-4 pt-4">
        <button
          onClick={handleBack}
          className="text-[#cb202d] py-2 rounded flex items-center mr-4"
        >
          <ArrowLeftIcon className={clsx('w-6 text-[#cb202d] mr-2')} /> Back
        </button>
      </div>

      <CartData cart={cart} user={user} onProceedToCheckout={onProceedToCheckout} />
    </div>
  );
}