import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Send, Bot, User as UserIcon, Sparkles, Heart, Pill, Activity, Phone } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useMode } from "../../contexts/ModeContext";
import { ModeToggle } from "../ModeToggle";
import { motion } from "motion/react";

interface Message {
  id: number;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

export function AIConsultation() {
  const { mode } = useMode();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      content: "您好！我是您的AI健康管家小智。我可以为您提供健康咨询、用药指导、急救知识等服务。请问有什么可以帮助您的吗？",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    { icon: Heart, text: "如何预防心血管疾病？", color: "bg-red-500" },
    { icon: Pill, text: "高血压药物怎么服用？", color: "bg-blue-500" },
    { icon: Activity, text: "老年人适合做什么运动？", color: "bg-green-500" },
    { icon: Phone, text: "心脏不舒服该怎么办？", color: "bg-orange-500" },
  ];

  const aiResponses: Record<string, string> = {
    "如何预防心血管疾病？": "预防心血管疾病的建议：\n\n1. 饮食方面：\n   - 减少盐分摄入，每天不超过6克\n   - 多吃蔬菜水果和全谷物\n   - 控制油脂摄入，选择健康油脂\n\n2. 生活习惯：\n   - 保持规律运动，每天至少30分钟\n   - 控制体重，维持健康BMI\n   - 戒烟限酒\n\n3. 定期检查：\n   - 定期监测血压、血糖、血脂\n   - 每年进行体检\n\n4. 情绪管理：\n   - 保持心情愉悦\n   - 避免过度紧张和压力\n\n如有不适，请及时就医！",
    
    "高血压药物怎么服用？": "高血压药物服用注意事项：\n\n1. 按时服药：\n   - 每天固定时间服用\n   - 不要随意停药或更改剂量\n\n2. 服药时间：\n   - 大多数降压药建议早晨服用\n   - 具体请遵医嘱\n\n3. 注意事项：\n   - 避免与西柚汁同服\n   - 记录血压变化\n   - 如有头晕等不适及时联系医生\n\n4. 生活配合：\n   - 低盐饮食\n   - 适量运动\n   - 控制情绪\n\n建议您将用药情况记录在健康档案中，方便医生了解。",
    
    "老年人适合做什么运动？": "适合老年人的运动推荐：\n\n1. 有氧运动：\n   - 散步：每天30-60分钟\n   - 太极拳：改善平衡和柔韧性\n   - 游泳：保护关节的全身运动\n\n2. 力量训练：\n   - 举轻哑铃\n   - 弹力带练习\n   - 每周2-3次\n\n3. 平衡训练：\n   - 单脚站立\n   - 脚跟脚尖行走\n   - 预防跌倒\n\n4. 注意事项：\n   - 运动前热身\n   - 循序渐进\n   - 避免空腹运动\n   - 及时补水\n\n如有慢性疾病，运动前请咨询医生。",
    
    "心脏不舒服该怎么办？": "⚠️ 心脏不适处理指南：\n\n立即行动：\n1. 停止活动，坐下或躺下休息\n2. 保持冷静，深呼吸\n3. 如有硝酸甘油可含服\n\n紧急情况（出现以下症状）：\n❗ 胸痛持续超过5分钟\n❗ 呼吸困难\n❗ 大量出汗\n❗ 恶心呕吐\n❗ 意识不清\n\n→ 立即拨打120！\n\n非紧急但需就医：\n- 轻微胸闷\n- 心悸\n- 疲劳乏力\n\n建议尽快预约心内科就诊。\n\n如需紧急帮助，可点击页面右下角的SOS按钮！",
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // 模拟AI响应
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        type: "ai",
        content: aiResponses[inputValue] || 
          "感谢您的提问！根据您的情况，我建议：\n\n1. 如果是健康问题，建议您咨询专业医生\n2. 可以使用我们的预约挂号功能预约就诊\n3. 紧急情况请立即拨打120\n\n您还有其他问题吗？",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Elder Mode - Simplified Layout
  if (mode === "elder") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-cyan-50 to-blue-100">
        {/* Header */}
        <div className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <h1 className="text-5xl font-bold text-gray-800">AI智能管家</h1>
              <ModeToggle />
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-8">
          {/* Chat Card */}
          <Card className="shadow-2xl border-0 mb-8">
            <CardContent className="p-8">
              {/* Messages */}
              <div className="h-[600px] overflow-y-auto mb-6 space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-4 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.type === "ai" && (
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-10 h-10 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] p-6 rounded-3xl ${
                        message.type === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="text-2xl whitespace-pre-line leading-relaxed">{message.content}</p>
                    </div>
                    {message.type === "user" && (
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <UserIcon className="w-10 h-10 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-4 justify-start">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                      <Bot className="w-10 h-10 text-white" />
                    </div>
                    <div className="bg-gray-100 p-6 rounded-3xl">
                      <div className="flex gap-2">
                        <div className="w-4 h-4 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-4 h-4 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-4 h-4 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              <div className="mb-6">
                <p className="text-2xl font-semibold text-gray-700 mb-4">快捷提问</p>
                <div className="grid grid-cols-2 gap-4">
                  {quickQuestions.map((q, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(q.text)}
                      className="flex items-center gap-3 p-5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-2xl transition-all shadow-lg text-xl"
                    >
                      <q.icon className="w-8 h-8" />
                      <span>{q.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="flex gap-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="输入您的问题..."
                  className="flex-1 px-8 py-6 text-2xl border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-10 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-colors flex items-center gap-3 text-2xl font-semibold"
                >
                  <Send className="w-8 h-8" />
                  发送
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Smart Mode - Original Design
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="relative h-[280px] bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.85), rgba(59, 130, 246, 0.85)), url('https://images.unsplash.com/photo-1531746790731-6c087fecd65a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3klMjBtZWRpY2FsJTIwaGVhbHRoY2FyZXxlbnwxfHx8fDE3NzUwMDc2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080')`
          }}
        >
          <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-10 h-10 text-yellow-300" />
              <h1 className="text-white text-4xl font-bold">AI智能管家</h1>
            </div>
            <p className="text-white/90 text-lg mb-6">24小时在线，专业健康咨询服务</p>
            
            <div className="flex justify-end">
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Chat Area */}
          <div className="col-span-8">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                {/* Messages */}
                <div className="h-[500px] overflow-y-auto mb-6 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.type === "ai" && (
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] p-4 rounded-2xl ${
                          message.type === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                        <span className="text-xs opacity-70 mt-2 block">
                          {message.timestamp.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      {message.type === "user" && (
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <UserIcon className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-gray-100 p-4 rounded-2xl">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="输入您的问题..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    发送
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* Quick Questions */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  快捷提问
                </h3>
                <div className="space-y-3">
                  {quickQuestions.map((q, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(q.text)}
                      className={`w-full flex items-center gap-3 p-3 ${q.color} hover:opacity-90 text-white rounded-lg transition-all text-sm text-left`}
                    >
                      <q.icon className="w-5 h-5 flex-shrink-0" />
                      <span>{q.text}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-500 to-blue-500 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">快捷服务</h3>
                <div className="space-y-3">
                  <Button
                    onClick={() => navigate("/emergency")}
                    className="w-full bg-white/20 backdrop-blur hover:bg-white/30 text-white border-0"
                  >
                    紧急救援
                  </Button>
                  <Button
                    onClick={() => navigate("/appointment")}
                    className="w-full bg-white/20 backdrop-blur hover:bg-white/30 text-white border-0"
                  >
                    预约挂号
                  </Button>
                  <Button
                    onClick={() => navigate("/health-records")}
                    className="w-full bg-white/20 backdrop-blur hover:bg-white/30 text-white border-0"
                  >
                    健康档案
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AI Info */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-100 to-cyan-100">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">AI管家小智</h4>
                  <p className="text-sm text-gray-600">
                    我可以为您提供健康咨询、用药指导、急救知识等专业服务
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}