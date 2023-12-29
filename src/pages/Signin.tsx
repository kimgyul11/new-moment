import { auth } from "@/remote/firebase";
import Form from "@components/signin/Form";
import { FormValues } from "@models/signin";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

function SigninPage() {
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
  return <Form onSubmit={handleSubmit} />;
}

export default SigninPage;
