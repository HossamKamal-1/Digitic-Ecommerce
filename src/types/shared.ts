import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type RequestError = FetchBaseQueryError | SerializedError | undefined;
export type JSONPrimitive = string | number | boolean | null;