import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 px-6 py-20 text-center">

      <Compass size={36} className="text-slate-600" />

      <h1 className="mt-5 text-2xl font-bold text-white">
        Page not found
      </h1>

      <p className="mt-2 max-w-sm text-sm text-slate-400">
        The page you're looking for doesn't exist or may have moved.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-400"
      >
        Back to dashboard
      </Link>

    </div>
  );
}
