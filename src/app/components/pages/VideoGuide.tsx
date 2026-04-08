import { useState } from "react";
import { ArrowLeft, Play, Heart, Activity, AlertCircle, ThumbsUp, Share2, BookmarkPlus } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router";
import { useMode } from "../../contexts/ModeContext";
import { ModeToggle } from "../ModeToggle";

export function VideoGuide() {
  const navigate = useNavigate();
  const { mode } = useMode();
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const videoCategories = [
    {
      id: 1,
      title: "心肺复苏 (CPR)",
      icon: Heart,
      videos: [
        { id: 1, title: "成人心肺复苏标准流程", duration: "8:30", views: "12.5万", thumbnail: "https://images.unsplash.com/photo-1622115585848-1d5b6e8af4e4?w=400" },
        { id: 2, title: "儿童心肺复苏要点", duration: "6:45", views: "8.3万", thumbnail: "https://images.unsplash.com/photo-1622115585848-1d5b6e8af4e4?w=400" },
        { id: 3, title: "AED自动除颤器使用", duration: "5:20", views: "15.2万", thumbnail: "https://images.unsplash.com/photo-1622115585848-1d5b6e8af4e4?w=400" },
      ]
    },
    {
      id: 2,
      title: "气道梗阻",
      icon: Activity,
      videos: [
        { id: 4, title: "海姆立克急救法", duration: "4:50", views: "20.1万", thumbnail: "https://images.unsplash.com/photo-1622115585848-1d5b6e8af4e4?w=400" },
        { id: 5, title: "婴儿气道梗阻处理", duration: "5:30", views: "9.7万", thumbnail: "https://images.unsplash.com/photo-1622115585848-1d5b6e8af4e4?w=400" },
      ]
    },
    {
      id: 3,
      title: "出血与包扎",
      icon: AlertCircle,
      videos: [
        { id: 6, title: "止血压迫法详解", duration: "6:15", views: "11.4万", thumbnail: "https://images.unsplash.com/photo-1622115585848-1d5b6e8af4e4?w=400" },
        { id: 7, title: "伤口包扎技巧", duration: "7:00", views: "13.8万", thumbnail: "https://images.unsplash.com/photo-1622115585848-1d5b6e8af4e4?w=400" },
        { id: 8, title: "骨折固定方法", duration: "8:45", views: "10.2万", thumbnail: "https://images.unsplash.com/photo-1622115585848-1d5b6e8af4e4?w=400" },
      ]
    }
  ];

  // Elder Mode
  if (mode === "elder") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-cyan-50 to-blue-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="flex items-center gap-3 text-2xl font-bold">
              <ArrowLeft className="w-10 h-10" />
              返回
            </button>
            <h1 className="text-4xl font-bold">视频急救指导</h1>
            <ModeToggle />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {videoCategories.map((category) => (
            <Card key={category.id} className="mb-8 shadow-xl border-4 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardContent className="p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <category.icon className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-blue-900">{category.title}</h2>
                </div>

                <div className="space-y-6">
                  {category.videos.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => setSelectedVideo(video.id)}
                      className="bg-white p-8 rounded-2xl border-4 border-blue-200 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                    >
                      <div className="flex gap-6">
                        <div className="relative w-48 h-36 flex-shrink-0 rounded-xl overflow-hidden bg-gray-200">
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Play className="w-16 h-16 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-3xl font-bold text-blue-900 mb-3">{video.title}</h3>
                          <div className="flex gap-6 text-2xl text-blue-700">
                            <span>时长: {video.duration}</span>
                            <span>观看: {video.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Smart Mode
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:underline">
            <ArrowLeft className="w-5 h-5" />
            返回
          </button>
          <h1 className="text-2xl font-bold">视频急救指导</h1>
          <ModeToggle />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-8">
            {videoCategories.map((category) => (
              <Card key={category.id} className="mb-6 shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold">{category.title}</h2>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {category.videos.map((video) => (
                      <div
                        key={video.id}
                        onClick={() => setSelectedVideo(video.id)}
                        className="flex gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Play className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                          <div className="flex gap-4 text-sm text-gray-600">
                            <span>{video.duration}</span>
                            <span>{video.views} 次观看</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-6">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-500 to-purple-500 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">急救提示</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>观看视频前请确保环境安全</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>建议多次观看加深记忆</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>实际操作前请拨打120</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>定期复习保持技能</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">热门视频</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3 pb-3 border-b last:border-0">
                      <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">急救视频 {i}</p>
                        <p className="text-xs text-gray-500">1.2万 观看</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
