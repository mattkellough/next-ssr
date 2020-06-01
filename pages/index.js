import Link from "next/link";
import { client } from "../lib/contentful";

const Home = ({ allPosts }) => {
  return (
    <div>
      <Date />
      <div>
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
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const entries = await client.getEntries({
    content_type: "blogPost",
  });

  return { props: { allPosts: entries.items.map((e) => e.fields) } };
};

export default Home;
