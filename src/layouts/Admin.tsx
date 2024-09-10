import { useEffect, useState } from "react";
import { UserCard } from "./UserCard";
import { getAllUsers } from "../service/getAllUsers";
import { TUser } from "../types/user";
import { NotificationMessage } from "../components/Notification";
import { TResponse } from "../types/response";
import { validateUserData } from "../utils.ts/validateUserData";
import { updateUserData } from "../service/updateUserData";

const Admin = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser") ?? "null");
  const [response, setResponse] = useState<null | TResponse>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers.users);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };
    fetchUsers();
  }, [response]);

  const currentUserData = users?.find(
    (user) => user.email === currentUser?.email
  );
  const handleChangeData = async (data: TUser) => {
    if (!validateUserData(data)) {
      setResponse({
        status: "error",
        message: "Your new data is invalid",
        user: null,
      });
    } else if (!currentUserData) {
      setResponse({
        status: "error",
        message:
          users.length === 0
            ? "Cache storage time has expired, register again"
            : "Sorry something go wrong",
        user: null,
      });
    } else if (currentUserData) {
      const response = await updateUserData({
        email: currentUserData.email,
        password: currentUserData.password,
        new_email: data.email,
        new_password: data.password,
      });
      setResponse(response);
      if (response.status === "success") {
        localStorage.setItem("currentUser", JSON.stringify(response.user));
      }
    }
  };
  return (
    <section className="w-[100vw] h-[100vh] flex items-center justify-center bg-blue-100">
      {response !== null && response.status === "error" ? (
        <NotificationMessage
          message={response.status === "error" ? response.message : ""}
          isShow={response.status === "error" ? true : false}
          onClose={() => {
            setResponse(null);
          }}
        />
      ) : null}
      <div className="w-[75%] bg-white h-full px-[90px] py-[90px] flex gap-[20px] justify-center flex-wrap">
        {users?.find((user) => user.email === currentUser?.email) !==
          undefined && (
          <UserCard
            user={users?.find((user) => user.email === currentUser?.email)}
            onChangeData={handleChangeData}
          />
        )}
      </div>
    </section>
  );
};

export default Admin;
