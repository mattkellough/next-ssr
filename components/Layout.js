import React from "react";
import Head from "next/head";
import Link from "next/link";
import Date from "./Date";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>SSR App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Link href="/">
          <a>Home</a>
        </Link>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
