import { useAppSelector } from '@/lib/hooks';
import React from 'react'

export const deliveryCharges = 80;

function PriceDetails({ isOrderCart = false }: { isOrderCart?: boolean }) {
  const user = useAppSelector(state => state.user.user) as any;
  const cart = useAppSelector(state => state.user.newCart || [])?.toReversed();
  const orderCart = useAppSelector(state => state.user.orderCart || [])?.toReversed();

  if (!user?.id) { return null }

  const getOrderPriceSum = () => {
    const cartToUse = isOrderCart ? orderCart : cart;
    let orderPriceSum = cartToUse?.reduce((accumulator: number, item: any) => {
      return accumulator + parseFloat(item.price);
    }, 0);
    return orderPriceSum
  }

  const getTotalPayableAmount = () => { return getOrderPriceSum() + deliveryCharges }

  return (
    <div className="w-4/12" id="price-details">
      <div className="flex flex-wrap bg-white rounded-lg shadow overflow-hidden">
        <div className="w-full p-2 px-8 border-b-gray-100 border-b-[0.01px]">
          <h1 className="text-base title-font font-semibold text-gray-400 uppercase">Price Details</h1>
        </div>
        <div className="text-gray-400 body-font w-full">
          <div className="flex flex-col">
            <div className="px-8 flex items-center justify-between">
              <p className="text-[#212121] text-[14px] leading-8">Price (<span>{cart?.length}</span> items)</p>
              <p className="text-[#212121] text-[14px] leading-8" id="order_price">{getOrderPriceSum()}</p>
            </div>
            <div className="px-8 flex items-center justify-between">
              <p className="text-[#212121] text-[14px] leading-8">Delivery Charges</p>
              <p className="text-[#212121] text-[14px] leading-8">₹<span>{deliveryCharges}</span></p>
            </div>
          </div>
        </div>
        <div className="bg-[#cb202d] w-full flex items-center justify-between p-2 px-8">
          <h1 className="text-base title-font font-semibold text-white uppercase mb-0">Total Payable</h1>
          <h1 className="text-base title-font font-semibold text-white uppercase mb-0" id="order_total_payable">₹{getTotalPayableAmount()}</h1>
        </div>
      </div>
    </div>
  )
}

export default PriceDetails;