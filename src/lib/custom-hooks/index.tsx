import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../hooks";

const useAuth = () => {
  const router = useRouter();
  const token = useAppSelector((state) => state?.user?.token)

  useEffect(() => {
    if (!!token) {
      router.push("/"); // Redirect to the homepage or desired page if user is logged in
    }
  }, [token, router]);

  return { token };
};

export default useAuth;
