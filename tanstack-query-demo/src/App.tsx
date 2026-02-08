import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import PostsUseEffect from './components/PostsUseEffect';
import PostDetails from './components/PostDetails';
import PostsTanstack from './components/PostsTanstack';


const App = () => {
  return (
    <BrowserRouter>
      <div style={styles.appLayout}>
        <nav style={styles.nav}>
          <Link to="/use-effect">useEffect</Link>
          <Link to="/tanstack">TanStack</Link>
        </nav>


        <main style={styles.main}>
          <Routes>
            <Route path="/" element={<Navigate to="/use-effect" />} />
            <Route path="/use-effect" element={<PostsUseEffect />} />
            <Route path="/tanstack" element={<PostsTanstack />} />
            <Route path="/posts/:id" element={<PostDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

const styles = {
  appLayout: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  nav: {
    padding: 16,
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'center',
    gap: 16,
  },
  main: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default App;
