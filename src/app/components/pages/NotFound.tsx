import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-2">页面未找到</p>
          <p className="text-gray-500">抱歉，您访问的页面不存在</p>
        </div>
        <div className="flex gap-3 justify-center">
          <Link to="/">
            <Button className="bg-red-600 hover:bg-red-700">
              <Home className="w-4 h-4 mr-2" />
              返回首页
            </Button>
          </Link>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回上一页
          </Button>
        </div>
      </div>
    </div>
  );
}
