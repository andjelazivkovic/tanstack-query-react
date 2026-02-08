import { useEffect, useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { fetchPostById } from '../api/postsApi';

type Post = {
  id: number;
  title: string;
  body: string;
};

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetchPostById(Number(id))
      .then(setPost)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>

      <Link to={`/use-effect?page=${page}`}>
        ⬅ Back to posts (page {page})
      </Link>
    </div>
  );
};

export default PostDetails;
