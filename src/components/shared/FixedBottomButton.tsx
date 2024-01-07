import { colors } from "@/styles/colorPalette";
import { css } from "@emotion/react";

import { createPortal } from "react-dom";
import Button from "./Button";
import { motion } from "framer-motion";

interface FixedBottomButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function FixedBottomButton({
  label,
  onClick,
  disabled,
}: FixedBottomButtonProps) {
  const $portalRoot = document.getElementById("root-portal");

  if ($portalRoot == null) {
    return null;
  }

  return createPortal(
    <motion.div
      css={containerStyles}
      initial={{ translateY: 100 }}
      animate={{ translateY: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Button
        size="medium"
        onClick={onClick}
        full={true}
        css={buttonStyles}
        disabled={disabled}
      >
        {label}
      </Button>
    </motion.div>,
    $portalRoot
  );
}

const containerStyles = css`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.white};
  max-width: 460px;
  margin: auto;
  border: none;
  padding: 20px 10px 8px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  border-radius: 2px;
`;

const buttonStyles = css`
  border-radius: 8px;
`;

export default FixedBottomButton;
