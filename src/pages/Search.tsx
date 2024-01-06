import MomentItem from "@/components/home/MomentItem";
import useSearch from "@/components/search/hooks/useSearch";
import SearchBar from "@/components/shared/SearchBar";
import Spacing from "@/components/shared/Spacing";
import { css } from "@emotion/react";

import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useParams } from "react-router-dom";

function SearchPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState(id);
  const { data, hasNextPage, loadMore } = useSearch(search as string);
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const trimmedValue = e.currentTarget.value.trim();
        navigate(`/search/${trimmedValue}`);
        setSearch(id);
        // setSearch(e.currentTarget.value);
        // 추가로 페이지 이동 로직 등을 처리할 수 있습니다.
      }
    },
    [id, search]
  );
  return (
    <>
      <Spacing size={80} />
      <div css={wrap}>
        <SearchBar
          placeholder="검색어를 입력해주세요"
          defaultValue={search}
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />
      </div>
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
      ) : (
        <p>검색어를 입력해주세요</p>
      )}
    </>
  );
}
const wrap = css`
  padding: 6px 18px;
`;
export default SearchPage;
