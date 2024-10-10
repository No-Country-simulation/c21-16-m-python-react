import { Link } from "react-router-dom";
import { useAuth } from "../features/auth";

export const Page = () => {
  const { isAuthenticated, isPending, isError } = useAuth();

  return (
    <div>
      <Link
        style={{
          display: "block",
        }}
        to="/auth/signin"
      >
        Signin
      </Link>
      <Link
        style={{
          display: "block",
        }}
        to="/auth/signup"
      >
        Signup
      </Link>

      {isPending
        ? "Loading..."
        : isError
        ? "Error"
        : isAuthenticated
        ? "Authenticated"
        : "Not Authenticated"}
    </div>
  );
};
