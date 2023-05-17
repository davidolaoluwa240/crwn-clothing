// Modules
import React, { FC } from "react";

// Hooks
import { useNavigate } from "react-router-dom";

// Style
import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from "./directory-item.styles";

type DirectoryItemProps = {
  imageUrl: string;
  title: string;
  route: string;
};

export const DirectoryItem: FC<DirectoryItemProps> = ({
  imageUrl,
  title,
  route,
}) => {
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};
