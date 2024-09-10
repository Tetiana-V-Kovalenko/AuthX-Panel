import { EMAIL_REGEX } from "../constants/regex";
import { validatePassword } from "./validatePassword";

export const validateUserData = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  if (!EMAIL_REGEX.test(email)) {
    return false;
  }
  if (!validatePassword(password)) {
    return false;
  }
  return true;
};
