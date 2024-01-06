import Button from "@shared/Button";
import Flex from "@shared/Flex";
import InputBox from "@shared/InputBox";
import Spacing from "../shared/Spacing";
import { ChangeEvent, useState } from "react";
import useUser from "@/hooks/auth/useUser";
import useComments from "./hooks/useComments";

function Form({ momentId }: { momentId: string }) {
  const [content, setContent] = useState("");
  const user = useUser();
  const { write } = useComments({ momentId });
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <Flex justify="center" direction="column">
      <Flex justify="center">
        <InputBox
          placeholder={
            user != null
              ? "댓글을 작성해보세요!"
              : "댓글을 쓰려면 로그인이 필요합니다."
          }
          value={content}
          onChange={handleContentChange}
        />
      </Flex>
      <Spacing size={12} />
      <Button
        disabled={!user || content.length === 0}
        onClick={async () => {
          const success = await write(content);
          if (success === true) {
            setContent("");
          }
        }}
      >
        작성
      </Button>
    </Flex>
  );
}

export default Form;
