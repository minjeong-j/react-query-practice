import React from 'react';
import { useQuery } from '@tanstack/react-query';

function fetchPosts() {
  return fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
    res.json()
  );
}

function Posts() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts'], // 쿼리 키
    queryFn: fetchPosts, // 서버 데이터 패칭 함수
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error fetching posts</p>;

  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        textAlign: 'left',
      }}
    >
      <thead>
        <tr style={{ backgroundColor: '#f4f4f4' }}>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Title</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Body</th>
        </tr>
      </thead>
      <tbody>
        {data.slice(0, 10).map((post) => (
          <tr key={post.id}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{post.id}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{post.title}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{post.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Posts;
