import BasicRequestHandler from "../Communication/BasicRequestHandler";

export default async () => {
  const requestMessage = {
    type: 1,
  };

  await BasicRequestHandler(requestMessage);
};
