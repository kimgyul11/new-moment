import { FormValues } from "@models/signup";
import { ChangeEvent, useCallback, useState } from "react";
import Flex from "../shared/Flex";
import TextField from "../shared/TextFiled";
import Spacing from "../shared/Spacing";
import Button from "../shared/Button";
import { css } from "@emotion/react";

function Form({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) {
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
    passwordCheck: "",
    displayName: "",
  });
  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  }, []);

  return (
    <Flex direction="column" css={containerStyle}>
      <Spacing size={16} />
      <TextField
        name="email"
        label="이메일"
        type="email"
        placeholder="이메일 주소를 입력해주세요."
        value={formValues.email}
        onChange={handleFormValues}
      />
      <Spacing size={16} />
      <TextField
        name="password"
        label="비밀번호"
        type="password"
        placeholder="6자 이상 특수문자를 포함"
        value={formValues.password}
        onChange={handleFormValues}
      />
      <Spacing size={16} />
      <TextField
        name="passwordCheck"
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 입력해주세요."
        value={formValues.passwordCheck}
        onChange={handleFormValues}
      />
      <Spacing size={16} />
      <TextField
        name="displayName"
        label="닉네임"
        type="text"
        value={formValues.displayName}
        placeholder="6자 이상 닉네임을 입력해주세요"
        onChange={handleFormValues}
      />
      <Spacing size={16} />
      <Button size="large" disabled={true}>
        회원가입
      </Button>
    </Flex>
  );
}

const containerStyle = css`
  padding: 16px 24px;
`;

export default Form;
