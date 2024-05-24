import { Outlet } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import FILTERS_SEARCH_PARAMS from "./searchParams";

function QueryParamsManager() {
  return (
    <QueryParamProvider
      adapter={ReactRouter6Adapter}
      options={{
        params: FILTERS_SEARCH_PARAMS,
      }}
    >
      <Outlet />
    </QueryParamProvider>
  );
}
export default QueryParamsManager;
