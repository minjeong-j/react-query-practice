import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 새 게시글 생성 함수
function createPost(newPost) {
  return fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost),
  }).then((res) => res.json());
}

// 게시글 수정 함수
function updatePost(updatedPost) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPost),
  }).then((res) => res.json());
}

function CreateOrUpdatePost() {
  const [postId, setPostId] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const queryClient = useQueryClient();

  // 생성/수정 Mutation
  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']); // 게시글 목록 새로고침
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  const handleCreate = () => {
    createMutation.mutate({ title, body });
  };

  const handleUpdate = () => {
    updateMutation.mutate({ id: Number(postId), title, body });
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <div>
        <input
          type="text"
          placeholder="Post ID (for update)"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{ marginRight: '10px' }}
        />
      </div>
      <button onClick={handleCreate} style={{ marginRight: '10px' }}>
        Create Post
      </button>
      <button onClick={handleUpdate}>Update Post</button>

      <div style={{ marginTop: '10px' }}>
        {createMutation.isLoading && <p>Creating post...</p>}
        {createMutation.isSuccess && <p>Post created successfully!</p>}

        {updateMutation.isLoading && <p>Updating post...</p>}
        {updateMutation.isSuccess && <p>Post updated successfully!</p>}
      </div>
    </div>
  );
}

export default CreateOrUpdatePost;