import { useEffect, useState } from "react";
import useApi from "../useApi";
import { TApiInstance, TApiInstanceKeys } from "../../api";
import { getByDotKey, GetByDotKey, runFnWithTuple } from "../../types/utility/objects";

function useApiRequest<T extends TApiInstanceKeys>(schema: T, ...params: Parameters<GetByDotKey<TApiInstance, T>>) {
  const api = useApi();
  const fn = getByDotKey(api, schema) 
  type Res = Awaited<ReturnType<typeof fn>>;  

  const [result, setResult] = useState<TApiRequest<Res>>({
    done: false,
    success: false,
    data: null,
    error: null,
  });

  useEffect(() => {
    runFnWithTuple(fn, params)
      .then((data: any) =>
        setResult({
          done: true,
          success: true,
          data: data as Res,
          error: null,
        })
      )
      .catch((e: Error) => {
        setResult({
          done: true,
          success: false,
          data: null,
          error: e,
        });
      });
  }, []);
  return result;
}

type TApiRequestPending = {
  done: false;
  success: false;
  data: null;
  error: null;
};

type TApiRequestSuccess<T> = {
  done: true;
  success: true;
  data: T;
  error: null;
};

type TApiRequestError = {
  done: true;
  success: false;
  data: null;
  error: Error;
};

type TApiRequest<T> =
  | TApiRequestPending
  | TApiRequestSuccess<T>
  | TApiRequestError;

export default useApiRequest;
