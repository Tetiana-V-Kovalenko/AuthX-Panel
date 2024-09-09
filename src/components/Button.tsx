import { FC, MouseEventHandler, ReactNode } from "react";

type BtnProps = {
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
export const Button: FC<BtnProps> = ({
  children,
  disabled,
  className,
  type = "button",
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={
        className
          ? className
          : " w-full disabled:bg-blue-300 uppercase bg-blue-700 text-white text-center py-3 font-bebas hover:bg-blue-600 rounded-lg active:bg-blue-800"
      }
    >
      {children}
    </button>
  );
};
