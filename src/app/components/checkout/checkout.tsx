import clsx from "clsx";
import { BellAlertIcon, TruckIcon, StarIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { setNewCart, setOrderCart } from "@/lib/slices/user.slice";
import PriceDetails from "../price-details";

const Checkout = ({
  user,
  onAddressChangeClick,
  onPlaceOrderClick
}: any) => {
  const orderCart = useAppSelector(state => state.user.orderCart || [])?.toReversed();
  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const removeItemFromCart = (productId: any) => {
    let updatedCart = orderCart.filter((item: any) => item.id !== productId).toReversed();
    dispatch(setOrderCart(updatedCart));
    dispatch(setNewCart(updatedCart));
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

      <div className="mx-auto flex">
        <div className="w-8/12">
          {/* if user is not authenticated */}
          {!user?.id ? (
            <div className="w-11/12 mr-2 flex flex-wrap bg-white rounded-[0.5rem] shadow overflow-hidden">
              <div className="bg-[#cb202d] w-full p-2 px-8">
                <h1 className="text-xl title-font font-semibold text-white mb-1">Login or Signup</h1>
              </div>
              <div className="text-gray-400 body-font w-full">
                <div className="flex items-center justify-between">
                  <form className="w-1/2 py-12 mx-8 flex flex-col items-stretch" method="POST" action="">
                    <div className="relative mb-4">
                      <label htmlFor="email" className="leading-7 text-sm text-gray-400">Email</label>
                      <input type="text" id="email" name="email" placeholder="Enter your email" className="w-full bg-[#f0f5ff] rounded-[0.5rem] text-base outline-none text-gray-400 placeholder:text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
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
            </div>) : null}
          {/* endif */}

          <div className={clsx("w-11/12 flex flex-wrap bg-white rounded-lg shadow overflow-hidden", !user?.id && "mt-4")}>
            <div className="{% if not request.user.is_authenticated %} bg-white {% else %} bg-white {% endif %} w-full p-2 px-8 border-b-gray-100 border-b-[0.01px]">
              <h1 className="text-lg title-font font-semibold {% if not request.user.is_authenticated %} text-gray-400 {% else %} text-[#cb202d] {% endif %}">Delivery Address</h1>
            </div>
            <div className="text-gray-400 body-font w-full">
              <div className="flex items-center justify-between px-8 py-4">
                <p className="text-[#212121] leading-8">{user?.address}</p>
                <button onClick={onAddressChangeClick} className="text-[#cb202d] border-0 py-2 px-8 focus:outline-none rounded-lg text-lg">Change</button>
              </div>
            </div>
          </div>

          <div className="w-11/12 flex flex-wrap bg-white rounded-lg shadow overflow-hidden my-4">
            <div className="{% if not request.user.is_authenticated %} bg-white {% else %} bg-white {% endif %} w-full p-2 px-8 border-b-gray-100 border-b-[0.01px]">
              <h1 className="text-lg title-font font-semibold {% if not request.user.is_authenticated %} text-gray-400 {% else %} text-[#cb202d] {% endif %}">Order Summary</h1>
            </div>

            <div className={clsx("w-full px-4", user?.id && "pt-4")}>
              {/* if the order cart length is empty */}
              {orderCart?.length === 0 ? (
                <div className="flex flex-col w-1/2 pb-3" id="product-card">
                  <p className="text-[#212121] text-base leading-4 font-medium">Your checkout has no items</p>
                </div>
              ) : null}
              {/* endif */}

              {orderCart?.length > 0 ? (
                orderCart?.map((product: any, index: number) => {
                  return <div
                    className={clsx("flex flex-col w-1/2 border border-b-0 border-gray-200 rounded-lg overflow-hidden ml-4",
                      index == orderCart?.length ? "mb-0" : "mb-4",
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
                })
              ) : null}

            </div>

            <div className={clsx("w-full my-4 px-8", orderCart?.length <= 0 && "hidden")} id="place-order-button-wrapper">
              <button onClick={onPlaceOrderClick} className="text-white bg-[#cb202d] border-0 py-2 px-8 focus:outline-none hover:bg-[#9b1823] rounded-lg text-lg mb-4">Place Order</button>
            </div>
          </div>
        </div>

        <PriceDetails isOrderCart />
      </div>
    </div>
  );
}

export default Checkout;