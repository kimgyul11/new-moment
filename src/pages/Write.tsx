import FixedBottomButton from "@shared/FixedBottomButton";
import Flex from "@shared/Flex";
import Input from "@shared/Input";
import InputBox from "@shared/InputBox";
import Spacing from "@shared/Spacing";
import Text from "@shared/Text";
import Top from "@shared/Top";
import { colors } from "@/styles/colorPalette";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import useMoment from "@/hooks/moment/useMoment";
import { useNavigate } from "react-router-dom";

function WritePage() {
  const navigate = useNavigate();
  const [tags, setTags] = useState<string[]>([]);
  const [hashTag, setHashTag] = useState<string>("");
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const { write, writeIsLoading } = useMoment();

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    if (e.key === "Enter") {
      if (
        value === "" ||
        value.trim().length === 0 ||
        tags.includes(value.trim())
      ) {
        setHashTag("");
      } else {
        const uniqueTags = Array.from(new Set([...tags, value.trim()]));
        setTags(uniqueTags);
        setHashTag("");
      }
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashTag(e.target.value);
  };
  const handleOnClick = (tag: any) => {
    setTags(tags.filter((val) => val !== tag));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    const file = files?.[0];
    const fileReader = new FileReader();

    if (file) {
      fileReader.readAsDataURL(file);
    }

    fileReader.onloadend = (e) => {
      const fileReaderEvent = e as ProgressEvent<FileReader>;
      const { result } = fileReaderEvent.target || {};

      setImageFile(result as string);
    };
  };
  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  return (
    <Container>
      <Spacing size={70} />
      <Top title="기록하기" subTitle="순간을 기록해보세요" />
      {/* 이미지영역 */}
      <Flex css={imgStyles} justify="center" align="center">
        <input
          id="file"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
        />
        {imageFile ? (
          <img src={imageFile} width={"100%"} height={"100%"} />
        ) : (
          <img
            src="https://cdn0.iconfinder.com/data/icons/phosphor-regular-vol-3/256/image-512.png"
            width={40}
          />
        )}
      </Flex>
      <Spacing size={16} />
      {/* 본문 영역 */}
      <InputBox
        height="120px"
        placeholder="내용을 입력해주세요"
        onChange={handleChangeText}
      />
      <Spacing size={16} />

      {/* 태그 영역 */}
      <Input
        placeholder="#️ 해시태그를 입력 후 엔터키를 눌러주세요"
        onKeyUp={handleOnKeyUp}
        onChange={handleOnChange}
        value={hashTag}
      />
      <Spacing size={8} />
      {tags.length > 0
        ? tags.map((tag, idx) => (
            <Text
              key={idx}
              typography="t7"
              color="gray500"
              onClick={() => handleOnClick(tag)}
              style={{ cursor: "pointer" }}
            >
              {` #${tag}`}
            </Text>
          ))
        : null}
      <Spacing size={100} />
      <FixedBottomButton
        label={writeIsLoading ? "작성중.." : "작성"}
        onClick={async () => {
          if (!imageFile || !text) return;
          const success = await write({
            image: imageFile,
            text,
            hashTag: tags,
          });
          if (success === true) {
            navigate("/", { replace: true });
          }
        }}
        disabled={!imageFile || !text || writeIsLoading}
      />
    </Container>
  );
}

const Container = styled.div`
  padding: 0px 16px 0px 16px;
  min-height: 100vh;
`;

const imgStyles = css`
  position: relative;
  width: 100%;
  height: 200px;
  border: 1px solid ${colors.gray200};
  background-color: white;
  border-radius: 8px;

  input[type="file"] {
    opacity: 0;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  img {
    object-fit: contain;
  }
`;

export default WritePage;
