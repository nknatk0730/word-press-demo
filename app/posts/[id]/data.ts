import { POSTS_ENDPOINT_URL } from '@/lib/wp';
import { Post } from '@/types/post';
import 'server-only';

export const getPost = async (id: string) => {
  const res = await fetch(POSTS_ENDPOINT_URL + '/' + id, {
    cache: 'no-store',
  });
  const post: Post = await res.json();

  return post;
};