import { auth } from "@/remote/firebase";
import Form from "@components/signin/Form";
import useUser from "@/hooks/auth/useUser";
import { FormValues } from "@models/signin";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import Spacing from "@/components/shared/Spacing";

function SigninPage() {
  const user = useUser();
  const navigate = useNavigate();
  //submit이벤트
  const handleSubmit = useCallback(async (formValues: FormValues) => {
    const { email, password } = formValues;
    console.log(formValues);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      console.log(e);
      if (e instanceof FirebaseError) {
        if (e.code === "auth/invalid-credential") {
          //에러 메세지
          return;
        }
      }
    }
  }, []);
  if (user) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div css={container}>
      <Spacing size={68} />
      <Form onSubmit={handleSubmit} />
    </div>
  );
}
const container = css`
  height: 100vh;
`;
export default SigninPage;
