import { colors } from "@/styles/colorPalette";
import styled from "@emotion/styled";
import Text from "./Text";

function Badge({ label }: { label: string }) {
  return (
    <Container>
      <Text color="white" typography="t7" bold={true}>
        {label}
      </Text>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 12px;
  background-color: ${colors.blue500};
  padding: 4px 8px;
`;
export default Badge;
