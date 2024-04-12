import { Outlet, useLocation } from 'react-router-dom';
import './RootLayout.scss';
import { Breadcrumb, Footer, Navbar, NewsLetter } from '../../components';
import { ModalProvider } from '../../contexts/modalContext';

function RootLayout() {
  const location = useLocation();
  return (
    <div className="app">
      <Navbar />
      {location.pathname !== '/' && <Breadcrumb />}
      <ModalProvider>
        <Outlet />
      </ModalProvider>
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default RootLayout;
