import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import useFocusOnRouteChange from "../hooks/useFocusOnRouteChange";

function SignInPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const headingRef = useFocusOnRouteChange();

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError("Please fill in both fields.");
      return;
    }

    signIn(name, email);

    const destination = location.state?.from || "/";
    navigate(destination, { replace: true });
  }

  return (
    <div className="container w-[450px]">
      <div className="bg-white border rounded-2xl shadow-xl p-6">
        <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-bold mb-6">
          Sign in
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
