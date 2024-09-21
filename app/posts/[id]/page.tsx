import { format } from "date-fns";
import { getPost } from "./data";

export default async function Page({
  params: {
    id,
  },
}: {
  params: {
    id: string;
  }
}) {
  const post = await getPost(id);

  return (
    <article className="prose prose-neutral prose-sm dark:prose-invert dark:prose-pre:border prose-li:text-sky-500">
      <div className="not-prose">
        <h1 className="font-bold text-3xl mb-2">{post.title.rendered}</h1>
        <p className="text-muted-foreground">
          {format(new Date(post.date), "yyyy/MM/dd")}
        </p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </article>
  );
}