import BasicRequestHandler from "../Communication/BasicRequestHandler";
import ValidateDeviceAccess from "./ValidateDeviceAccess";

export default async (currentPassword, newPassword, accessCode) => {
  // Confirm access code
  await ValidateDeviceAccess(accessCode, currentPassword);

  const requestMessage = {
    type: 7,
    password: newPassword,
  };

  await BasicRequestHandler(requestMessage);
};
