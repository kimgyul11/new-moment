import { useNavigate } from "react-router-dom";
import Form from "@components/signup/Form";

function SignupPage() {
  const navigate = useNavigate();

  //회원가입로직

  return <Form onSubmit={() => {}}></Form>;
}

export default SignupPage;
