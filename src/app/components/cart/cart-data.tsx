import React from 'react'
import { useAppDispatch } from '@/lib/hooks';
import { setNewCart } from '@/lib/slices/user.slice';
import clsx from 'clsx';
import Link from 'next/link';
import PriceDetails from '../price-details';

function CartData({ cart, user, onProceedToCheckout }: { cart: any, user: any, onProceedToCheckout: () => void }) {
  const dispatch = useAppDispatch();

  const removeItemFromCart = (productId: any) => {
    let updatedCart = cart.filter((item: any) => item.id !== productId).toReversed();
    dispatch(setNewCart(updatedCart));
  }

  return (
    <div className='mx-auto flex'>
      <div className="w-8/12">
        <div className="w-11/12 flex flex-wrap bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-white w-full p-2 px-8 border-b-gray-100 border-b-[0.01px]">
            <h1 className={clsx("text-lg title-font font-semibold mb-1", !!user.id ? "text-[#cb202d]" : "text-gray-400")}>Your Cart</h1>
          </div>

          <div className="w-full px-8{% if request.user.is_authenticated %} pt-4{% endif %}" id="orderSummary">

            {cart?.length == 0 ? <div className="flex flex-col w-1/2 px-8 py-4">
              <p className="text-[#212121] text-base leading-4 font-medium">Your cart has no items</p>
            </div> : null}

            {cart?.length > 0 ? cart?.map((product: any, index: number) => {
              return <div
                className={clsx("flex flex-col w-1/2 border border-b-0 border-gray-200 rounded-lg overflow-hidden ml-8",
                  index == cart?.length ? "mb-0" : "mb-4",
                  index == 0 && "mt-4"
                )}
              >
                <div className="flex border-b-[0.1px] border-b-gray-200 py-4">
                  <Link href={`/product-detail/${product?.id}`} className="pl-8">
                    <img className="w-[5.5rem] h-[5.5rem] max-w-[5.5rem] max-h-[5.5rem] object-contain" src={product.image_url} alt={product.name} />
                  </Link>
                  <div className="pl-4">
                    <Link
                      className="text-[#212121] hover:text-[#cb202d] text-base leading-4 font-medium"
                      href={`/product-detail/${product?.id}`}
                    >
                      {product.name}
                    </Link>
                    <p className="text-[#212121] text-base leading-4 font-semibold">{product.price}</p>
                  </div>
                </div>
                <button className="text-base font-medium text-black py-1 bg-gray-200 rounded-b-lg" onClick={() => removeItemFromCart(product.id)}>Remove</button>
              </div>
            }) : null}
          </div>
        </div>

        <div className={clsx("w-full mt-4", cart?.length <= 0 && "hidden")} id="place-order-button">
          <button
            onClick={onProceedToCheckout}
            className="text-white bg-[#cb202d] border-0 py-2 px-8 focus:outline-none hover:bg-[#9b1823] rounded-lg text-lg mb-4"
          >
            Proceed to checkout
          </button>
        </div>
      </div>

      <PriceDetails />
    </div>
  )
}

export default CartData;