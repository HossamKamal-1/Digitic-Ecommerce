import { isRouteErrorResponse, useRouteError } from "react-router-dom";

function Error() {
  console.log("Error page rendered");
  const error = useRouteError();
  let status: number = 404;
  let message: string = "Page not found";
  if (isRouteErrorResponse(error)) {
    status = error.status;
    message = error.statusText;
  }
  console.log(error);
  return (
    <div>
      Error
      {status}
      {message}
    </div>
  );
}

export default Error;
