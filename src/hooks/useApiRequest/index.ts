import useApiRequestClient from "./useApiRequestClient";
import useApiRequestServer from "./useApiRequestServer";

let useApiRequest: typeof useApiRequestClient;

if (import.meta.env.SSR) {
  useApiRequest = useApiRequestServer;
} else {
  useApiRequest = useApiRequestClient;
}

export default useApiRequest;
