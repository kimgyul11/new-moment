import { ChangeEvent, useCallback, useState } from "react";
import useComments from "./hooks/useComments";
import Flex from "../shared/Flex";
import Text from "../shared/Text";
import ListRow from "../shared/ListRow";
import { css } from "@emotion/react";
import InputBox from "../shared/InputBox";
import Spacing from "../shared/Spacing";
import Button from "../shared/Button";

import useUser from "@/hooks/auth/useUser";

function Comment({ momentId }: { momentId: string }) {
  const { data: comments, isLoading, write } = useComments({ momentId });
  const user = useUser();
  const [content, setContent] = useState("");

  //댓글을 부모로부터 매개변수로 받는다.
  // 1.댓글 유무에 따른 렌더링
  const renderComments = useCallback(() => {
    //1-1.댓글이 존재하지 않을 경우
    if (comments?.length === 0) {
      return null;
    }

    //1-2.댓글이 존재할 경우
    return (
      <ul>
        {comments?.map((comment) => (
          <li css={containerStyles}>
            <Flex direction="column">
              <ListRow
                as="div"
                key={comment.id}
                left={
                  comment.user.photoURL != null ? (
                    <img src={comment.user.photoURL} width={40} />
                  ) : null
                }
                contents={
                  <ListRow.Texts
                    title={comment.user.displayName}
                    subTitle={comment.createdAt.toString()}
                  />
                }
                right={
                  <>
                    <p>삭제</p>
                    <p>삭제</p>
                  </>
                }
              />
              <Flex css={contentStyles}>
                <Text typography="t6">{comment.content}</Text>
              </Flex>
            </Flex>
          </li>
        ))}
      </ul>
    );
  }, [comments]);

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  if (isLoading) {
    return null;
  }

  // 2.useCommet() 커스텀 훅으로 mutate함수 가져와서 동작

  return (
    <div>
      {/* 댓글 form */}
      <Flex justify="center" css={commentContainer} direction="column">
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
          disabled={!user}
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
      <Spacing size={24} />
      {/* 댓글 렌더링 */}
      {renderComments()}
    </div>
  );
}

const contentStyles = css`
  padding: 4px 32px;
`;
const containerStyles = css`
  margin-bottom: 12px;
`;

const commentContainer = css`
  padding: 8px;
  border-radius: 8px;
`;

export default Comment;
