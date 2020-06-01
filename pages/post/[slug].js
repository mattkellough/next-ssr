import React from "react";
import { client } from "../../lib/contentful";
import Link from "next/link";
import marked from "marked";

const BlogPost = ({ entry }) => {
  const { author, body, description, heroImage, title } = entry.items[0].fields;
  const imgUrl = heroImage.fields.file.url;
  return (
    <div>
      <h1>{title}</h1>
      <img src={imgUrl} width="100%" />
      <div dangerouslySetInnerHTML={{ __html: marked(body) }}></div>
    </div>
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

  return { props: { entry } };
};

export default BlogPost;
