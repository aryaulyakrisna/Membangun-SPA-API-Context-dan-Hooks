import { Routes, Route } from "react-router-dom";
import Error404 from "./pages/Error404";
import Notes from "./pages/Notes";
import ArchivedNotes from "./pages/ArchivedNotes";

import ErrorBoundary from "./components/ErrorBoundary";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";

import useLang from "./hooks/useLang";
import useAuth from "./hooks/useAuth";
import SingleNote from "./pages/SingleNote";

function App() {
  const { lang } = useLang();
  const { auth } = useAuth();

  const displayPage = (children) => {
    return auth ? (
      <ErrorBoundary lang={lang}>{children}</ErrorBoundary>
    ) : (
      <ErrorBoundary lang={lang}>
        <Login />
      </ErrorBoundary>
    );
  };

  return (
    <>
      <Header />
      <main className="w-full max-w-7xl min-h-screen mt-32 pb-16 p-5">
        <Routes>
          <Route
            path="/login"
            element={
              <ErrorBoundary lang={lang}>
                <Login />
              </ErrorBoundary>
            }
            errorElement={<Error />}
          />
          <Route
            path="/register"
            element={
              <ErrorBoundary lang={lang}>
                <Register />
              </ErrorBoundary>
            }
            errorElement={<Error />}
          />
          <Route
            path="/"
            element={displayPage(<Notes />)}
            errorElement={<Error />}
          />
          <Route
            path="/search"
            element={displayPage(<Notes />)}
            errorElement={<Error />}
          />
          <Route
            path="/archive"
            element={displayPage(<ArchivedNotes />)}
            errorElement={<Error />}
          />
          <Route
            path="/archive/search"
            element={displayPage(<ArchivedNotes />)}
            errorElement={<Error />}
          />
          <Route
            path="/edit/:id"
            element={displayPage(<SingleNote />)}
            errorElement={<Error />}
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
