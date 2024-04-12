import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ProductsListProvider from './contexts/listsContext';
import { lazy, Suspense } from 'react';
import { RootLayout } from './layouts';
import { DynamicBlogCrumb } from './components';
import DynamicStoreCollectionCrumb from './components/DynamicStoreCollectionCrumb/DynamicStoreCollectionCrumb';
const ErrorPage = lazy(() => import('./pages/ErrorPage/ErrorPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const BlogsPage = lazy(() => import('./pages/BlogsPage/BlogsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage/BlogPage'));
const ProductPage = lazy(() => import('./pages/ProductPage/ProductPage'));
const ContactPage = lazy(() => import('./pages/ContactPage/ContactPage'));
const ComparePage = lazy(() => import('./pages/ComparePage/ComparePage'));
const CartPage = lazy(() => import('./pages/CartPage/CartPage'));
const AccountPage = lazy(() => import('./pages/AccountPage/AccountPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage/WishlistPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage/CheckoutPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage/ProductsPage'));

const PageLoader = (
  <div
    style={{
      backgroundColor: 'white',
      padding: '20px',
      textAlign: 'center',
    }}
  >
    Loading
  </div>
);
// TODO: Protected Routes

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<RootLayout />}
        handle={{
          crumb: 'home',
        }}
      >
        <Route
          errorElement={
            <Suspense fallback={PageLoader}>
              <ErrorPage />
            </Suspense>
          }
        >
          <Route index element={<HomePage />} />
          <Route
            path="store"
            handle={{
              crumb: 'store',
            }}
          >
            <Route
              index
              element={
                <Suspense fallback={PageLoader}>
                  <ProductsPage />
                </Suspense>
              }
            />
            <Route
              path=":prefix"
              element={
                <Suspense fallback={PageLoader}>
                  <ProductsPage />
                </Suspense>
              }
              handle={{
                crumb: <DynamicStoreCollectionCrumb />,
              }}
            />
          </Route>
          {/* TODO: make breadcrumb for products page */}
          <Route path="products" element={<Navigate to="/store" replace />} />
          <Route
            path="products/:id"
            element={
              <Suspense fallback={PageLoader}>
                <ProductPage />
              </Suspense>
            }
          />
          <Route
            path="compare"
            element={
              <Suspense fallback={PageLoader}>
                <ComparePage />
              </Suspense>
            }
            handle={{
              crumb: 'compare',
            }}
          />
          <Route
            path="wishlist"
            element={
              <Suspense fallback={PageLoader}>
                <WishlistPage />
              </Suspense>
            }
            handle={{
              crumb: 'wishlist',
            }}
          />
          <Route
            path="cart"
            element={
              <Suspense fallback={PageLoader}>
                <CartPage />
              </Suspense>
            }
            handle={{
              crumb: 'cart',
            }}
          />
          {/* ===protected if not loggedin=== */}
          <Route
            path="account"
            element={
              <Suspense fallback={PageLoader}>
                <AccountPage />
              </Suspense>
            }
            handle={{
              crumb: 'account',
            }}
          />
          <Route
            path="checkout"
            element={
              <Suspense fallback={PageLoader}>
                <CheckoutPage />
              </Suspense>
            }
            handle={{
              crumb: 'checkout',
            }}
          />
          {/* //===protected===//  */}
          {/* ===protected if loggedin already=== */}
          <Route
            path="login"
            element={
              <Suspense fallback={PageLoader}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="register"
            element={
              <Suspense fallback={PageLoader}>
                <RegisterPage />
              </Suspense>
            }
          />
          {/* //===protected if loggedin already===// */}
          <Route
            path="blogs"
            handle={{
              crumb: 'news',
            }}
          >
            <Route
              index
              element={
                <Suspense fallback={PageLoader}>
                  <BlogsPage />
                </Suspense>
              }
            />
            <Route
              path=":id"
              element={
                <Suspense fallback={PageLoader}>
                  <BlogPage />
                </Suspense>
              }
              handle={{
                crumb: <DynamicBlogCrumb />,
              }}
            />
          </Route>
          <Route
            path="contact"
            element={
              <Suspense fallback={PageLoader}>
                <ContactPage />
              </Suspense>
            }
            handle={{
              crumb: 'contact',
            }}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </>
  )
);

function App() {
  return (
    <ProductsListProvider>
      <RouterProvider router={router} />
    </ProductsListProvider>
  );
}

export default App;
