import React from "react";

interface SimpleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SimpleButton: React.FC<SimpleButtonProps> = props => {
  return <button {...props}>{props.children}</button>;
};

export default SimpleButton;
