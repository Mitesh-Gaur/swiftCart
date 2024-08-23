// src/app/checkout/page.tsx

"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../auth/utils";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function Page({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const token = useAppSelector((state) => state?.user?.token);
  const user: any = useAppSelector((state) => state?.user?.user);

  if(!token) {router.push('/auth/login')}

  const getOrderDetail = async (id: string) => {
    const response = await fetch(`${baseUrl}/api/getOrderDetail/${parseInt(id)}`);
    const data = await response.json();
    console.log("order: ", data);
    return data
  }

  const { isPending, error, data } = useQuery({
    queryKey: ['orderDetail'],
    queryFn: () => getOrderDetail(params.id),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const getFormatedDate = (order_date: any) => {
    const orderDate = new Date(order_date);
    const formattedDate = orderDate.toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' });
    return formattedDate;
  }

  const getOrderStatus = (status: any) => {
    switch (status) {
      case 0: return "Ordered on"
      case 1: return "Dispatched on"
      case 2: return "Delivered"
      default: return ""
    }
  }

  const renderOrderItems = () => {
    return data?.order?.order_items?.map((orderItem: any) => {
      return <div className="flex items-center py-4">
        <img src={orderItem.product.image_url} className="text-center text-base p-1 text-gray-900 w-16 h-16 object-contain mr-2" />
        <div>
          <p className="text-base p-1 text-gray-900">{orderItem.product.name}</p>
          <div className="flex items-center">
            <p className="text-xs px-1 text-gray-900">
              <span className="flex flex-col">
                <span>₹{orderItem.price_at_purchase}</span>
                <span>(M.R.P)</span>
              </span>
            </p>
          </div>
        </div>
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
            <Link className="text-slate-500 hover:text-slate-800" href="/orders">{'> My Orders'} </Link>
            <span className="text-slate-500">{`> ${data.order.id}`}</span>
          </span>
        </div>
        <div className="flex">
          <div className="w-4/12 pr-4">
            <div className="bg-white text-gray-900 rounded-lg shadow py-2 mb-4 flex flex-col">
              <div className="py-2 mb-2 w-full border-b border-slate-100">
                <p className="capitalize px-6"><strong>Delivery Address</strong></p>
              </div>

              {!!user?.id ? <p className="capitalize px-6 font-bold">{user?.first_name} {user?.last_name}</p>
                : null}

              <p className="capitalize px-6 font-light mt-2">{data.order.shipping_address}</p>

              <p className="px-6 font-bold mt-2">Phone number</p>
              <p className="px-6 font-light">{ user?.phone_number }</p>
            </div>
          </div>

          <div className="w-8/12 mr-5">
            <div className="w-full rounded-lg shadow bg-white overflow-hidden px-4 flex items-center justify-between">
              <div id="ordersContainer flex items-center">
                {renderOrderItems()}
              </div>

              <div className="flex items-center">
                <p className="text-base p-1 text-gray-900">{getOrderStatus(data.order.status)} {getFormatedDate(data.order.order_date)}</p>
              </div>

              <button className="text-[#cb202d] flex items-center"><XMarkIcon width={24} height={24} /> Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
