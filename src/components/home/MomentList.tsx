import { css } from "@emotion/react";
import Button from "../shared/Button";
import Flex from "../shared/Flex";
import ListRow from "../shared/ListRow";
import Text from "../shared/Text";
import useMoments from "./hooks/useMoments";
import Spacing from "../shared/Spacing";

function MomentList() {
  const { data } = useMoments();
  console.log(data);
  return (
    <ul>
      <li css={containerStyle}>
        <Flex justify="space-between">
          <Flex align="center">
            <img
              src="https://cdn4.iconfinder.com/data/icons/coco-line/24/User-512.png"
              width={40}
              height={40}
            />
            <Flex direction="column">
              <Text bold={true}>아이디</Text>
              <Text typography="t7" color="gray400">
                20202000
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <Button weak={true}>친구추가</Button>
          </Flex>
        </Flex>
        <Spacing size={8} />
        <Flex justify="center">
          <div
            style={{ backgroundColor: "gray", width: "100%", height: "300px" }}
          >
            <img
              src="https://i.namu.wiki/i/62sxUdj1BFwc8s6xBFGoDVVnD5BwoK2FUJ6InaOxQb8mOQTZudXHg_79_0sJVx-x5c2C4jxAB2uw-fmcz4M4yw.webp"
              style={{ width: "100%", height: "300px", objectFit: "contain" }}
            />
          </div>
        </Flex>
        <Spacing size={8} />
        <Flex justify="end">
          <Button>좋아요</Button>
          <Button>댓글</Button>
        </Flex>
        <Spacing size={8} />
        <Text typography="t6">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea tenetur
          excepturi minus aliquid fugiat ad culpa ipsum. Rerum libero hic,
          asperiores temporibus nihil soluta unde odio molestias autem officiis
          ea Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam,
          nostrum. Nihil veritatis vero labore nobis corporis quas voluptatum
          libero. Sint veniam molestias dolor harum? Quod neque id quaerat
          deserunt asperiores eveniet expedita labore placeat illo. Nobis harum
          hic, sequi tempore rerum vero suscipit dolor amet iusto aut sint
          tempora. Repellendus eum, distinctio corrupti ipsum eius corporis!
          Autem, quam eligendi. Quas, quia, dignissimos illo soluta illum
          adipisci ad architecto corporis sint obcaecati veniam quis distinctio
          enim, itaque laboriosam facere exercitationem vitae aspernatur ab
          ipsum? Necessitatibus odit porro at officiis impedit, atque magnam est
          sunt omnis delectus nobis nemo odio unde quis. Consectetur, illo.
          Laudantium distinctio, perferendis, esse doloremque id officiis vero
          atque dolores saepe libero incidunt corporis modi ad vitae optio
          consectetur iure suscipit, deserunt consequatur. Autem nam provident
          laudantium eos, iusto nulla ut optio incidunt vel. Saepe ex fuga,
          velit sed unde porro cum officiis quisquam, voluptatum maiores,
          molestias officia.
        </Text>
      </li>
    </ul>
  );
}

const containerStyle = css`
  padding: 8px 24px;
`;
export default MomentList;
