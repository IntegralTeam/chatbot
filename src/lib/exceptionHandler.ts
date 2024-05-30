export const transformBackendErrorToString = (e: any) => {
  if (e?.response?.data?.message) {
    return e.response.data.message as string;
  }

  return e.message as string;
};

export const exceptionHandler = (exception: unknown) => {
  let message = '';
  if (exception instanceof Error) {
    message = transformBackendErrorToString(exception);
  }

  if (typeof exception === 'string') {
    message = exception;
  }

  // eslint-disable-next-line no-console
  console.error(message);

  return message
};
