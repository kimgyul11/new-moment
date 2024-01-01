import { getBestMoment } from "@/remote/moment";
import { useQuery } from "react-query";

function useBestMoment() {
  return useQuery(["bestMoments"], () => getBestMoment());
}

export default useBestMoment;
