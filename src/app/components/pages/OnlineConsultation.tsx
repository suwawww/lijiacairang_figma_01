import { useState } from "react";
import { ArrowLeft, Send, Phone, Video, Paperclip, Smile, User } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router";
import { useMode } from "../../contexts/ModeContext";
import { ModeToggle } from "../ModeToggle";

export function OnlineConsultation() {
  const navigate = useNavigate();
  const { mode } = useMode();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "doctor", text: "您好！我是李医生，有什么可以帮助您的吗？", time: "14:30" },
    { id: 2, sender: "user", text: "医生您好，我想咨询一下关于高血压的问题", time: "14:32" },
    { id: 3, sender: "doctor", text: "好的，请详细描述一下您的情况，包括血压数值和症状。", time: "14:33" },
  ]);

  const doctors = [
    { id: 1, name: "李医生", specialty: "心内科", status: "在线", avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100" },
    { id: 2, name: "张医生", specialty: "急诊科", status: "在线", avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100" },
    { id: 3, name: "王医生", specialty: "全科", status: "忙碌", avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100" },
  ];

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: "user", text: message, time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) }]);
      setMessage("");
    }
  };

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
            <h1 className="text-4xl font-bold">在线咨询</h1>
            <ModeToggle />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Doctor Info */}
          <Card className="mb-8 shadow-xl border-4 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardContent className="p-10">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-4xl font-bold text-blue-900 mb-2">李医生</h2>
                  <p className="text-2xl text-blue-700 mb-3">心内科 · 主任医师</p>
                  <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-500 hover:to-green-600 text-xl px-6 py-2">
                    在线
                  </Badge>
                </div>
                <div className="flex gap-4">
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-2xl rounded-2xl">
                    <Phone className="w-8 h-8 mr-3" />
                    语音通话
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-2xl rounded-2xl">
                    <Video className="w-8 h-8 mr-3" />
                    视频通话
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="shadow-xl border-4 border-blue-300 bg-white">
            <CardContent className="p-10">
              <div className="h-[500px] overflow-y-auto mb-8 space-y-6">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-2xl ${msg.sender === "user" ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" : "bg-blue-50 text-blue-900"} p-6 rounded-2xl shadow-lg`}>
                      <p className="text-2xl mb-2">{msg.text}</p>
                      <p className={`text-lg ${msg.sender === "user" ? "text-white/70" : "text-blue-600"}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="flex gap-4">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="输入您的问题..."
                  className="flex-1 text-2xl p-6 border-4 border-blue-200 rounded-2xl"
                />
                <Button
                  onClick={handleSend}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-10 py-6 text-2xl rounded-2xl"
                >
                  <Send className="w-8 h-8" />
                </Button>
              </div>
            </CardContent>
          </Card>
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
          <h1 className="text-2xl font-bold">在线咨询</h1>
          <ModeToggle />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar - Doctor List */}
          <div className="col-span-3">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">在线医生</h3>
                <div className="space-y-3">
                  {doctors.map((doctor) => (
                    <div key={doctor.id} className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl cursor-pointer hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{doctor.name}</h4>
                        <p className="text-xs text-gray-600">{doctor.specialty}</p>
                      </div>
                      <Badge className={doctor.status === "在线" ? "bg-green-500" : "bg-gray-400"}>
                        {doctor.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="col-span-9">
            <Card className="shadow-lg border-0">
              {/* Doctor Header */}
              <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">李医生</h2>
                      <p className="text-sm text-gray-600">心内科 · 主任医师</p>
                    </div>
                    <Badge className="bg-green-500 text-white">在线</Badge>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="rounded-full">
                      <Phone className="w-4 h-4 mr-2" />
                      语音
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full">
                      <Video className="w-4 h-4 mr-2" />
                      视频
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <CardContent className="p-6">
                <div className="h-[500px] overflow-y-auto mb-6 space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-md ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100"} p-4 rounded-2xl`}>
                        <p className="text-sm mb-1">{msg.text}</p>
                        <p className={`text-xs ${msg.sender === "user" ? "text-white/70" : "text-gray-500"}`}>{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="flex gap-3 items-center">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Smile className="w-5 h-5" />
                  </Button>
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="输入您的问题..."
                    className="flex-1"
                  />
                  <Button onClick={handleSend} className="bg-blue-500 hover:bg-blue-600 rounded-full">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
