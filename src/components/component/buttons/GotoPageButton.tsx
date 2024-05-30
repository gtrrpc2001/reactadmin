import React from "react";

type Props = {
  className: string;
  onClick: (updater: number | ((pageIndex: number) => number)) => void;
  pageCount: number;
  disabled: boolean;
  children: string;
};

export const GotoPageButton = ({
  className,
  onClick,
  pageCount,
  disabled,
  children,
}: Props) => {
  return (
    <button
      className={className}
      onClick={() => onClick(pageCount)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
