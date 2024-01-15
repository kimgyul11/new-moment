import { useNavigate } from "react-router-dom";
import Form from "@components/signup/Form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, store } from "@/remote/firebase";
import { FormValues } from "@/models/signup";
import { collection, doc, setDoc } from "firebase/firestore";
import { COLLECTIONS } from "@constants/collections";
import { FirebaseError } from "firebase/app";
import { css } from "@emotion/react";
import Spacing from "@/components/shared/Spacing";

function SignupPage() {
  const navigate = useNavigate();

  const handleSubmit = async (formValue: FormValues) => {
    const { email, password, displayName } = formValue;
    try {
      //1.계정 생성
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //2.계정 업데이트
      await updateProfile(user, {
        displayName,
      });
      //3.컬렉션에 추가할 객체 생성
      const userObj = {
        uid: user.uid,
        email,
        displayName,
      };
      //4.계정 컬렉션에 유저 정보를 추가
      await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), userObj);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e);
        return;
      }
      console.log(e);
    }
  };

  return (
    <div css={container}>
      <Spacing size={68} />
      <Form onSubmit={handleSubmit}></Form>
    </div>
  );
}
const container = css`
  height: 100vh;
`;
export default SignupPage;
