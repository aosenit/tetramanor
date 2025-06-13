import { useRouter } from "next/navigation";

const useLogOut = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return { handleLogout };
};

export default useLogOut;
