import {
  createBrowserRouter,
  createRoutesFromElements,
  LoaderFunctionArgs,
  Route,
  RouterProvider,
} from "react-router-dom";

import { lazy, Suspense } from "react";
// import ModalProvider from "@components/common/ui/BaseModal/ModalProvider";
// import // DynamicBlogCrumb,
// // DynamicStoreCollectionCrumb,s
// "@components/common/ui";
import { RootLayout } from "layouts";
import Error from "@pages/Error/Error";
import OverlayableManager from "@components/common/ui/OverlayableManager/OverlayableManager";
import { QueryParamsManager } from "@components/common/utils";
// FIXME: find better way than redundant code
const HomePage = lazy(() => import("@pages/Home/Home"));
const LoginPage = lazy(() => import("@pages/Login/Login"));
const RegisterPage = lazy(() => import("@pages/Register/Register"));
const BlogsPage = lazy(() => import("@pages/Blogs/Blogs"));
const BlogPage = lazy(() => import("@pages/Blog/Blog"));
const ProductPage = lazy(() => import("@pages/Product/Product"));
const ContactPage = lazy(() => import("@pages/Contact/Contact"));
const ComparePage = lazy(() => import("@pages/Compare/Compare"));
const CartPage = lazy(() => import("@pages/Cart/Cart"));
const AccountPage = lazy(() => import("@pages/Account/Account"));
const WishlistPage = lazy(() => import("@pages/Wishlist/Wishlist"));
const CheckoutPage = lazy(() => import("@pages/Checkout/Checkout"));
const ProductsPage = lazy(() => import("@pages/Products/Products"));
const SearchPage = lazy(() => import("@pages/Search/Search"));

const validatePageParameter = ({ params }: LoaderFunctionArgs) => {
  if (params.id && isNaN(+params.id)) {
    throw new Response("Bad Request", {
      status: 400,
      statusText: "Blog not found",
    });
  }
  return null;
};

const PageLoader = (
  <div
    style={{
      backgroundColor: "white",
      padding: "20px",
      textAlign: "center",
    }}
  >
    Loading
  </div>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<QueryParamsManager />}>
      <Route element={<OverlayableManager />}>
        <Route path="/" element={<RootLayout />}>
          <Route errorElement={<Error />}>
            <Route
              index
              element={
                <Suspense fallback={PageLoader}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path="/store/:catPrefix"
              element={
                <Suspense fallback={PageLoader}>
                  <ProductsPage />
                </Suspense>
              }
              // FIXME:
              // handle={{
              //   crumb: <DynamicStoreCollectionCrumb />,
              // }}
            />
            <Route
              path="/store"
              element={
                <Suspense fallback={PageLoader}>
                  <ProductsPage />
                </Suspense>
              }
              // FIXME:
              // handle={{
              //   crumb: <DynamicStoreCollectionCrumb />,
              // }}
            />
            <Route
              path="/search"
              element={
                <Suspense fallback={PageLoader}>
                  <SearchPage />
                </Suspense>
              }
            />
            <Route
              path="/products/:productSlug"
              element={
                <Suspense fallback={PageLoader}>
                  <ProductPage />
                </Suspense>
              }
            />
            <Route
              path="/compare"
              element={
                <Suspense fallback={PageLoader}>
                  <ComparePage />
                </Suspense>
              }
            />
            <Route
              path="/wishlist"
              element={
                <Suspense fallback={PageLoader}>
                  <WishlistPage />
                </Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense fallback={PageLoader}>
                  <ContactPage />
                </Suspense>
              }
            />
            <Route
              path="/cart"
              element={
                <Suspense fallback={PageLoader}>
                  <CartPage />
                </Suspense>
              }
            />
            {/* ===protected if not loggedin=== */}
            <Route
              path="/account"
              element={
                <Suspense fallback={PageLoader}>
                  <AccountPage />
                </Suspense>
              }
            />
            <Route
              path="/checkout"
              element={
                <Suspense fallback={PageLoader}>
                  <CheckoutPage />
                </Suspense>
              }
            />
            {/* //===protected===//  */}
            {/* ===protected if loggedin already=== */}
            <Route
              path="/login"
              element={
                <Suspense fallback={PageLoader}>
                  <LoginPage />
                </Suspense>
              }
            />
            <Route
              path="/register"
              element={
                <Suspense fallback={PageLoader}>
                  <RegisterPage />
                </Suspense>
              }
            />
            {/* //===protected if loggedin already===// */}
            <Route
              path="/blogs"
              element={
                <Suspense fallback={PageLoader}>
                  <BlogsPage />
                </Suspense>
              }
            />

            <Route
              path="/blogs/:id"
              loader={validatePageParameter}
              element={
                <Suspense fallback={PageLoader}>
                  <BlogPage />
                </Suspense>
              }
              // FIXME:
              // handle={{
              //   crumb: <DynamicBlogCrumb />,
              // }}
            />
            <Route
              path="*"
              element={<div>not found pageeeeeeeeeeee</div>}
              // loader={() => {
              //   throw new Response("Page not found", {
              //     status: 404,
              //     statusText: "The page you are looking for is not found.",
              //   });
              // }}
            />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);
const AppRouter = () => <RouterProvider router={router} />;
export default AppRouter;
