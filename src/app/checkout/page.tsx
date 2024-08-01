// src/app/checkout/page.tsx

"use client";

import {Checkout} from "@/app/components/checkout";
import { setUser } from "@/lib/slices/user.slice";
import { useEffect, useState } from "react";
import { fetcher } from "@/app/fetcher";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Modal from "../components/Modal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { AuthActions } from "../auth/utils";

type FormData = {
  address: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { defaultValues, errors },
    setError,
    watch
  } = useForm<FormData>();

  const { updateProfile } = AuthActions();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const getLatestUserData = async () => {
    const userData = await fetcher('/api/auth/users/me');
    dispatch(setUser(userData));
  }

  useEffect(() => {
    getLatestUserData();
  }, [])

  const token = useAppSelector((state) => state?.user?.token);
  const user:any = useAppSelector((state) => state?.user?.user);

  const onSubmit = async (data: FormData) => {
    try {
      const profileData = {
        data
      }
      if(!token) {return;}
      console.log("token", token);
      const apiResponse:any = await updateProfile(token, user?.id, profileData).json();
      console.log("apiResponse", apiResponse.message); // Access the message from the response
      setIsModalOpen(false);
      getLatestUserData();
    } catch (err: any) {
      console.log("error->", err);
      setError("root", { type: "manual", message: err?.json?.detail });
    }
    // try {
    //   const response:any = await login(data.email, data.password).json();
    //   const userData = await fetcher('/api/auth/users/me');
    //   dispatch(setUser(userData));
    // } catch (err:any) {
    //   console.log("error->", err);
    //   setError("root", { type: "manual", message: err?.json?.detail });
    // }
  };

  const address = watch("address");

  return (
    <main>
      <Checkout user={user} onAddressChangeClick={() => setIsModalOpen(true)} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} modalContainerStyle={'!p-0 !rounded overflow-hidden'} showCustomClose>
        <div className="filterHeader flex items-center justify-between py-6 px-5 border-b border-gray-300">
          <h1>Edit address</h1>

          <button onClick={() => setIsModalOpen(false)}>
            <XMarkIcon className={clsx('w-6 text-[#cb202d] mr-2')} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col px-5">
          <div>
            <label className="block leading-7 text-sm text-gray-400" htmlFor="address">Address</label>
            <input
              type="text"
              placeholder="Enter your address here"
              {...register("address", { required: true })}
              className="w-full bg-[#f0f5ff] rounded-[0.5rem] text-base outline-none text-gray-400 placeholder:text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {errors.address && (
              <span className="text-xs text-red-600">Address is required</span>
            )}
          </div>

          <div className="filterFooter py-4 text-right flex items-center ml-auto">
            <button
              role="button"
              type="button"
              className="text-white bg-[#cb202d] border-0 py-2 px-4 mt-4 focus:outline-none hover:bg-[#9b1823] rounded-[0.5rem] sm:w-auto sm:text-sm"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>

            <button
              disabled={!address}
              className={clsx('text-white bg-[#cb202d] disabled:text-gray-600 disabled:bg-gray-200 border-0 py-2 px-4 mt-4 focus:outline-none hover:bg-[#9b1823] rounded-[0.5rem] sm:w-auto sm:text-sm ml-2')}
            >
              Submit
            </button>
          </div>
          {errors.root && (
            <span className="text-xs text-red-600">{errors.root.message}</span>
          )}
        </form>
      </Modal>
    </main>
  );
}
