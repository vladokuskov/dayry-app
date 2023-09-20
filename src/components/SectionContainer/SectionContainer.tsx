import { ReactNode } from "react";
import styles from "./Section.module.css";

type ISectionContainer = {
  title: string;

  children: ReactNode;
};

function SectionContainer({ title, children }: ISectionContainer) {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.content}>{children}</div>
    </section>
  );
}

export default SectionContainer;
