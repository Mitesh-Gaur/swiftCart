import Image from "next/image";
import Link from "next/link";

export default function ProductList({ 
  products
}: { products: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product: any, index) => (
        <Link
          href={`/product-detail/${product?.id}`}
          key={product?.id}
          className='bg-white rounded-[0.5rem] shadow p-6'
        >
          <Image
            className="mx-auto w-[19.5rem] h-[19.5rem] object-contain mb-[0.75rem]"
            src={`${product.image_url}`}
            alt={`${product.name}`}
            width={416}
            height={416}
          />
          <span className="block text-center text-base font-semibold text-gray-900 mb-[0.25rem]">{product.name}</span>
          <span className="block text-center text-base text-gray-900 mb-[0.75rem]">₹ {product.price}</span>
        </Link>
      ))}
    </div>
  )
}