import { FC, useState } from "react";
import Input from "../components/Input";
import { NavBar } from "./NavBar";
import { Button } from "../components/Button";
import { NotificationMessage } from "../components/Notification";
type FormProps = {
  page: "registration" | "login";
};

const FormAuth: FC<FormProps> = ({ page }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [notification, setNotification] = useState<null | string>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification("snt");
  };
  return (
    <section className="w-[100vw] h-[100vh] flex items-center justify-center bg-blue-100">
      <NotificationMessage
        message={notification ?? ""}
        isShow={typeof notification === "string" ? true : false}
        onClose={() => {
          setNotification(null);
        }}
      />
      <form className="w-[50%] max-w-[518px] h-[518px] bg-white border border-blue-500 rounded-lg mx-auto p-[92px]  flex flex-col justify-between gap-3 ">
        <NavBar />
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
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!email || !password}
          >
            {page === "registration" ? "Sign up" : "Login"}
          </Button>
        </div>
      </form>
    </section>
  );
};
export default FormAuth;
