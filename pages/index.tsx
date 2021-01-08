import Head from "next/head";
import PostPreview from "../components/post-preview";
import Layout from "../components/layout";
import Container from "../components/container";
import { getTileset } from "../helpers/querys";

export default function Home(props) {
  let postsGallery = props.data.tilesetsGallery.map((post, indx) => (
    <PostPreview
      key={post.id}
      id={post.id}
      title={post.title}
      url={post.url}
      img={post.img}
    />
  ));
  let postsArticle = props.data.tilesetsArticle.map((post, indx) => (
    <PostPreview
      key={post.id}
      id={post.id}
      title={post.title}
      url={post.url}
      img={post.img}
    />
  ));

  return (
    <Layout>
      <Head>
        <title>Sport.</title>
      </Head>

      <Container>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
          Sport.Wp
        </h1>

        <div
          className="grid
                grid-cols-1
                md:grid-cols-3
                lg:grid-cols-3
                md:col-gap-2
                lg:col-gap-2
                row-gap-2
                md:row-gap-2
                mb-2
                bg-green-200
                p-5"
        >
          {postsGallery}
        </div>

        <div
          className="grid
                grid-cols-1
                md:grid-cols-3
                lg:grid-cols-3
                md:col-gap-2
                lg:col-gap-2
                row-gap-2
                md:row-gap-2
                mb-2
                bg-accent-2
                p-5 "
        >
          {postsArticle}
        </div>
      </Container>

      <footer></footer>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const params = ["limit: 15"];
  const data = await getTileset(params);
  return {
    props: data,
    revalidate: 10,
  };
}
