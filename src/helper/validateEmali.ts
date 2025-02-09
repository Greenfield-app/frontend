const validateEmail = (email: string): boolean => {
  const pattern =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
  return pattern.test(email);
};
export { validateEmail };
