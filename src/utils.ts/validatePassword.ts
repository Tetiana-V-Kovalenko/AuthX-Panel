export const validatePassword = (password: string) => {

  if (password.length < 6 || password.length > 20) {
    return false;
  }

  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const noSpecialAtBounds =
    /^[a-zA-Z\d][a-zA-Z\d!@#$%^&*(),.?":{}|<>]*[a-zA-Z\d]$/.test(password);

  return (
    hasLowercase &&
    hasUppercase &&
    hasNumber &&
    hasSpecialChar &&
    noSpecialAtBounds
  );
};
