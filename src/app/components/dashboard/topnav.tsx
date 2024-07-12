import Link from 'next/link';
import { PowerIcon } from '@heroicons/react/24/outline';
import NavLinks from './nav-links';
import SearchBox from './search-box';
import clsx from 'clsx';

export default function TopNav() {
  return (
    <div className="max-w-full px-3 py-4 md:px-2 bg-white">
      <div className='max-w-[1260px] mx-auto flex items-center'>
        <div className='flex items-center justify-between flex-grow'>
          <Link
            href="/"
          >
              <PowerIcon className={clsx(
                'w-6 text-[#cb202d] brightness-125',
              )} />
          </Link>

          <SearchBox placeholder='Search for Products, Brands and More' />
        </div>

        <div className="flex flex-row justify-between">
          <NavLinks />
        </div>
      </div>
    </div>
  );
}
