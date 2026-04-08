import { Link, useLocation } from "react-router";

export function Header() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "首页" },
    { path: "/emergency", label: "应急救援" },
    { path: "/health", label: "健康服务" },
    { path: "/profile", label: "个人信息" },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">+</span>
            </div>
            <h1 className="text-lg font-medium">社区急救服务</h1>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              意见反馈
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}