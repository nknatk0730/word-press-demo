import Link from "next/link";
import { getPosts } from "./data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default async function Page({
  searchParams: {
    page = 1,
  }
}: {
  searchParams: {
    page: number;
  }
}) {
  const {posts, totalPageCount} = await getPosts(page);

  return (
    <>
      <h1 className="font-bold text-xl mb-6">Article List</h1>
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
      <div className="flex justify-between mt-6">
        {page > 1 ? (
          <Button asChild size="icon" variant="outline">
            <Link href={`/posts?page=${Number(page) - 1}`}>
              <ChevronLeft size={20} />
              <span className="sr-only">back</span>
            </Link>
          </Button>
        ) : (
          <span></span>
        )}
        {totalPageCount > page && (
          <Button asChild size="icon" variant="outline">
            <Link href={`/posts?page=${Number(page) + 1}`}>
              <ChevronRight size={20} />
              <span className="sr-only">next</span>
            </Link>
          </Button>
        )}
      </div>
    </>
  );
}
