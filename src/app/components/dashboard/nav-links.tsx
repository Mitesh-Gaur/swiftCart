'use client';

import {
  BuildingStorefrontIcon,
  UserCircleIcon,
  ShoppingBagIcon,
  ChevronDownIcon,
  ShoppingCartIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import clsx from 'clsx';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useState } from 'react';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {
    name: 'Cart',
    href: '/cart',
    icon: ShoppingCartIcon,
  },
  { name: 'Become a Seller', href: '/customers', icon: BuildingStorefrontIcon },
];

export default function NavLinks() {
  // const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className='flex'>
      <HoverCard openDelay={0} onOpenChange={(open) => setIsHovered(open)}>
        <HoverCardTrigger asChild>
          <div>
            <Link
              key={'login'}
              href={'/auth/login'}
              className={clsx(
                'group flex grow items-center justify-center gap-2 !rounded-[0.5rem] p-3 text-sm font-medium md:flex-none md:justify-start md:py-2 md:px-3',
                isHovered ? 'bg-[#cb202d] !brightness-125' : 'hover:bg-[#cb202d]'
              )}
            >
              <UserCircleIcon className={clsx(
                'w-6 text-[#cb202d] brightness-125',
                isHovered ? 'text-white' : 'group-hover:text-white'
              )} />

              <p className={clsx('hidden md:block',
                isHovered ? 'text-white' : 'group-hover:text-white')}
              >{'Login'}
              </p>

              <ChevronDownIcon className={clsx(
                'w-4',
                isHovered ? 'text-white rotate-180 transition-all' : 'group-hover:text-white transition-all'
              )} />
            </Link>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className='p-0 w-56 origin-top-right divide-y divide-gray-100 rounded-[0.375rem] bg-white shadow focus:outline-none'>
          <Link href="/auth/register" className="text-gray-700 flex items-center justify-between px-4 py-2 text-sm" role="menuitem">
            <p>New Customer?</p>
            <p>Sign up</p>
          </Link>
          <div>
            <Link href="/dashboard/user-profile" className='text-gray-700 flex items-center px-4 py-2 text-sm hover:bg-[#f4f4f2]'>
              <UserCircleIcon className={clsx('w-6 text-[#cb202d] brightness-125 mr-[8px]')} />
              My Profile
            </Link>
            <Link href="/dashboard/my-orders" className='text-gray-700 flex items-center px-4 py-2 text-sm hover:bg-[#f4f4f2]'>
              <ShoppingBagIcon className={clsx('w-6 text-[#cb202d] brightness-125 mr-[8px]')} />
              Orders
            </Link>
            <Link href="#" className='text-gray-700 flex items-center px-4 py-2 text-sm hover:bg-[#f4f4f2]'>
              <HeartIcon className={clsx('w-6 text-[#cb202d] brightness-125 mr-[8px]')} />
              Wishlist
            </Link>
          </div>
        </HoverCardContent>
      </HoverCard>

      {links.map((link) => {
        const LinkIcon = link.icon;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3',
            )}
          >
            <LinkIcon className="w-6 text-[#cb202d] brightness-125" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
