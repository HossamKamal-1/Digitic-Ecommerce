import { AxiosError } from 'axios';
import { ReactNode } from 'react';

type LoadingProps = {
  isFetching: boolean;
  error: AxiosError | undefined;
  children: ReactNode;
  renderLoader: ReactNode;
  renderError?: ReactNode;
};
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
    return <p className="request-error">{error.message}</p>;
  }
  return children;
};

export default Loading;
