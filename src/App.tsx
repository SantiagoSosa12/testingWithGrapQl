import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './Header';
import RepoPage from './repoPage/RepoPage';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <RepoPage />
    </QueryClientProvider>
  );
}

export default App;
