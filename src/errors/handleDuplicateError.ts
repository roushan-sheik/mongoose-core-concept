/* eslint-disable @typescript-eslint/no-explicit-any */
const handleDuplicateError = (err: any) => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSource = [
    {
      path: "",
      message: `${extractedMessage} already Exists.`,
    },
  ];
  return errorSource;
};
export default handleDuplicateError;
