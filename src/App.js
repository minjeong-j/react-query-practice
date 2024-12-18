import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Posts from './Posts';
import CreateUpdatePost from './CreateUpdatePost';

// React Query Client 생성
const queryClient = new QueryClient();

function App() {
	return (
    <QueryClientProvider client={queryClient}>
    	<div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>React Query 과제</h1>
        <h2>1. 서버에서 데이터를 패칭하여 화면에 표시</h2>
        <Posts />
              
        <h2>2. 데이터를 생성하거나 수정하는 버튼</h2>
        <CreateUpdatePost />
              
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </QueryClientProvider>
	)
}

export default App;