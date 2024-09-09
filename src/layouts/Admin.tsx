import { useNavigate } from "react-router-dom";
import { UserCard } from "./UserCard";
import { useEffect } from "react";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login", { replace: true });
  }, []);
  return (
    <section className="w-[100vw] h-[100vh] flex items-center justify-center bg-blue-100">
      <div className="w-[75%] bg-white h-full px-[90px] py-[90px] flex gap-[20px] justify-center flex-wrap">
        <UserCard />
      </div>
    </section>
  );
};
export default Admin;
