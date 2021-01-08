import { useRouter } from "next/router";
import ReactHtmlParser from "react-html-parser";

import { getTileset, getPostDetails } from "../../../helpers/querys";

export default function ArticleDetail({ article }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading......</div>;
  }

  let mainArticleData = article.article.htmlBody
    .map((el, indx) => {
      return el.data;
    })
    .join(" ");

  return (
    <>
      <div className="text-center pt-6 md:pt-12">
        <h1 className="font-bold break-normal text-3xl md:text-5xl">
          {article.article.title}
        </h1>
      </div>

      <div className="container w-full max-w-6xl mx-auto bg-white bg-cover mt-8 rounded image-bg"></div>

      <style jsx>{`
        .image-bg {
          background-image: url("${article.article.img.url}");
          background-position: top center;
          height: ${article.article.img.h}px;
          width: ${article.article.img.w}px;
        }
      `}</style>

      <div className="container max-w-5xl mx-auto -mt-32">
        <div className="mx-0 sm:mx-6">
          <div className="bg-white w-full p-8 md:p-24 text-xl md:text-2xl text-gray-800 leading-normal">
            <p className="text-2xl md:text-3xl mb-5">
              {article.article.plainBody[0].data}
            </p>

            <div className="mainBlockPost">
              {ReactHtmlParser(mainArticleData)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  const params = ["limit: 10"];
  const posts = await getTileset(params);
  const allPosts = [
    ...posts.data.tilesetsArticle,
    ...posts.data.tilesetsGallery,
  ];

  // Get the paths we want to pre-render based on posts
  const paths = allPosts.map((post) => {
    const slugUrl = new URL(post.url);
    let slug = slugUrl.pathname.split("/");
    return {
      params: {
        tag: slug[1],
        id: slug[2],
        slug: slug[3],
      },
    };
  });

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// Get the data for each blog [tag]

export async function getStaticProps(context) {
  const params = ["limit: 10"];
  const posts = await getTileset(params);
  const allPosts = [
    ...posts.data.tilesetsArticle,
    ...posts.data.tilesetsGallery,
  ];
  const post = allPosts.filter((el) => {
    const slugUrl = new URL(el.url);
    let slug = slugUrl.pathname;
    let result =
      slug ===
      `/${context.params.tag}/${context.params.id}/${context.params.slug}`;
    return result;
  });
  const articleData = await getPostDetails(post[0].url);
  return {
    props: {
      article: articleData.data,
    },
    revalidate: 10,
  };
}
