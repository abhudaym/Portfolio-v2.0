import { motion } from "framer-motion";
import Head from "next/head";

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 },
};

const Layout = ({ children, title }) => {
  return (
    <article style={{ position: "relative" }}>
      <>
        {title && (
          <Head>
            <title>{title} - Abhuday Mishra</title>
          </Head>
        )}
        {children}
      </>
    </article>
  );
};

export default Layout;
