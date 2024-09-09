import { Button } from "../components/Button";
import SVGUser from "../assets/svg/user.svg";
import { useState } from "react";
import Input from "../components/Input";
export const UserCard = () => {
  const [changeable, setChangeable] = useState(false);
  return (
    <div className="flex items-center flex-col min-w-[222px] max-w-[calc(100%-24px)/2]  h-[340px] border-[3px] rounded-lg justify-center gap-3 p-4 ">
      <img
        src={SVGUser}
        alt="user"
        className="w-[50px] opacity-60 rounded-full border-[3px] border-blue-600"
      />
      {changeable ? (
        <>
          <Input
            type="email"
            value=""
            onChange={(e) => console.log(e)}
            label="Email"
            reqiured={true}
          />
          <Input
            type="password"
            value=""
            onChange={(e) => console.log(e)}
            label="Password"
            reqiured={true}
          />
          <Button onClick={() => setChangeable(false)}>Send</Button>
        </>
      ) : (
        <>
          <p className="text-xl font-bebas">Email: UserEmail </p>
          <p className="text-l</>g italic">password: password </p>
          <Button onClick={() => setChangeable(true)}>Change</Button>
        </>
      )}
    </div>
  );
};
