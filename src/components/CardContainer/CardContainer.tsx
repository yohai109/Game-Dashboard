import { ReactNode } from "react";
import styles from "./CardContainer.module.css";

interface CardContainerProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const CardContainer = ({
  children,
  className = "",
  onClick,
  ...props
}: CardContainerProps) => {
  const containerClass = `${styles.card} ${className}`.trim();
  return (
    <article className={containerClass} onClick={onClick} {...props}>
      {children}
    </article>
  );
};
