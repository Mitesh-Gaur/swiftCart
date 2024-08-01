import { ArrowLeftStartOnRectangleIcon, HeartIcon, ShoppingBagIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

const ProfileSidebar = ({
  user,
  onTabClick,
  activeTab
}: any) => {

  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <a className="flex text-gray-900 border-b-[0.1px] border-b-gray-100 p-6 py-3" href="/orders">
        <ShoppingBagIcon className={clsx('w-6 text-[#cb202d] brightness-125 mr-[24px]')} />
        <p className="uppercase text-gray-600"><strong>My orders</strong></p>
      </a>

      <div className="flex flex-col text-gray-900 border-b-[0.1px] border-b-gray-100 py-3 relative">
        <div className="flex px-6 pb-1">
          <UserCircleIcon className={clsx('w-6 text-[#cb202d] brightness-125 mr-[24px]')} />
          <p className="uppercase text-gray-600"><strong>Account Settings</strong></p>
        </div>
        <div className={clsx("py-6 w-full transition-all absolute top-[0] left-[0] z-[2] bg-[#f4f4f2]", activeTab === "profile" ? "translate-y-[2.5rem]" : "translate-y-[5.5rem]")} />
        <a className={clsx("py-3 transition-all pl-[4.475rem] z-[3]", activeTab =="profile" ? "text-[#cb202d]": "text-gray-600")} onClick={() => onTabClick("profile")} role="button">
          <p className="capitalize">Profile Information</p>
        </a>
        <a className={clsx("py-3 transition-all pl-[4.475rem] z-[3]", activeTab =="manageAddress" ? "text-[#cb202d]": "text-gray-600")} onClick={() => onTabClick("manageAddress")} role="button">
          <p className="capitalize">Manage Addresses</p>
        </a>
      </div>

      <div className="flex text-gray-900 border-b-[0.1px] border-b-gray-100 p-6 py-3">
        <HeartIcon className={clsx('w-6 text-[#cb202d] brightness-125 mr-[24px]')} />
        <p className="uppercase text-gray-600"><strong>My Wishlist</strong></p>
      </div>

      <div className="flex text-gray-900 p-6 py-3">
        <ArrowLeftStartOnRectangleIcon className={clsx('w-6 text-[#cb202d] brightness-125 mr-[24px]')} />
        <p className="uppercase text-gray-600"><strong>Logout</strong></p>
      </div>
    </div>
  );
}

export default ProfileSidebar;