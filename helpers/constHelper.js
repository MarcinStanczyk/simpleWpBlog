// use commonjs so it can be required without transpiling

const path = require("path");

const BLOG_INDEX_CACHE = path.resolve(".posts_data");
const POST_SOURCE = "https://mobileapi.wp.pl/v1/graphql";
const CACHE_POSTS = true;
const POSTS_LIMIT = 15

module.exports = {
  BLOG_INDEX_CACHE,
  POST_SOURCE,
  CACHE_POSTS,
};
