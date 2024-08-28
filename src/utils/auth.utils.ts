import bcryptjs from "bcryptjs";

export const isPasswordMatch = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  const isMatch = await bcryptjs.compare(plainPassword, hashedPassword);
  return isMatch;
};
