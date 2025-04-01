import { useEffect, useState } from "react";
import useApi from "../useApi";

function useApiRequest(schema: string, ...params: any): any {
  const api = useApi();
  const fn = schema.split(".").reduce((obj: any, key) => obj[key], api);

  const [result, setResult] = useState<TApiRequest<any>>({
    done: false,
    success: false,
    data: null,
    error: null,
  });

  useEffect(() => {
    fn(...params)
      .then((data) =>
        setResult({
          done: true,
          success: true,
          data,
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
