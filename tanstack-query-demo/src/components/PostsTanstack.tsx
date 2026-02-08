import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addPost, fetchPosts } from '../api/postsApi';
import { styles } from './PostsUseEffect';

type Post = {
  id: number;
  title: string;
};

const LIMIT = 5;

const PostsTanstack = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get('page')) || 1;

  const [page, setPage] = useState(initialPage);
  const [newTitle, setNewTitle] = useState('');

  const {
    data,
    isLoading,
    error,
    } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => fetchPosts(page, LIMIT),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    });


  const { mutate: createPost, isPending } = useMutation({
    mutationFn: addPost,
    onSuccess: (newPost) => {
      /**
       * Optimistic update (lokalni cache update)
       * jer DummyJSON ne perzistira podatke
       */
      queryClient.setQueryData(['posts', page], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          posts: [newPost, ...old.posts].slice(0, LIMIT),
        };
      });

      queryClient.invalidateQueries({ queryKey: ['posts'] });

      setNewTitle('');
    },
  });

  const handleAddPost = () => {
    if (!newTitle.trim()) return;

    createPost({
      title: newTitle,
      body: 'Demo post body',
      userId: 1,
    });
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    setSearchParams({ page: nextPage.toString() });
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h2 style={styles.title}>Posts – TanStack Query</h2>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="New post title"
            style={{ flex: 1, padding: 8 }}
          />
          <button onClick={handleAddPost} disabled={isPending}>
            {isPending ? 'Adding...' : 'Add'}
          </button>
        </div>

        {isLoading && <p style={styles.info}>Loading...</p>}
        {error && <p style={styles.error}>Something went wrong</p>}

        <ul style={styles.list}>
          {data?.posts.map((post: Post) => (
            <li key={post.id} style={styles.listItem}>
              <span>{post.title}</span>
              <Link
                to={`/posts/${post.id}?page=${page}`}
                style={styles.link}
              >
                Details →
              </Link>
            </li>
          ))}
        </ul>

        <div style={styles.pagination}>
          <button
            onClick={() => handlePageChange(Math.max(page - 1, 1))}
            disabled={page === 1}
            style={{
              ...styles.button,
              ...(page === 1 ? styles.buttonDisabled : {}),
            }}
          >
            Previous
          </button>

          <span style={styles.pageInfo}>Page {page}</span>

          <button
            onClick={() => handlePageChange(page + 1)}
            style={styles.button}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsTanstack;
