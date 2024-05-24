import { RequestError } from "@custom-types/shared";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ReactNode } from "react";

type LoadingProps = {
  isFetching: boolean;
  error: RequestError;
  children: ReactNode;
  renderLoader: ReactNode;
  renderError?: ReactNode;
};

function isFetchBaseQueryError(
  error: Exclude<RequestError, undefined>
): error is FetchBaseQueryError {
  return "status" in error;
}
const Loading = ({
  isFetching,
  children,
  error,
  renderLoader,
}: LoadingProps) => {
  if (isFetching) {
    return renderLoader;
  }
  if (error) {
    if (isFetchBaseQueryError(error)) {
      return <p className="request-error">{error.status}</p>;
    } else {
      return <p className="request-error">{error.message || error.name}</p>;
    }
  }
  return children;
};

export default Loading;
