import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { addPost, fetchPosts } from '../api/postsApi';

type Post = {
  id: number;
  title: string;
};

const PostsUseEffect = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get('page')) || 1;

  const [newTitle, setNewTitle] = useState('');
  const [adding, setAdding] = useState(false);


  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(initialPage);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchPosts(page)
      .then((data) => {
        setPosts(data.posts);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    setSearchParams({ page: page.toString() });
  }, [page, setSearchParams]);

  const handleAddPost = async () => {
    if (!newTitle.trim()) return;

    setAdding(true);
    try {
      const newPost = await addPost({
        title: newTitle,
        body: 'Demo post body',
        userId: 1,
      });

      setPosts((prev) => [newPost, ...prev].slice(0, 5));

      setNewTitle('');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h2 style={styles.title}>Posts – useEffect approach</h2>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New post title"
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={handleAddPost} disabled={adding}>
          {adding ? 'Adding...' : 'Add'}
        </button>
      </div>

        {loading && <p style={styles.info}>Loading...</p>}
        {error && <p style={styles.error}>{error}</p>}

        <ul style={styles.list}>
          {posts.map((post) => (
            <li key={post.id} style={styles.listItem}>
              <span>{post.title}</span>
              <Link to={`/posts/${post.id}?page=${page}`} style={styles.link}>
                Details →
              </Link>
            </li>
          ))}
        </ul>

        <div style={styles.pagination}>
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            style={{
              ...styles.button,
              ...(page === 1 ? styles.buttonDisabled : {})
            }}
          >
            Previous
          </button>

          <span style={styles.pageInfo}>Page {page}</span>

          <button
            onClick={() => setPage((p) => p + 1)}
            style={styles.button}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );

};

export const styles: Record<string, React.CSSProperties> = {
  pageWrapper: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },

  container: {
    maxWidth: 700,
    width: '100%',
    padding: 24,
    fontFamily: 'system-ui, sans-serif',
    backgroundColor: '#fff',
    borderRadius: 8,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
  },

  title: {
    marginBottom: 24,
    paddingBottom: 12,
    borderBottom: '1px solid #ddd',
    textAlign: 'center',
  },

  info: {
    color: '#555',
    textAlign: 'center',
    marginBottom: 12,
  },

  error: {
    color: '#c0392b',
    marginBottom: 12,
    textAlign: 'center',
  },

  list: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 24px 0',
  },

  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 14px',
    borderBottom: '1px solid #eee',
  },

  link: {
    textDecoration: 'none',
    color: '#3498db',
    fontSize: 14,
    fontWeight: 500,
  },

  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },

  pageInfo: {
    fontWeight: 500,
  },

  button: {
    padding: '8px 16px',
    borderRadius: 6,
    border: '1px solid #ccc',
    background: '#fff',
    cursor: 'pointer',
    fontSize: 14,
  },

  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};


export default PostsUseEffect;
