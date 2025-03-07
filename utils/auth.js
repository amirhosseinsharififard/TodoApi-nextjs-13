import {compare, hash} from "bcryptjs";

const hashPassword = async (password) => {
  const hashedPasswrod = await hash(password, 12);
  console.log(hashedPasswrod);
  return hashedPasswrod;
};

const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  console.log(isValid);

  return isValid;
};

export {verifyPassword, hashPassword};
