import { baseUrl } from "@/app/auth/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Category() {

  const [categories, setCategories] = useState<[]>([]);

  // useEffect(() => {
  //   getCategories();
  // }, [])

  const getCategories = async () => {
    const response = await fetch(`${baseUrl}/api/getCategories/`);
    const categories = await response.json();
    console.log("categories: ", categories)
    setCategories(categories)
    return categories
  }

  const { isPending, error, data } = useQuery({
    queryKey: ['categoryData'],
    queryFn: () => getCategories(),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className='bg-white !rounded-[0.5rem] shadow-sm p-6 mb-6'>
      <div className="flex items-center justify-evenly flex-wrap">
        {data?.map((category: any) => {
          return (
            <Link href={`/category/${category?.id}`} key={category?.id}>
              <img className="mx-auto w-[5.62500rem] h-[4rem] object-contain mb-[0.75rem]" src={`${category.image_url}`} alt={`${category.name}`} />
              <span className="block text-center font-medium text-[#cb202d]">{category.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  );
}