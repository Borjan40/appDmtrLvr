import { TApiInstance, TApiInstanceKeys } from "../../api";
import {
  getByDotKey,
  GetByDotKey,
  runFnWithTuple,
} from "../../types/utility/objects";
import useApi from "../useApi";
import useCashe from "../useCashe";
import { TApiRequest } from "./types";

function useApiRequestServer<T extends TApiInstanceKeys>(
  schema: T,
  ...params: Parameters<GetByDotKey<TApiInstance, T>>
) {
  type Res = Awaited<ReturnType<GetByDotKey<TApiInstance, T>>>;

  const api = useApi();
  const fn = getByDotKey(api, schema);
  const cashe = useCashe();
  const key = schema + ":" + JSON.stringify(params);

  let result: TApiRequest<Res>;

  if (key in cashe.data) {
    result = {
      done: true,
      success: true,
      data: cashe.data[key] as Res,
      error: null,
    };
  } else {
    if (!(key in cashe.awaiting)) {
      cashe.awaiting[key] = runFnWithTuple(fn, params);
    }

    result = {
      done: false,
      success: false,
      data: null,
      error: null,
    }
  }

  return result;
}

export default useApiRequestServer;
