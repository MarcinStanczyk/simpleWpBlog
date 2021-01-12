import Link from "next/link";

type Props = {
  id: string;
  title: string;
  url: string;
  img: any;
};

const PostPreview = ({ id, title, url, img }: Props) => {
  const slugUrl = new URL({ url }.url);
  let slug = slugUrl.pathname.split("/");
  let slugHref = `/${slug[slug[1]]}/${slug[slug.length - 2]}/${slug[slug.length - 1]}`
  return (
    <Link href={`${slugHref}`} as={`${slugHref}`}>
      <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden bg-accent-1  hover:border-pink-600 cursor-pointer">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={img.url}
          alt="wp.pl"
        />
        <div className="p-6">
          <h2 className="title-font text-lg font-medium mb-3">{title}</h2>
        </div>
      </div>
    </Link>
  );
};

export default PostPreview;
