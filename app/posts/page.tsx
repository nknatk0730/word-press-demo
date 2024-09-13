import Link from "next/link";
import { getPosts } from "./data"

export default async function Page() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Article List</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>
            <Link href={`/posts/${post.id}`}>{post.title.rendered}</Link>
          </h2>
        </div>
      ))}
    </div>
  )
}
