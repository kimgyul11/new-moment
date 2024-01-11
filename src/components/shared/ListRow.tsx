import Flex from "./Flex";
import { SerializedStyles, css } from "@emotion/react";
import Text from "./Text";
import Skeleton from "./Skeleton";
import Spacing from "./Spacing";
import { Typography } from "@/styles/typography";

interface ListRowProps {
  left?: React.ReactNode;
  contents: React.ReactNode;
  right?: React.ReactNode;
  withArrow?: boolean;
  onClick?: () => void;
  as?: "div" | "li";
  cursor?: boolean;
}

function ListRow({
  as = "li",
  left,
  contents,
  right,
  withArrow,
  onClick,
  cursor,
}: ListRowProps) {
  return (
    <Flex
      as={as}
      css={listRowContainerStyles(cursor)}
      onClick={onClick}
      align="center"
    >
      <Flex css={listRowLeftStyles}>{left}</Flex>
      <Flex css={listRowContent}>{contents}</Flex>
      <Flex>{right}</Flex>
      {withArrow ? <IconArrowRight /> : null}
    </Flex>
  );
}

const listRowContainerStyles = (hasCursor: boolean = false) => css`
  padding: 8px 0px;
  ${hasCursor && "cursor: pointer;"}
`;
const listRowSkeletonStyles = css`
  padding: 8px 0px;
`;
const listRowLeftStyles = css`
  margin-right: 14px;
`;
const listRowContent = css`
  flex: 1;
`;

function ListRowTexts({
  title,
  subTitle,
  typography,
}: {
  title: React.ReactNode;
  subTitle: React.ReactNode;
  typography?: Typography;
}) {
  return (
    <Flex direction="column">
      <Text bold={true} typography={typography}>
        {title}
      </Text>
      <Text typography="t7" color="gray400">
        {subTitle}
      </Text>
    </Flex>
  );
}
interface ListRowSkeletonProps {
  topWidth?: number;
  topHeight?: number;
  bottomWidth?: number;
  bottomHeight?: number;
}

function ListRowSkeleton({
  topWidth = 130,
  topHeight = 23,
  bottomWidth = 85,
  bottomHeight = 20,
}: ListRowSkeletonProps) {
  return (
    <Flex as="li" css={listRowSkeletonStyles} align="center">
      <Flex css={listRowLeftStyles}></Flex>
      <Flex css={listRowContent}>
        <ListRow.Texts
          title={
            <>
              <Spacing size={4} />
              <Skeleton width={topWidth} height={topHeight} />
            </>
          }
          subTitle={<Skeleton width={bottomWidth} height={bottomHeight} />}
        />
      </Flex>
      {<IconArrowRight />}
    </Flex>
  );
}

function IconArrowRight() {
  return (
    <svg
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
    >
      <title />
      <path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z" />
    </svg>
  );
}

ListRow.Texts = ListRowTexts;
ListRow.Skeleton = ListRowSkeleton;

export default ListRow;
