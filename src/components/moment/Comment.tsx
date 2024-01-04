import { ChangeEvent, useCallback, useState } from "react";
import { css } from "@emotion/react";

import useComments from "./hooks/useComments";
import Flex from "@shared/Flex";
import Text from "@shared/Text";
import ListRow from "@shared/ListRow";
import InputBox from "@shared/InputBox";
import Spacing from "@shared/Spacing";
import Button from "@shared/Button";
import useUser from "@/hooks/auth/useUser";

function Comment({ momentId }: { momentId: string }) {
  const {
    data: comments,
    isLoading,
    write,
    remove,
    update,
  } = useComments({ momentId });
  const user = useUser();
  const [content, setContent] = useState("");
  const [updateMode, setUpdateMode] = useState({
    commentId: "",
    isUpdate: false,
  });
  const [newComment, setNewComment] = useState("");

  //댓글을 부모로부터 매개변수로 받는다.
  // 1.댓글 유무에 따른 렌더링
  const renderComments = useCallback(() => {
    //댓글이 존재하지 않을 경우
    if (comments?.length === 0) {
      return null;
    }
    //댓글이 존재할 경우
    return (
      <ul>
        {comments?.map((comment) => (
          <li key={comment.id}>
            <Flex direction="column">
              <ListRow
                as="div"
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
                  user != null ? (
                    <Flex>
                      <Text
                        bold={true}
                        typography="t7"
                        css={cursorPointer}
                        onClick={() => {
                          setUpdateMode({
                            commentId: comment.id,
                            isUpdate: true,
                          });
                          setNewComment(comment.content);
                        }}
                      >
                        {updateMode.commentId === comment.id &&
                        updateMode.isUpdate
                          ? null
                          : "수정"}
                      </Text>
                      <Spacing direction="horizontal" size={12} />
                      <Text
                        bold={true}
                        typography="t7"
                        color="red"
                        css={cursorPointer}
                        onClick={() => {
                          if (
                            updateMode.commentId === comment.id &&
                            updateMode.isUpdate
                          ) {
                            setUpdateMode({ commentId: "", isUpdate: false });
                            return;
                          }
                          const ok = window.confirm("정말 삭제하시겠습니까?");
                          if (ok) {
                            remove({ momentId, commentId: comment.id });
                          }
                          return;
                        }}
                      >
                        {updateMode.commentId === comment.id &&
                        updateMode.isUpdate
                          ? "취소"
                          : "삭제"}
                      </Text>
                    </Flex>
                  ) : null
                }
              />
              <Flex css={contentStyles}>
                {updateMode.commentId === comment.id && updateMode.isUpdate ? (
                  <Flex direction="column" css={{ width: "100%" }}>
                    <InputBox
                      defaultValue={comment.content}
                      value={newComment}
                      onChange={handleNewCommentChange}
                    />
                    <Spacing size={12} />
                    <Button
                      onClick={() => {
                        update({ momentId, commentId: comment.id, newComment });
                        setUpdateMode((prev) => ({ ...prev, isUpdate: false }));
                      }}
                    >
                      확인
                    </Button>
                  </Flex>
                ) : (
                  <Text typography="t6">{comment.content}</Text>
                )}
              </Flex>
            </Flex>
          </li>
        ))}
      </ul>
    );
  }, [comments, user, updateMode, newComment]);

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleNewCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  if (isLoading) {
    return null;
  }

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

const commentContainer = css`
  padding: 8px;
  border-radius: 8px;
`;
const cursorPointer = css`
  cursor: pointer;
`;

export default Comment;
