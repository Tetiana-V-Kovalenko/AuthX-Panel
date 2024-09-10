import { FC, ReactNode, useEffect, useState } from "react";
import SVGClose from "../assets/svg/close.svg";
type NotificationProps = {
  message: ReactNode;
  isShow: boolean;
  onClose: () => void;
};

export const NotificationMessage: FC<NotificationProps> = ({
  message,
  isShow,
  onClose,
}) => {
  const [show, setShow] = useState(isShow);
  useEffect(() => {
    setShow(isShow);
  }, [isShow]);
  return (
    <div
      className={
        "absolute top-[50%] left-[50%] w-[300px] p-3 h-[150px] -translate-x-[50%] -translate-y-[50%] text-xl z-[10] bg-white  border border-blue-700 rounded-xl flex justify-center items-center " +
        (show ? "block" : "hidden")
      }
    >
      {message}
      <img
        src={SVGClose}
        alt="close"
        onClick={() => {
          setShow(false);
          onClose();
        }}
        className="absolute  top-3 right-3 hover:bg-blue-50 rounded-full p-1"
      />
    </div>
  );
};
