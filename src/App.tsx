import Router from "./components/router";
import useLoadKakao from "@hooks/kakao/useLoadKakao";

function App() {
  useLoadKakao();
  return <Router />;
}

export default App;
