import FixedBottomButton from "@shared/FixedBottomButton";
import Flex from "@shared/Flex";
import Input from "@shared/Input";
import InputBox from "@shared/InputBox";
import Spacing from "@shared/Spacing";
import Text from "@shared/Text";
import Top from "@shared/Top";
import useMoment from "@/hooks/moment/useMoment";
import { getMoment } from "@/remote/moment";
import { colors } from "@/styles/colorPalette";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const [tags, setTags] = useState<string[]>([]);
  const [hashTag, setHashTag] = useState<string>("");
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const params = useParams();
  const navigate = useNavigate();
  const { data: moment, isLoading } = useQuery(["moment", params.id], () =>
    getMoment(params.id as string)
  );

  const { update } = useMoment();
  const setData = useCallback(() => {
    setTags(moment?.hashTag || []);
    setImageFile(moment?.image as string);
    setText(moment?.text as string);
  }, [moment]);

  useEffect(() => {
    setData();
  }, [setData]);

  if (isLoading) {
    return null;
  }
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

  return (
    <Container>
      <Spacing size={70} />
      <Top title="수정하기" subTitle="수정할 내용을 입력해주세요" />
      <Flex css={imgStyles} justify="center" align="center">
        <input
          id="file"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
        />
        {imageFile ? (
          <img src={imageFile} width={"100%"} height={"100%"} alt="" />
        ) : (
          <img
            src="https://cdn0.iconfinder.com/data/icons/phosphor-regular-vol-3/256/image-512.png"
            width={40}
            alt=""
          />
        )}
      </Flex>
      <Spacing size={16} />
      <InputBox
        height="120px"
        placeholder="내용을 입력해주세요"
        value={text}
        onChange={handleChangeText}
      />
      <Spacing size={16} />
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
      <Spacing size={80} />
      <FixedBottomButton
        label={"수정하기"}
        onClick={() => {
          let momentObj = {
            id: moment?.id as string,
            text,
            hashTag: tags,
            image: imageFile as string,
            userId: moment?.userId as string,
          };
          let isNotUpdated = imageFile === moment?.image;
          update({ momentObj, isNotUpdated });
          navigate(`/moments/${moment?.id}`, { replace: true });
        }}
        disabled={!imageFile || !text}
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
export default Edit;
