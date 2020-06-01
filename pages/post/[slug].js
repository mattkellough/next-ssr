import React from "react";
import { client } from "../../lib/contentful";
import Link from "next/link";
import marked from "marked";
import moment from "moment";

const BlogPost = ({ entry, date }) => {
  const { author, body, description, heroImage, title } = entry.items[0].fields;
  const imgUrl = heroImage.fields.file.url;
  return (
    <main>
      <nav>
        <Link href="/">
          <a>Back Home</a>
        </Link>
      </nav>
      <div>
        <h1>
          {title} : {date}
        </h1>
        <img src={imgUrl} width="100%" />
        <div dangerouslySetInnerHTML={{ __html: marked(body) }}></div>
      </div>
    </main>
  );
};

export const getStaticPaths = async () => {
  const entries = await client.getEntries({
    content_type: "blogPost",
  });

  const paths = entries.items.map((entry) => {
    const { slug } = entry.fields;

    return {
      params: { slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const entry = await client.getEntries({
    content_type: "blogPost",
    "fields.slug[in]": slug,
  });

  const date = moment().format("MMMM Do YYYY, h:mm:ss a");

  return { props: { entry, date } };
};

export default BlogPost;
