import { FC, useEffect, useState } from "react";
import Input from "../components/Input";
import { NavBar } from "./NavBar";
import { Button } from "../components/Button";
import { NotificationMessage } from "../components/Notification";
import { loginUser } from "../service/loginUser";
import { validateUserData } from "../utils.ts/validateUserData";
import { registrateUser } from "../service/registrateUser";
import { useNavigate } from "react-router-dom";
import { TResponse } from "../types/response";
type FormProps = {
  page: "registration" | "login";
};

const FormAuth: FC<FormProps> = ({ page }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [response, setResponse] = useState<null | TResponse>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (page === "registration" && response && response.status === "success") {
      navigate("/login", { replace: true });
    }
    if (page === "login" && response && response.status === "success") {
      localStorage.setItem("currentUser", JSON.stringify(response.user));
      navigate("/", { replace: true });
    }
  }, [response]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateUserData({ email, password })) {
      setResponse({
        status: "error",
        message: "Your data is invalid.",
        user: null,
      });
    } else {
      const res =
        page === "login"
          ? await loginUser({ email, password })
          : await registrateUser({ email, password });
      setResponse(res);
    }
    setEmail("");
    setPassword("");
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
      <form
        onSubmit={handleSubmit}
        className="w-[50%] max-w-[518px] h-[600px] bg-white border border-blue-500 rounded-lg mx-auto p-[92px]  flex flex-col justify-between gap-3 "
      >
        <NavBar />
        <h1 className="text-xl capitalize text-center text-blue-400 font-bold mb-4">
          {page} Form
        </h1>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e)}
          label="Email"
          reqiured={true}
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e)}
          label="Password"
          reqiured={true}
        />
        <div className="pt-[30px]">
          <Button type="submit" disabled={!email || !password}>
            {page === "registration" ? "Sign up" : "Login"}
          </Button>
        </div>
      </form>
    </section>
  );
};
export default FormAuth;
