import { useMode } from "../contexts/ModeContext";

export function ModeToggle() {
  const { mode, setMode } = useMode();

  return (
    <div className="flex gap-3">
      <button
        onClick={() => setMode("elder")}
        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
          mode === "elder"
            ? "bg-blue-500 text-white shadow-lg"
            : "bg-white/20 backdrop-blur text-white hover:bg-white/30"
        }`}
      >
        老年模式
      </button>
      <button
        onClick={() => setMode("smart")}
        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
          mode === "smart"
            ? "bg-blue-500 text-white shadow-lg"
            : "bg-white/20 backdrop-blur text-white hover:bg-white/30"
        }`}
      >
        智能模式
      </button>
    </div>
  );
}
