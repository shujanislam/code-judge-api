import { faultCode } from "./faultCode";

export const validateCode = (code: string): boolean => {
  for (const fault of faultCode) {
    if (code.includes(fault)) {
      return true;
    }
  }
  return false;
};
