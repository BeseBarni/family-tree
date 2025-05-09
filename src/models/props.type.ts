import { PropsWithChildren } from "react";

export type Props = {
  [key: string]: any;
};

export type DialogProps = {
  id: string;
  title?: string;
} & PropsWithChildren;
