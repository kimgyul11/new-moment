import { getSearchMoment } from "@/remote/moment";
import { useQuery } from "react-query";

function useSearch(searchValue: any) {
  return useQuery(["search"], () => getSearchMoment(searchValue));
}

export default useSearch;
