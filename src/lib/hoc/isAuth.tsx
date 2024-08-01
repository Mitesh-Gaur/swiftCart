// isAuth.tsx

"use client";
import { useEffect, useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import { useAppSelector } from "../hooks";


export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const token = useAppSelector((state) => state?.user?.token)

    useLayoutEffect(() => {
      if (!token) {
        return redirect("/");
      }
    }, []);


    if (!token) {
      return null;
    }

    return <Component {...props} />;
  };
}