import clsx from "clsx";
import { useEffect, useState } from "react";
import { BellAlertIcon, TruckIcon, StarIcon } from "@heroicons/react/24/outline";

const Checkout = () => {
  const user = {
    address: "Test address"
  };
  
  return (
    <div className='max-w-[1260px] mx-auto flex pt-8'>
      <div className="w-8/12">
        {/* if user is not authenticated */}
        <div className="w-11/12 mr-2 flex flex-wrap bg-white rounded-[0.5rem] shadow overflow-hidden">
          <div className="bg-[#cb202d] w-full p-2 px-8">
            <h1 className="text-xl title-font font-semibold text-white mb-1">Login or Signup</h1>
          </div>
          <div className="text-gray-400 body-font w-full">
            <div className="flex items-center justify-between">
              <form className="w-1/2 py-12 mx-8 flex flex-col items-stretch" method="POST" action="">
                <div className="relative mb-4">
                  <label htmlFor="username" className="leading-7 text-sm text-gray-400">Email</label>
                  <input type="text" id="username" name="email" placeholder="Enter your email" className="w-full bg-[#f0f5ff] rounded-[0.5rem] text-base outline-none text-gray-400 placeholder:text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
                </div>
                <button className="text-white bg-[#cb202d] border-0 py-2 px-8 focus:outline-none hover:bg-[#9b1823] rounded-[0.5rem] text-lg">Continue</button>
              </form>

              <div className="w-1/2 pl-8">
                <p className="text-[#878787] text-[14px] leading-8">Advantages of our secure login</p>

                <p className="text-[#212121] text-[14px] leading-8 inline-flex items-center">
                  <TruckIcon className={clsx('w-6 text-[#cb202d] mr-2')} /> Easily Track Orders, Hassle free Returns
                </p>
                <p className="text-[#212121] text-[14px] leading-8 inline-flex items-center">
                  <BellAlertIcon className={clsx('w-6 text-[#cb202d] mr-2')} /> Get Relevant Alerts and Recommendation
                </p>
                <p className="text-[#212121] text-[14px] leading-8 inline-flex items-center">
                <StarIcon className={clsx('w-6 text-[#cb202d] mr-2')} /> Wishlist, Reviews, Ratings and more.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* endif */}

        <div className="w-11/12 flex flex-wrap bg-white rounded-lg shadow overflow-hidden {% if not request.user.is_authenticated %} mt-4 {% endif %}">
          <div className="{% if not request.user.is_authenticated %} bg-white {% else %} bg-white {% endif %} w-full p-2 px-8 border-b-gray-100 border-b-[0.01px]">
            <h1 className="text-lg title-font font-semibold {% if not request.user.is_authenticated %} text-gray-400 {% else %} text-[#cb202d] {% endif %}">Delivery Address</h1>
          </div>
          <div className="text-gray-400 body-font w-full">
            <div className="flex items-center justify-between px-8 py-4">
              <p className="text-[#212121] leading-8">{user.address}</p>
              <button className="text-[#cb202d] border-0 py-2 px-8 focus:outline-none rounded-lg text-lg">Change</button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-4/12" id="price-details">
        <div className="flex flex-wrap bg-white rounded-[0.5rem] shadow overflow-hidden">
          <div className="w-full p-2 px-8 border-b-gray-100 border-b-[0.01px]">
            <h1 className="text-base title-font font-semibold text-gray-400 uppercase">Price Details</h1>
          </div>
          <div className="text-gray-400 body-font w-full">
            <div className="flex flex-col">
              <div className="px-8 flex items-center justify-between">
                <p className="text-[#212121] text-[14px] leading-8">Price (<span id="order_count"></span> items)</p>
                <p className="text-[#212121] text-[14px] leading-8" id="order_price"></p>
              </div>
              <div className="px-8 flex items-center justify-between">
                <p className="text-[#212121] text-[14px] leading-8">Delivery Charges</p>
                <p className="text-[#212121] text-[14px] leading-8">₹<span id="delivery_charges"></span></p>
              </div>
            </div>
          </div>
          <div className="bg-[#cb202d] w-full flex items-center justify-between p-2 px-8">
            <h1 className="text-base title-font font-semibold text-white uppercase mb-0">Total Payable</h1>
            <h1 className="text-base title-font font-semibold text-white uppercase mb-0" id="order_total_payable">₹11999</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;