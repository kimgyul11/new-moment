import useSearch from "@/components/search/hooks/useSearch";
import Spacing from "@/components/shared/Spacing";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

function SearchPage() {
  const { state } = useLocation();
  const [searchValue, setSearchValue] = useState(state);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchValue(inputRef.current?.value);
  }, [searchValue]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
    }
  };

  const { data } = useSearch(searchValue);
  console.log("data", data);
  const renderResult = useCallback(() => {
    //태그를 클릭해서 들어왔다면,
    if (state) {
      return <p>해시태그를 클릭하여 접근</p>;
    }
  }, []);
  return (
    <div>
      <input ref={inputRef} onKeyDown={handleKeyDown} />
      <Spacing size={16} />
      {renderResult()}
    </div>
  );
}

export default SearchPage;
