import { BLOG_INDEX_CACHE, POST_SOURCE, CACHE_POSTS } from "./constHelper";
import fs from "fs";
import { promisify } from "util";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export async function getTileset(params) {
  let postsCache: any = null;
  const useCache = CACHE_POSTS;
  const cacheFile = `${BLOG_INDEX_CACHE}`;
  const writeFile = promisify(fs.writeFile);

  const client = new ApolloClient({
    uri: `${POST_SOURCE}`,
    cache: new InMemoryCache(),
  });

  try {
    postsCache = await client.query({
      query: gql`
        {
                  tilesetsArticle: tileset(t: Article, ${params}) {
                    id,
                    cid,
                    src,
                    url,
                    title,
                    img {
                      url
                    },
                  }
                  tilesetsGallery: tileset(t: Gallery, ${params}) {
                    id,
                    cid,
                    src,
                    url,
                    title,
                    img {
                      url
                    },
                  }
        }
        `,
    });
  } catch (err) {
    console.warn(`Failed to load data`);
  }

  if (useCache) {
    try {
      writeFile(cacheFile, JSON.stringify(postsCache), "utf8").catch(() => {});
    } catch {
      console.warn(`Failed to write file data`);
    }
  }

  return postsCache;
}

export async function getPostDetails(url) {
  let postsDetail: any = null;

  const client = new ApolloClient({
    uri: `${POST_SOURCE}`,
    cache: new InMemoryCache(),
  });

  try {
    postsDetail = await client.query({
      query: gql`
        {
                  article(url: "${url}"){
            id,
            cid,
            url,
            ts,
            title,
            redacted_title,
            img {
              url
              original_url
              author
              b64
              source
              description
              title
              w
              h
            },
            entities {
              author
              description
              title
            },
            t,
            src,
            tags,
            author {
              img
              name
            },
            apology,
            plainBody: body(t: Plain) {
              data,
              params {
                id
              },
            },
            htmlBody: body(t: HTML) {
              data,
              params {
                id
              },
              t
            },
          }
        }
        `,
    });
  } catch (err) {
    console.warn(`Failed to load data`);
  }

  return postsDetail;
}
