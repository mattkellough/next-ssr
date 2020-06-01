import React from "react";
import Head from "next/head";
import moment from "moment";
import Link from "next/link";

const Layout = ({ children }) => {
  const date = moment().utcOffset("-0400").format("MMMM Do YYYY, h:mm:ss a");

  return (
    <>
      <Head>
        <title>SSR App - {date}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Link href="/">
          <a>Home</a>
        </Link>
        <div>
          <p>Time Rendered: {date}</p>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
