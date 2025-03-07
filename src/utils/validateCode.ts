import { faultCode } from "./faultCode";

export const validateCode = (code: string): boolean => {
  // Make sure code is defined and is a string
  if (code === undefined || code === null || typeof code !== 'string') {
    console.error("Invalid code parameter provided to validateCode function");
    return false; // Cannot validate undefined code
  }
  
  // Make sure faultCode is defined and is an array
  if (!faultCode || !Array.isArray(faultCode)) {
    console.error("faultCode is not properly defined or imported");
    return false; // Cannot detect faults without the fault patterns
  }
  
  // Check if the code contains any of the fault patterns
  for (const fault of faultCode) {
    if (fault && typeof fault === 'string' && code.includes(fault)) {
      return true; // Found a malicious pattern
    }
  }
  
  return false; // No malicious patterns found
};
