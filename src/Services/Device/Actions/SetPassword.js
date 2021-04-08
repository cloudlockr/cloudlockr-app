import BasicRequestHandler from "../Communication/BasicRequestHandler";

export default async (newPassword) => {
  const requestMessage = {
    type: 7,
    password: newPassword,
  };

  await BasicRequestHandler(requestMessage);
};
