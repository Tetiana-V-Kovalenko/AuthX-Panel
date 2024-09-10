import { FC, useEffect, useState } from "react";

import SVGEyeOff from "/src/assets/svg/eye_off.svg";
import SVGEyeOn from "/src/assets/svg/eye_on.svg";
import { EMAIL_REGEX } from "../constants/regex";
import { validatePassword } from "../utils.ts/validatePassword";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  type: "text" | "password" | "email";
  label: string;
  reqiured?: boolean;
};

const Input: FC<InputProps> = ({
  value: initialValue,
  onChange,
  type = "text",
  label,
  reqiured = false,
}) => {
  const [value, setValue] = useState(initialValue);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [touched, setTouched] = useState<boolean>(false);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setValue(e.target.value);
  };

  return (
    <div className="h-[84px]">
      <div className="relative mt-3 w-full">
        {type === "password" && (
          <div
            className={
              "absolute top-[calc(100%/2)] -translate-y-[50%] right-[15px] group  "
            }
            onClick={() => {
              setPasswordVisible((prev) => !prev);
            }}
          >
            <img
              src={passwordVisible ? SVGEyeOff : SVGEyeOn}
              alt="Toggle Password Visibility"
            />
            <span
              className={
                "hidden group-hover:inline-block absolute top-5 -left-[125px] bg-white w-[250px] font-extralight rounded-lg p-4 border border-blue-500 "
              }
            >
              {type === "password" &&
                "Your password shoud be min length 6, max length 20. At least 1 small letter, 1 capital letter, 1 number, 1 special character. A special character cannot be at the beginning and at the end"}
            </span>
          </div>
        )}
        <input
          required={reqiured}
          value={value}
          onChange={handleChange}
          onBlur={(e) => {
            if (type === "email") {
              setIsValid(EMAIL_REGEX.test(e.target.value));
            } else if (type === "password") {
              setIsValid(validatePassword(e.target.value));
            }
            setTouched(true);
          }}
          type={passwordVisible ? "text" : type ? type : "text"}
          className={`text-black   border-2 peer block w-full appearance-none rounded-xl  ${
            isValid ? "border-blue-400  " : "border-red-400"
          } px-0 py-[14px] pl-6 text-sm focus:border-blue-800 focus:outline-none focus:ring-0`}
        />
        <label
          className={`absolute pointer-events-none top-4 left-6  ${
            isValid ? "text-blue-600  " : "text-red-400"
          }  text-sm bg-white duration-300 transform -translate-y-6 transparent peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 peer-focus:px-[4px] peer-focus:text-blue-900 peer-focus:transparent`}
        >
          {label}
        </label>
      </div>
      {!isValid ? (
        <p className="text-red-600 font-light text-[smaller] group ">
          Please enter a valid {type}.
        
        </p>
      ) : (
        value === "" &&
        reqiured &&
        touched && (
          <p className="text-red-600 font-light text-[smaller]">
            Please enter reqiered {type}.
          </p>
        )
      )}
    </div>
  );
};

export default Input;
