import { OrangeButton } from "./OrangeButton";
import React from "react";

export const BackButton: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  return (
    <OrangeButton className={className} isLink={{ to: ".." }}>
      Go back
    </OrangeButton>
  );
};
