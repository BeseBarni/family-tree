import styled from "styled-components";
import { Gender } from "src/models/gender";
import { Props } from "src/models/props.type";
type NodePictureProps = {
  gender: Gender;
  imageSrc: string;
  isDead?: boolean;
  isInActive?: boolean;
  size?: string;
} & Props;

interface StyledNodePictureProps {
  size?: string;
}

const StyledNodePicture = styled.div<StyledNodePictureProps>`
  height: ${({ size }) => size || "100px"};
  width: ${({ size }) => size || "100px"};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5%;
  & .profile-clip {
    clip-path: circle(50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & .profile-picture {
    height: 100%;
    max-width: none;
  }

  & .dead-overlay {
    filter: grayscale(100%);
  }

  & .blur {
    -webkit-backdrop-filter: blur(2px) brightness(100%);
    backdrop-filter: blur(2px) brightness(100%);
    border: 9px solid;
    border-radius: 155px;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  &.female-dead {
    background-color: #b96f9f;
    border-radius: 999px;
  }

  &.female-dead-inactive {
    background-color: #b96f9f;
    border-radius: 999px;
    filter: blur(7.5px);
    opacity: 0.85;
  }
  &.none {
    box-shadow: unset !important;
    background-color: transparent;
    border-radius: 999px;
  }
  &.male {
    background-color: #0066a0;
    border-radius: 999px;
  }

  &.male-dead-inactive {
    background-color: #6088a0;
    border-radius: 999px;
    filter: blur(7.5px);
    opacity: 0.85;
  }

  &.male-dead {
    background-color: #6088a0;
    border-radius: 999px;
  }

  &.female {
    background-color: #b91280;
    border-radius: 999px;
  }

  &.male-inactive {
    background-color: #0066a0;
    border-radius: 999px;
    filter: blur(7.5px);
    opacity: 0.85;
  }

  &.female-inactive {
    background-color: #e06bb7;
    border-radius: 999px;
    filter: blur(7.5px);
    opacity: 0.85;
  }

  &.female-dead .blur,
  &.female-dead-inactive .blur,
  &.male .blur,
  &.male-dead-inactive .blur,
  &.male-dead .blur,
  &.female .blur,
  &.male-inactive .blur,
  &.female-inactive .blur {
    border-color: #e480c20a;
  }

  &.male .blur,
  &.male-dead-inactive .blur,
  &.male-dead .blur,
  &.male-inactive .blur {
    border-color: #80c2e40a;
  }
`;

export const NodePicture = ({
  gender,
  imageSrc,
  isDead,
  isInActive: isActive,
  className,
  size = "100px",
  ...props
}: NodePictureProps) => {
  const genderClass = `${gender}${isDead ? "-dead" : ""}${
    isActive ? "-inactive" : ""
  }`;
  return (
    <StyledNodePicture size={size} className={`${genderClass}`} {...props}>
      <div className={`profile-clip w-full h-full ${className}`}>
        <img
          className={`profile-picture ${isDead ? "dead-overlay" : ""}`}
          alt="Profile picture"
          src={imageSrc}
        />
      </div>
    </StyledNodePicture>
  );
};
