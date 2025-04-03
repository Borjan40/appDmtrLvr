import { useContext } from "react";
import { TApiInstance, TApiInstanceKeys } from "../../api";
import { getByDotKey, GetByDotKey } from "../../types/utility/objects";
import useApi from "../useApi";
import { TApiRequest } from "./types";
import casheContext from "../../contexts/cashe";

function useApiRequestServer<T extends TApiInstanceKeys>(
  schema: T,
  ...params: Parameters<GetByDotKey<TApiInstance, T>>
) {
  const api = useApi();
  const fn = getByDotKey(api, schema);
  type Res = Awaited<ReturnType<typeof fn>>;
  const cashe = useContext(casheContext);
  const key = schema + ":" + JSON.stringify(params);
  const result: TApiRequest<Res> = cashe[key]
    ? {
        done: true,
        success: true,
        data: cashe[key] as Res,
        error: null,
      }
    : {
        done: false,
        success: false,
        data: null,
        error: null,
      };

  return result;
}

export default useApiRequestServer;
