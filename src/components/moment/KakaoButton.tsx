import useShare from "@/hooks/kakao/useShare";
import Flex from "../shared/Flex";
import Button from "../shared/Button";
import Spacing from "../shared/Spacing";
import { Moment } from "@/models/moment";
import { format } from "date-fns";
import IconButton from "../shared/IconButton";

function KakaoButton({ moment }: { moment: Moment }) {
  const share = useShare();
  const { text, image, createdAt } = moment;
  return (
    <div>
      <Spacing size={8} />
      <Flex justify="end">
        <IconButton
          iconUrl="https://cdn1.iconfinder.com/data/icons/rounded-social-media/512/kakao-512.png"
          text={"카카오톡 공유하기"}
          onClick={() => {
            share({
              title: `${format(createdAt, "yyyy-MM-dd")}에 기록된 순간`,
              description: text,
              imageUrl: image,
              buttonLable: "Moment에서 확인해보기",
            });
          }}
        />
        <Spacing direction="horizontal" size={12} />
      </Flex>
    </div>
  );
}

export default KakaoButton;
