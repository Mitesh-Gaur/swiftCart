import React from "react";
import { useForm } from "react-hook-form";
import { AuthActions, baseUrl } from "@/app/auth/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hooks";
import { setAuthToken, setUser } from "@/lib/slices/user.slice";
import useSWR, { mutate } from "swr";
import { fetcher } from "../fetcher";
import useAuth from "@/lib/custom-hooks";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const router = useRouter();
  const dispatch = useAppDispatch()

  const { login, storeToken } = AuthActions();

  // Use custom hook to check if user is logged in
  useAuth();

  const onSubmit = async (data: FormData) => {
    try {
      const response:any = await login(data.email, data.password).json();
      storeToken(response.access, "access");
      storeToken(response.refresh, "refresh");
      dispatch(setAuthToken(response.access));
      // Revalidate user data after login and store it in Redux
      // Fetch user data and store it in Redux
      const userData = await fetcher('/api/auth/users/me');
      dispatch(setUser(userData));
      console.log("updatedUser", userData);
      router.push("/"); // Redirect to the homepage or desired page after login
    } catch (err:any) {
      console.log("error->", err);
      setError("root", { type: "manual", message: err?.json?.detail });
    }
  };

  return (
    <div className="container py-12 mx-auto flex flex-wrap items-center text-gray-400">
      <div className="mx-auto lg:w-1/3 md:w-1/2 bg-white rounded-[0.5rem] shadow-md p-8 flex flex-col w-full mt-10 md:mt-0">
        <h2 className="text-[#cb202d] text-lg font-bold title-font">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col">
          <div>
            <label className="block leading-7 text-sm text-gray-400" htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              className="w-full bg-[#f0f5ff] rounded-[0.5rem] text-base outline-none text-gray-400 placeholder:text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {errors.email && (
              <span className="text-xs text-red-600">Email is required</span>
            )}
          </div>
          <div className="mt-4">
            <label className="block leading-7 text-sm text-gray-400" htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
              {...register("password", { required: true })}
              className="w-full bg-[#f0f5ff] rounded-[0.5rem] text-base outline-none text-gray-400 placeholder:text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {errors.password && (
              <span className="text-xs text-red-600">Password is required</span>
            )}
          </div>
          <button className="text-white bg-[#cb202d] border-0 py-2 px-8 mt-4 focus:outline-none hover:bg-[#9b1823] rounded-[0.5rem] text-lg">Submit</button>
          {errors.root && (
            <span className="text-xs text-red-600">{errors.root.message}</span>
          )}
        </form>
        <div className="flex items-center justify-between mt-4">
            <p className="text-xs">
              New to SwiftCart? <Link href="/auth/register" className="text-[#cb202d] font-bold">Create an account</Link>
            </p>

            <Link
              href="/auth/password/reset-password"
              className="text-xs text-[#cb202d] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
      </div>
    </div>
  );
};

export default Login;