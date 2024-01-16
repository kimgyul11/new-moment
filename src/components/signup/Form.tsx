import { FormValues } from "@models/signup";
import TextField from "@shared/TextFiled";
import Spacing from "@shared/Spacing";
import Button from "@shared/Button";
import { css } from "@emotion/react";
import { useForm } from "react-hook-form";

function Form({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },

    watch,
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      displayName: "",
      password: "",
      passwordCheck: "",
      email: "",
    },
  });

  let password = watch("password");

  return (
    <div css={containerStyle}>
      <form>
        <Spacing size={16} />
        <TextField
          label="이메일"
          type="email"
          placeholder="이메일 주소를 입력해주세요."
          hasError={!!errors.email?.message}
          helpMessage={
            errors.email?.message && (errors.email.message as string)
          }
          {...register("email", {
            required: "이메일은 필수 입력입니다.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "이메일 형식이 올바르지 않습니다.",
            },
          })}
        />
        <Spacing size={16} />
        <TextField
          label="비밀번호"
          type="password"
          placeholder="6자 이상 특수문자를 포함"
          hasError={!!errors.password}
          helpMessage={errors.password?.message}
          {...register("password", {
            required: "비밀번호는 필수 입력입니다.",
            minLength: {
              value: 8,
              message: "8자리 이상 비밀번호를 사용하세요.",
            },
          })}
        />
        <Spacing size={16} />
        <TextField
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          helpMessage={errors.passwordCheck?.message}
          hasError={!!errors.passwordCheck}
          {...register("passwordCheck", {
            required: "비밀번호를 확인해주세요.",
            validate: (value) =>
              value === password || "비밀번호가 일치하지 않습니다.",
          })}
        />
        <Spacing size={16} />
        <TextField
          label="닉네임"
          placeholder="2자 이상 닉네임을 입력해주세요"
          hasError={!!errors.displayName}
          helpMessage={errors.displayName?.message}
          {...register("displayName", {
            required: "닉네임은 필수 입력입니다.",
            minLength: {
              value: 2,
              message: "2자리 이상 입력해주세요.",
            },
          })}
        />
        <Spacing size={16} />
        <Button
          size="large"
          disabled={!isDirty || !isValid}
          full={true}
          onClick={handleSubmit(onSubmit)}
        >
          회원가입
        </Button>
      </form>
    </div>
  );
}

const containerStyle = css`
  padding: 16px 24px;
`;

export default Form;
