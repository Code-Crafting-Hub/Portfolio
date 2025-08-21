import { useNavigate } from "react-router-dom";

export default function Unknown() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#060606] text-[#ffffff] px-6">
      <h1 className="text-9xl font-extrabold tracking-widest text-[#22c55e]">
        404
      </h1>
      <div className="bg-[#262626] px-3 py-1 text-sm rounded rotate-12 absolute text-[#94a3b8]">
        Page Not Found
      </div>
      <p className="mt-6 text-lg text-[#94a3b8]">
        Oops! The page you're looking for doesn’t exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 text-sm font-medium rounded-2xl bg-[#22c55e] hover:bg-[#15803d] transition-all"
      >
        Go Home
      </button>
    </div>
  );
}
