import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { searchPosts } from "../posts/data";


export default async function Page({
  searchParams: {
    keyword,
  }
}: {
  searchParams: {
    keyword: string;
  }
}) {
  const { posts, totalPageCount } = await searchPosts(keyword);

  return (
    <>
      <h1 className="font-bold mb-6 text-3xl">{keyword} results</h1>
      {posts.length === 0 ? (
        <p className="text-muted-foreground">0 result</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
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
                  {format(new Date(post.date), "yyyy/MM/dd")}
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
        </div>
      )}
    </>
  );
}
