'use client';

import { AdjustmentsHorizontalIcon, ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetcher } from "../fetcher";
import { setUser } from "@/lib/slices/user.slice";
import { HelloCustomer, ManageAddress, ProfileInfo, ProfileSidebar } from "@/app/components/profile";
import isAuth from "@/lib/hoc/isAuth";

function Page({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const router = useRouter();

  const dispatch = useAppDispatch();

  const getLatestUserData = async () => {
    const userData = await fetcher('/api/auth/users/me');
    dispatch(setUser(userData));
  }

  useEffect(() => {
    getLatestUserData();
  }, [])

  const user: any = useAppSelector((state) => state?.user?.user);

  const handleBack = () => {
    router.back();
  };

  return (
    <div className='max-w-[1260px] mx-auto'>
      <div className="flex items-center mb-4">
        <button
          onClick={handleBack}
          className="text-[#cb202d] py-2 rounded flex items-center"
        >
          <ArrowLeftIcon className={clsx('w-6 text-[#cb202d] mr-2')} /> Back
        </button>
      </div>

      <div className="flex">
        <div className="w-3/12 pr-4">
          <HelloCustomer user={user} />
          <ProfileSidebar user={user} activeTab={activeTab} onTabClick={(tabName:string) => setActiveTab(tabName) } />
        </div>

        <div className="w-8/12">
          {activeTab == 'profile' ? (<ProfileInfo user={user} />) : null}
          {activeTab == 'manageAddress' ? (<ManageAddress user={user} />) : null}
        </div>
      </div>
    </div>
  );
}

export default isAuth(Page);