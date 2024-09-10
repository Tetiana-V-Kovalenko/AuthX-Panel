import { Button } from "../components/Button";
import SVGUser from "../assets/svg/user.svg";
import { useState } from "react";
import Input from "../components/Input";
import { TUser } from "../types/user";
export const UserCard = ({
  user = { email: "", password: "" },
  onChangeData,
}: {
  user?: TUser;
  onChangeData: (user: TUser) => void;
}) => {
  const [changeable, setChangeable] = useState(false);
  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string>(user.password);
  const handleSendClick = () => {
    onChangeData({ email, password });
    setChangeable(false);
  };
  return (
    <div className="flex items-center flex-col min-w-[222px] max-w-[calc(100%-24px)/2]  h-[340px] border-[3px] rounded-lg justify-center gap-4 p-4 ">
      <img
        src={SVGUser}
        alt="user"
        className="w-[50px] opacity-60 rounded-full border-[3px] border-blue-600"
      />
      {changeable ? (
        <>
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
          <Button onClick={handleSendClick}>Send</Button>
        </>
      ) : (
        <>
          <p className="text-xl font-bebas">Email: {user.email} </p>
          <p className="text-lg  ">password: {user.password} </p>
          <Button onClick={() => setChangeable(true)}>Change</Button>
        </>
      )}
    </div>
  );
};
