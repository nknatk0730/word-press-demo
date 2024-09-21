import Link from "next/link";
import { getPosts } from "./data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default async function Page() {
  const posts = await getPosts();

  return (
    <>
      <h1 className="font-bold text-xl mb-6">Article List</h1>
      {posts.map((post) => (
        <Card key={post.id} className="relative">
          <CardHeader>
            <CardTitle>
              <Link href={`/posts/${post.id}`}>
                {post.title.rendered}
                <span className="absolute inset-0"></span>
              </Link>
            </CardTitle>
            <p className="text-muted-foreground">
              {format(new Date(post.date), 'yyyy/MM/dd')}
            </p>
          </CardHeader>
          <CardContent>
            <p
              className={cn(
                post.jetpack_featured_media_url
                  ? "line-clamp-3"
                  : "line-clamp-6"
              )}
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />

            {post.jetpack_featured_media_url && (
              <Image
                src={post.jetpack_featured_media_url}
                className="aspect-video rounded-md mt-6 bg-muted object-cover object-center"
                alt=""
                width={800}
                height={400}
              />
            )}
          </CardContent>
        </Card>
      ))}
    </>
  );
}
