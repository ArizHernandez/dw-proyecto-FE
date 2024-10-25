import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-9xl font-bold text-blue-600">404</h1>
      <h2 className="text-3xl mt-4 font-semibold">Page Not Found</h2>
      <p className="text-lg text-gray-600 mt-2">
        The page you are looking for doesn't exist or an error occurred.
      </p>
      <Link
        to="/"
        className="mt-6 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};
