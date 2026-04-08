import { Phone, Bell, User, MessageCircle, Bot, Shield, Clock, Award, ChevronRight, Activity, Heart, Calendar, FileText, Zap, TrendingUp } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useMode } from "../../contexts/ModeContext";
import { ModeToggle } from "../ModeToggle";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { fadeInUp, fadeIn, staggerContainer } from "../../utils/animations";
import mapImage from "figma:asset/b058913ecb41e342c4cb81518c003de8f8363382.png";
import { useState } from "react";
import { EmergencyMapModal } from "../EmergencyMapModal";

export function Home() {
  const { mode } = useMode();
  const navigate = useNavigate();
  const [mapModalOpen, setMapModalOpen] = useState(false);

  const medications = [
    { name: "阿司匹林", time: "8:00 AM", status: "已完成" },
    { name: "降压药", time: "12:00 PM", status: "待服用" },
    { name: "维生素D", time: "6:00 PM", status: "待服用" },
  ];

  const serviceCards = [
    {
      title: "一键呼救，专业响应",
      subtitle: "紧急救援",
      tag: "24小时待命",
      tagColor: "bg-red-100 text-red-600",
      image: "https://images.unsplash.com/photo-1765752926933-d6a68a4f29e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWVyZ2VuY3klMjBhbWJ1bGFuY2UlMjByZXNjdWUlMjB0ZWFtfGVufDF8fHx8MTc3NTIwNjExMXww&ixlib=rb-4.1.0&q=80&w=1080",
      icon: Phone,
      iconBg: "from-red-400 to-orange-400",
      highlights: ["自动定位发送", "最快3分钟响应", "专业急救团队"],
      description: "遇到紧急情况，按下 SOS 按钮，系统立即自动定位并通知最近的急救团队。专业医护人员通过视频实时指导初步救援，全天候守护每一位老人的生命安全。",
      stat: { value: "3min", label: "平均响应时间" },
      path: "/emergency",
    },
    {
      title: "智能监护，贴心关怀",
      subtitle: "健康管理",
      tag: "实时监测",
      tagColor: "bg-blue-100 text-blue-600",
      image: "https://images.unsplash.com/photo-1758577515333-e71b713059f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhlYWx0aCUyMG1vbml0b3JpbmclMjB3ZWFyYWJsZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzc1MjA2MTExfDA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: Activity,
      iconBg: "from-blue-400 to-cyan-400",
      highlights: ["心率/血压监测", "用药智能提醒", "家人实时查看"],
      description: "实时追踪心率、血压、血糖等关键健康指标，AI 智能分析趋势异常时第一时间预警。药提醒、健康档案一体化管理，让家人随时掌握您的健康状况。",
      stat: { value: "98%", label: "监测准确率" },
      path: "/health",
    },
    {
      title: "在线问诊，随时就医",
      subtitle: "远程医疗",
      tag: "专家坐诊",
      tagColor: "bg-green-100 text-green-600",
      image: "https://images.unsplash.com/photo-1758691461916-dc7894eb8f94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBkb2N0b3IlMjB2aWRlbyUyMGNvbnN1bHRhdGlvbiUyMHRlbGVtZWRpY2luZXxlbnwxfHx8fDE3NzUyMDYxMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: MessageCircle,
      iconBg: "from-green-400 to-teal-400",
      highlights: ["图文/视频问诊", "AI 辅助诊断", "电子处方开具"],
      description: "足不出户享受三甲医院专家服务，图文、视频多种问诊方式任选。AI 管家 24 小时解答健康疑问，在线开具电子处方，一键预约线下复诊。",
      stat: { value: "200+", label: "签约专家医生" },
      path: "/consultation",
    },
  ];

  // Elder Mode - Simplified Layout
  if (mode === "elder") {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-blue-50 via-cyan-50 to-blue-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <motion.div 
          className="relative overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div 
            className="relative h-[400px] bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.85), rgba(34, 211, 238, 0.85)), url('https://images.unsplash.com/photo-1731209144572-d0e254e030b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJlJTIwdHJ1Y2slMjBlbWVyZ2VuY3klMjBhbWJ1bGFuY2V8ZW58MXx8fHwxNzc1MDA3NTIxfDA&ixlib=rb-4.1.0&q=80&w=1080')`
            }}
          >
            <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
              <h1 className="text-white text-6xl font-bold mb-6">生命守护，与您同在</h1>
              <p className="text-white text-2xl mb-8">专业社区医疗系统，24小时守护您的健康</p>
              
              <div className="flex gap-4 items-center">
                <button 
                  onClick={() => navigate("/emergency-call")}
                  className="flex items-center gap-3 px-10 py-5 text-white rounded-2xl transition-all shadow-2xl text-2xl font-bold hover:opacity-90"
                  style={{ background: "linear-gradient(to right, #80D0C7, #0093E9)" }}
                >
                  <Phone className="w-10 h-10" />
                  紧急呼叫 120
                </button>
                
                <div className="ml-auto">
                  <ModeToggle />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content - Simplified */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome */}
          <Card className="mb-8 shadow-xl border-4 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardContent className="p-10">
              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-bold text-blue-900">欢迎回家，李先生</h2>
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Call - Large */}
          <Card className="mb-8 shadow-xl border-0 text-white" style={{ background: "linear-gradient(to bottom right, #80D0C7, #0093E9)" }}>
            <CardContent className="p-12">
              <h3 className="text-4xl font-bold mb-8 text-center">紧急呼救</h3>
              <div className="flex items-center justify-center">
                <button 
                  onClick={() => navigate("/emergency-call")}
                  className="w-64 h-64 bg-white hover:bg-gray-100 rounded-full flex flex-col items-center justify-center shadow-2xl transition-transform hover:scale-105"
                >
                  <Phone className="w-32 h-32 mb-4" style={{ color: "#0093E9" }} />
                  <span className="font-bold text-4xl" style={{ color: "#0093E9" }}>120</span>
                </button>
              </div>
              <p className="text-center text-2xl mt-8 text-white/90">点击拨打急救电话</p>
            </CardContent>
          </Card>

          {/* Medication Reminder - Simplified */}
          <Card className="mb-8 shadow-xl border-4 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardContent className="p-10">
              <h3 className="text-4xl font-bold mb-8 text-blue-900">今日用药提醒</h3>
              <div className="space-y-6">
                {medications.map((med, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-8 bg-white rounded-2xl border-4 border-blue-200 shadow-lg"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                        <span className="text-white font-bold text-3xl">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="text-3xl font-bold mb-2 text-blue-900">{med.name}</h4>
                        <p className="text-2xl text-blue-700">{med.time}</p>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-500 px-8 py-3 rounded-2xl text-xl">
                      {med.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Services - Large Buttons */}
          <Card className="shadow-xl border-4 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardContent className="p-10">
              <h3 className="text-4xl font-bold mb-8 text-blue-900">快捷服务</h3>
              <div className="grid grid-cols-2 gap-6">
                <button 
                  onClick={() => navigate("/emergency")}
                  className="p-10 bg-gradient-to-br from-blue-400 to-cyan-400 text-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <Bell className="w-20 h-20 mx-auto mb-4" />
                  <p className="text-3xl font-bold">应急呼叫</p>
                </button>
                <button 
                  onClick={() => navigate("/consultation")}
                  className="p-10 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <MessageCircle className="w-20 h-20 mx-auto mb-4" />
                  <p className="text-3xl font-bold">在线咨询</p>
                </button>
                <button 
                  onClick={() => navigate("/appointment")}
                  className="p-10 bg-gradient-to-br from-cyan-400 to-blue-400 text-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <User className="w-20 h-20 mx-auto mb-4" />
                  <p className="text-3xl font-bold">预约挂号</p>
                </button>
                <button 
                  onClick={() => navigate("/health-records")}
                  className="p-10 bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <Phone className="w-20 h-20 mx-auto mb-4" />
                  <p className="text-3xl font-bold">健康档案</p>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    );
  }

  // Smart Mode - Original Design
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "早上好" : hour < 18 ? "下午好" : "晚上好";

  const quickActions = [
    { title: "紧急呼救", desc: "24h专业响应", icon: Phone, grad: "from-rose-400 to-red-500", path: "/emergency" },
    { title: "健康管理", desc: "实时监测指标", icon: Activity, grad: "from-blue-400 to-cyan-500", path: "/health" },
    { title: "预约挂号", desc: "在线快速预约", icon: Calendar, grad: "from-emerald-400 to-teal-500", path: "/appointment" },
    { title: "在线咨询", desc: "专家答疑解惑", icon: MessageCircle, grad: "from-violet-400 to-blue-500", path: "/consultation" },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div
          className="relative h-[340px] bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(30,64,175,0.88) 0%, rgba(0,147,233,0.82) 60%, rgba(128,208,199,0.78) 100%), url('https://images.unsplash.com/photo-1731209144572-d0e254e030b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJlJTIwdHJ1Y2slMjBlbWVyZ2VuY3klMjBhbWJ1bGFuY2V8ZW58MXx8fHwxNzc1MDA3NTIxfDA&ixlib=rb-4.1.0&q=80&w=1080')`
          }}
        >
          <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
            <p className="text-white/75 text-sm mb-2 tracking-wide">专业 · 快速 · 有效</p>
            <h1 className="text-white text-5xl font-bold mb-3">生命守护，与您同在</h1>
            <p className="text-white/85 text-lg mb-8">社区智慧医疗平台，24小时守护每位老人的健康安全</p>

            <div className="flex gap-3 items-center">
              <button
                onClick={() => navigate("/emergency")}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/95 hover:bg-white text-blue-700 rounded-xl transition-all shadow-lg font-semibold text-sm"
              >
                <Phone className="w-4 h-4" /> 紧急呼叫 120
              </button>
              <button
                onClick={() => navigate("/consultation")}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur hover:bg-white/30 text-white rounded-xl transition-all text-sm"
              >
                <MessageCircle className="w-4 h-4" /> 在线咨询
              </button>
              <div className="ml-auto"><ModeToggle /></div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">

        {/* ── Greeting Dashboard Card ── */}
        <motion.div
          className="rounded-2xl p-6 text-white shadow-xl flex items-center justify-between gap-4"
          style={{ background: "linear-gradient(135deg, #1e40af 0%, #0093E9 55%, #80D0C7 100%)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex-1 min-w-0">
            <p className="text-white/65 text-xs mb-1">
              {new Date().toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric", weekday: "long" })}
            </p>
            <h2 className="text-2xl font-bold">{greeting}，李先生</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
              <span className="text-white/90 text-sm">今日健康状态良好</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {[
              { label: "心率", value: "72", unit: "bpm" },
              { label: "血压", value: "120/80", unit: "mmHg" },
              { label: "血糖", value: "5.6", unit: "mmol" },
              { label: "体温", value: "36.5", unit: "°C" },
            ].map((m, i) => (
              <div key={i} className="text-center bg-white/15 backdrop-blur rounded-xl px-3 py-2.5 min-w-[70px]">
                <p className="text-lg font-bold leading-none">{m.value}</p>
                <p className="text-[10px] text-white/65 mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Quick Action Tiles ── */}
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.button
                key={i}
                onClick={() => navigate(a.path)}
                className={`bg-gradient-to-br ${a.grad} text-white rounded-2xl p-5 shadow-lg hover:shadow-xl text-left w-full group relative overflow-hidden`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 * i + 0.3 }}
                whileHover={{ y: -3 }}
              >
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full" />
                <div className="w-11 h-11 bg-white/25 rounded-xl flex items-center justify-center mb-3 group-hover:bg-white/35 transition-colors">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="font-semibold text-base">{a.title}</p>
                <p className="text-xs text-white/75 mt-0.5">{a.desc}</p>
                <ChevronRight className="w-3.5 h-3.5 text-white/50 mt-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            );
          })}
        </div>

        {/* ── Main Dashboard Grid ── */}
        <div className="grid grid-cols-12 gap-5">

          {/* Left: Medications */}
          <div className="col-span-7">
            <Card className="shadow-lg border-0 h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-lg font-semibold">今日用药提醒</h3>
                    <p className="text-xs text-gray-400 mt-0.5">按时服药，守护健康</p>
                  </div>
                  <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 px-3 py-1">
                    {medications.filter(m => m.status === "待服用").length} 项待服用
                  </Badge>
                </div>

                <div className="space-y-3">
                  {medications.map((med, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl border transition-colors"
                      style={{
                        background: med.status === "已完成" ? "#f0fdf4" : "#eff6ff",
                        borderColor: med.status === "已完成" ? "#bbf7d0" : "#bfdbfe",
                      }}
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${med.status === "已完成" ? "bg-green-500" : "bg-blue-500"}`}>
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{med.name}</p>
                        <p className="text-xs text-gray-500">{med.time}</p>
                      </div>
                      <Badge className={med.status === "已完成"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-blue-100 text-blue-700 hover:bg-blue-100"}>
                        {med.status}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-5">
                  <Button onClick={() => navigate("/health")} className="rounded-xl bg-blue-500 hover:bg-blue-600">
                    <Bell className="w-4 h-4 mr-2" /> 用药计划
                  </Button>
                  <Button onClick={() => navigate("/health-records")} variant="outline" className="rounded-xl">
                    <FileText className="w-4 h-4 mr-2" /> 健康档案
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Emergency + Overview */}
          <div className="col-span-5 flex flex-col gap-4">
            {/* Emergency */}
            <Card className="shadow-lg border-0 text-white flex-shrink-0" style={{ background: "linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)" }}>
              <CardContent className="p-6">
                <h3 className="font-semibold text-base mb-1">紧急呼救</h3>
                <p className="text-white/75 text-xs mb-4">长按3秒自动拨打120</p>
                <div className="flex items-center justify-center py-2">
                  <button
                    onClick={() => navigate("/emergency-call")}
                    className="w-28 h-28 bg-white/90 hover:bg-white rounded-full flex flex-col items-center justify-center shadow-2xl transition-transform hover:scale-105 active:scale-95"
                  >
                    <Phone className="w-10 h-10 mb-1" style={{ color: "#0093E9" }} />
                    <span className="font-bold text-sm" style={{ color: "#0093E9" }}>SOS</span>
                  </button>
                </div>
                <Button onClick={() => navigate("/emergency-call")} className="w-full mt-4 bg-white/20 backdrop-blur hover:bg-white/30 text-white border-0 rounded-xl text-sm">
                  <Phone className="w-4 h-4 mr-2" /> 立即拨打 120
                </Button>
              </CardContent>
            </Card>

            {/* Today's Overview */}
            <Card className="shadow-lg border-0 flex-1">
              <CardContent className="p-5">
                <h3 className="font-semibold mb-4 text-sm">今日概览</h3>
                <div className="space-y-2.5">
                  {[
                    { icon: Calendar, label: "下次就诊", value: "4月5日 09:00", bg: "bg-blue-50", ibg: "bg-blue-100", ic: "text-blue-600", vc: "text-blue-600" },
                    { icon: Heart, label: "健康评分", value: "92分 · 优秀", bg: "bg-green-50", ibg: "bg-green-100", ic: "text-green-600", vc: "text-green-600" },
                    { icon: Shield, label: "急救人员", value: "2人在线", bg: "bg-sky-50", ibg: "bg-sky-100", ic: "text-sky-600", vc: "text-sky-600" },
                    { icon: Award, label: "服务天数", value: "365天", bg: "bg-amber-50", ibg: "bg-amber-100", ic: "text-amber-600", vc: "text-amber-600" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className={`flex items-center justify-between p-3 ${item.bg} rounded-xl`}>
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 ${item.ibg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-3.5 h-3.5 ${item.ic}`} />
                          </div>
                          <span className="text-xs font-medium text-gray-700">{item.label}</span>
                        </div>
                        <span className={`text-xs font-semibold ${item.vc}`}>{item.value}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">急救人员位置联系</h3>
            <div
              className="bg-gray-100 rounded-xl mb-5 relative h-72 overflow-hidden cursor-pointer group"
              onClick={() => setMapModalOpen(true)}
            >
              <img
                src={mapImage}
                alt="急救人员位置地图"
                className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-all duration-300 rounded-xl flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur rounded-xl px-5 py-3 shadow-lg flex items-center gap-2">
                  <span className="text-blue-600 font-medium text-sm">点击查看急救人员详情</span>
                  <span className="text-lg">🗺️</span>
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full px-3 py-1 flex items-center gap-1.5 shadow text-xs text-gray-700">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> 实时位置
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Card className="border-2 border-blue-100">
                <CardContent className="p-4 text-center">
                  <div className="w-14 h-14 rounded-full overflow-hidden mx-auto mb-3 border-2 border-blue-100">
                    <img src="https://images.unsplash.com/photo-1622902046580-2b47f47f5471?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbGUlMjBkb2N0b3IlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzUwMzIyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="李医生" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-medium text-sm mb-1">李医生</h4>
                  <p className="text-xs text-gray-500 mb-2">执业资质</p>
                  <Button size="sm" variant="outline" className="text-xs rounded-full w-full">联系医生</Button>
                </CardContent>
              </Card>
              <Card className="border-2 border-blue-100">
                <CardContent className="p-4 text-center">
                  <div className="w-14 h-14 rounded-full overflow-hidden mx-auto mb-3 border-2 border-blue-100">
                    <img src="https://images.unsplash.com/photo-1686737357932-ae1c50492a9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGZlbWFsZSUyMG51cnNlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc1MDkxMDI4fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="张护士" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-medium text-sm mb-1">张医生</h4>
                  <p className="text-xs text-gray-500 mb-2">资深护理</p>
                  <Button size="sm" variant="outline" className="text-xs rounded-full w-full">联系医生</Button>
                </CardContent>
              </Card>
              <div className="flex items-center justify-center">
                <Button className="bg-blue-500 hover:bg-blue-600 rounded-full px-6">查看更多</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Consultation */}
        <Card
          className="shadow-lg border-0 cursor-pointer hover:shadow-xl transition-shadow"
          style={{ background: "linear-gradient(135deg, #f5f3ff, #eff6ff)" }}
          onClick={() => navigate("/ai-consultation")}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">AI 智能管家</h3>
                <p className="text-xs text-gray-500">语音 · 图文 · 24小时在线</p>
              </div>
              <Badge className="ml-auto bg-violet-100 text-violet-700 hover:bg-violet-100">在线</Badge>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <p className="text-sm text-gray-700">您好！我是AI管家助手，有什么健康问题可以帮您解答？</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["咨询健康", "预约挂号", "用药指导"].map((label, i) => (
                <Button key={i} variant="outline" className="rounded-full text-sm" onClick={(e) => { e.stopPropagation(); navigate(i === 1 ? "/appointment" : "/ai-consultation"); }}>
                  {label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Introduction - Redesigned (kept from previous edit) */}
        <div className="mt-4">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-3" style={{ background: "linear-gradient(to right, #e0f7f5, #cce8ff)", color: "#0093E9" }}>
              我们的服务
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">全方位守护，让健康无忧</h2>
            <p className="text-gray-500 max-w-xl mx-auto">从紧急救援到日常健康管理，我们为每一位老年人提供专业、贴心的医疗服务</p>
          </div>

          <div className="space-y-8">
            {serviceCards.map((card, index) => {
              const isEven = index % 2 === 0;
              const Icon = card.icon;
              return (
                <motion.div
                  key={index}
                  className="grid grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <div className={`relative h-72 ${isEven ? "order-1" : "order-2"}`}>
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 ${isEven ? "bg-gradient-to-r from-transparent to-black/20" : "bg-gradient-to-l from-transparent to-black/20"}`} />
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.iconBg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-gray-900 leading-none">{card.stat.value}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{card.stat.label}</p>
                      </div>
                    </div>
                  </div>
                  <div className={`bg-white flex flex-col justify-center px-10 py-8 ${isEven ? "order-2" : "order-1"}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${card.tagColor}`}>{card.tag}</span>
                      <span className="text-xs text-gray-400">{card.subtitle}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{card.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">{card.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {card.highlights.map((h, i) => (
                        <span key={i} className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#0093E9" }} />
                          {h}
                        </span>
                      ))}
                    </div>
                    <button onClick={() => navigate(card.path)} className="group flex items-center gap-2 text-sm font-semibold self-start" style={{ color: "#0093E9" }}>
                      了解更多 <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="mt-8 rounded-3xl p-8 grid grid-cols-4 gap-6 text-white text-center"
            style={{ background: "linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {[
              { icon: Shield, value: "24 / 7", label: "全天候守护" },
              { icon: Clock, value: "< 3min", label: "急救响应时间" },
              { icon: Award, value: "200+", label: "签约专家医生" },
              { icon: Heart, value: "10,000+", label: "服务老年用户" },
            ].map((s, i) => {
              const SIcon = s.icon;
              return (
                <div key={i} className="flex flex-col items-center gap-2">
                  <SIcon className="w-7 h-7 text-white/80" />
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-sm text-white/80">{s.label}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <EmergencyMapModal isOpen={mapModalOpen} onClose={() => setMapModalOpen(false)} />
    </motion.div>
  );
}