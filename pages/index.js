import Head from "next/head";
import Link from "next/link";
import { client } from "../lib/contentful";

const Home = ({ allPosts }) => {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {allPosts.map(({ slug, title }) => {
          return (
            <div key={slug}>
              <h2>{title}</h2>
              <Link href="/post/[slug]" as={`/post/${slug}`}>
                <a>Go here</a>
              </Link>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export const getStaticProps = async (ctx) => {
  const entries = await client.getEntries({
    content_type: "blogPost",
  });

  return { props: { allPosts: entries.items.map((e) => e.fields) } };
};

export default Home;
