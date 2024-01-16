import { css } from "@emotion/react";
import { ChangeEvent, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@shared/Button";
import Flex from "@shared/Flex";
import Spacing from "@shared/Spacing";
import Text from "@shared/Text";
import TextField from "@shared/TextFiled";
import { FormValues } from "@/models/signin";

function Form({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  }, []);

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        placeholder="이메일을 입력해주세요"
        name="email"
        onChange={handleFormValues}
        value={formValues.email}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        placeholder="패스워드를 입력해주세요"
        type="password"
        name="password"
        onChange={handleFormValues}
        value={formValues.password}
      />
      <Spacing size={32} />
      <Button
        size="medium"
        disabled={formValues.email === "" || formValues.password === ""}
        onClick={() => {
          onSubmit(formValues);
        }}
      >
        로그인
      </Button>
      <Spacing size={12} />
      <Link to="/signup" css={linkStyles}>
        <Text typography="t7" color="blue500">
          아직 계정이 없으신가요?
        </Text>
      </Link>
    </Flex>
  );
}

const formContainerStyles = css`
  padding: 24px;
`;
const linkStyles = css`
  text-align: center;
`;

export default Form;
