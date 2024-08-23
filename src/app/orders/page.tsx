// src/app/checkout/page.tsx

"use client";

import { setUser } from "@/lib/slices/user.slice";
import { useEffect } from "react";
import { fetcher } from "@/app/fetcher";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../auth/utils";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function Home() {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const token = useAppSelector((state) => state?.user?.token);
  const user: any = useAppSelector((state) => state?.user?.user);

  if(!token) {router.push('/auth/login')}

  const getOrders = async () => {
    const payload = { uid: user?.id }
    const response = await fetch(`${baseUrl}/api/getOrders/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const orders = await response.json();
    console.log("orders: ", orders)
    return orders
  }

  const { isPending, error, data } = useQuery({
    queryKey: ['ordersData'],
    queryFn: () => getOrders(),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const getFormatedDate = (order_date:any) => {
    const orderDate = new Date(order_date);
    const formattedDate = orderDate.toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' });
    return formattedDate;
  }

  const getOrderStatus = (status:any) => {
    switch(status) {
      case 0: return "Ordered on"
      case 1: return "Dispatched on"
      case 2: return "Delivered"
      default: return ""
    }
  }

  const renderOrderItems = (order: any) => {
    return order?.order_items?.map((orderItem: any) => {
      return <div className="flex items-center">
        <img src={orderItem.product.image_url} className="text-center text-base p-1 text-gray-900 w-16 h-16 object-contain mr-2" />
        <p className="text-center text-base text-gray-900 w-64">{orderItem.product.name}</p>
      </div>
    })
  }

  const handleBack = () => {
    router.back();
  };

  return (
    <main className="max-w-[1260px] mx-auto">
      <div className="flex items-center mb-4">
        <button
          onClick={handleBack}
          className="text-[#cb202d] py-2 rounded flex items-center"
        >
          <ArrowLeftIcon className={clsx('w-6 text-[#cb202d] mr-2')} /> Back
        </button>
      </div>
      <div className="">
        <div className="breadcumb">
          <span className="text-sm">
            <Link className="text-slate-500 hover:text-slate-800" href="/">Home </Link>
            <Link className="text-slate-500 hover:text-slate-800" href="/profile">{'> My Account'} </Link>
            <span className="text-slate-500">{'> My Orders'}</span>
          </span>
        </div>
        <div className="flex">
          <div className="w-3/12 pr-4">
            {/* filters */}
            <div className="bg-white text-gray-900 rounded-lg shadow py-2 mb-4 flex">
              <div className="py-2 mb-2 w-full border-b border-slate-100">
                <p className="capitalize px-6"><strong>Filters</strong></p>
              </div>
            </div>
          </div>

          <div className="w-9/12 mr-5">
            <div className="w-full">
              <div id="ordersContainer">
                {data?.orders?.map((order: any) => {
                  return <Link href={`/order-detail/${order.id}`} className="flex items-center justify-between mb-8 rounded-lg shadow bg-white overflow-hidden px-4" key={order.id}>
                    <div className="text-center text-base p-1 text-gray-900 my-5">
                      {renderOrderItems(order)}
                    </div>
                    <p className="text-center text-base p-1 text-gray-900">₹{order.total_price}</p>
                    <p className="text-center text-base p-1 text-gray-900">{getOrderStatus(order.status)} {getFormatedDate(order.order_date)}</p>
                  </Link>
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
