import { POSTS_ENDPOINT_URL } from '@/lib/wp';
import { Post } from '@/types/post';
import 'server-only';

export const searchPosts = async (keyword: string) => {
  const res = await fetch(POSTS_ENDPOINT_URL + `?search=${keyword}`, {
    cache: 'no-store',
  });
  const totalPageCount = res.headers.get('X-WP-TotalPages');

  return {
    posts: (await res.json()) as Post[],
    totalPageCount: Number(totalPageCount), 
}
};