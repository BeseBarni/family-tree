import { Props } from "src/models/props.type";
import styled, { keyframes } from "styled-components";

export type SkeletonProps = {
  width?: string;
  height?: string;
  type?: "rect" | "circle" | "text";
  animation?: "wave" | "pulse" | "none";
};

const waveAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(-10%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const SkeletonBase = styled.div<SkeletonProps>(
  ({ width = "100%", height = "16px", type = "rect" }) => ({
    width: width,
    height: height,
    borderRadius: type === "circle" ? "50%" : type === "text" ? "4px" : "8px",
    backgroundColor: "#e0e0e0",
    position: "relative",
    overflow: "hidden",
  })
);

const WaveOverlay = styled.div<{ animation?: "wave" | "pulse" | "none" }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0) 100%
  );

  animation: ${waveAnimation} 1.6s ease-in-out infinite;

  display: ${(props) => (props.animation === "wave" ? "block" : "none")};
`;

export default function Skeleton({
  width,
  height,
  type = "rect",
  ...props
}: SkeletonProps & Props) {
  const { animation = "wave", ...restProps } = props;
  return (
    <SkeletonBase {...restProps}>
      <WaveOverlay animation={animation} />
    </SkeletonBase>
  );
}
