import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductDetail = ({
  product
}: { product: any }) => {
  return (
    <div className="lg:w-full mx-auto flex flex-wrap bg-white p-8 rounded-[0.5rem] shadow mt-4">
      <div className="max-w-[26rem] pt-8">
        <Image
          className="mx-auto w-[26rem] h-[26rem] object-contain mb-[0.75rem]"
          src={`${product?.image_url}`}
          alt={`${product?.name}`}
          width={416}
          height={416}
        />
      </div>
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.brand.name}</h2>
        <h1 className="text-3xl title-font font-semibold text-gray-900 mb-1">{product.name}</h1>
        <div className="flex mb-4">
          <span className="flex items-center">
            <svg fill="#cb202d" stroke="#cb202d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="#cb202d" stroke="#cb202d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="#cb202d" stroke="#cb202d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="#cb202d" stroke="#cb202d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" stroke="#cb202d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span className="text-gray-600 ml-3">4 Reviews</span>
          </span>
        </div>
        <p className="leading-relaxed mb-10">{product.description}</p>
        <div className="flex items-center">
          <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>
          <button id="add-to-cart-button" className="flex ml-auto text-[#cb202d] border border-[#cb202d] py-2 px-4 focus:outline-none rounded">Add to cart</button>
          <Link href={'/checkout'} className="flex ml-4 text-white bg-[#cb202d] border-0 py-2 px-6 focus:outline-none hover:bg-[#9b1823] rounded">Buy Now</Link>
          <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail