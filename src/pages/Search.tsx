import MomentItem from "@/components/home/MomentItem";
import useSearch from "@/components/search/hooks/useSearch";
import Flex from "@/components/shared/Flex";
import SearchBar from "@/components/shared/SearchBar";
import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";
import Top from "@/components/shared/Top";
import { css } from "@emotion/react";

import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useParams } from "react-router-dom";

function SearchPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState(id);
  const { data, hasNextPage, loadMore, isFetching } = useSearch(
    search as string
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const trimmedValue = e.currentTarget.value.trim();
        if (trimmedValue === "") {
          return;
        }
        navigate(`/search/${trimmedValue}`);
        setSearch(id);
      }
    },
    [id, search]
  );
  useEffect(() => {
    setSearch(id);
  }, [id]);

  return (
    <div css={wrap}>
      <Spacing size={100} />
      <Flex justify="center" align="center">
        <SearchBar
          placeholder="검색어를 입력해주세요"
          defaultValue={search}
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />
      </Flex>
      <Spacing size={24} />
      <Spacing size={2} backgroundColor="gray200" />

      {data && data?.length > 0 ? (
        <InfiniteScroll
          dataLength={data?.length ?? 0}
          hasMore={hasNextPage}
          loader={<></>}
          next={loadMore}
          scrollThreshold="100px"
        >
          <ul>
            {data?.map((moment: any) => (
              <MomentItem moment={moment} key={moment.id} />
            ))}
          </ul>
        </InfiniteScroll>
      ) : id && data?.length === 0 ? (
        <Text
          typography="t6"
          color="gray400"
          display="block"
          textAlign="center"
        >
          '{id}'의 검색결과가 없습니다.
        </Text>
      ) : (
        <p> {isFetching ? null : "검색어를 입력해주세요"}</p>
      )}
    </div>
  );
}
const wrap = css`
  min-height: 100vh;
`;
export default SearchPage;
