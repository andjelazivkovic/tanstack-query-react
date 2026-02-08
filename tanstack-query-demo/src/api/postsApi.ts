const BASE_URL = 'https://dummyjson.com';

export const fetchPosts = async (page = 1, limit = 5) => {
  const skip = (page - 1) * limit;

  const res = await fetch(
    `${BASE_URL}/posts?limit=${limit}&skip=${skip}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
};

export const fetchPostById = async (id) => {
  const res = await fetch(`${BASE_URL}/posts/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }

  return res.json();
};

export const updatePost = async (
  id: number,
  data: { title?: string; body?: string }
) => {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to update post');
  }

  return res.json();
};

export const addPost = async (post) => {
  const res = await fetch(`${BASE_URL}/posts/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });

  if (!res.ok) {
    throw new Error('Failed to add post');
  }

  return res.json();
};
