import BasicRequestHandler from "../Communication/BasicRequestHandler";

export default async (hexCode, devicePassword) => {
  const requestMessage = {
    type: 2,
    password: devicePassword,
    hex: hexCode,
  };

  await BasicRequestHandler(requestMessage);
};
