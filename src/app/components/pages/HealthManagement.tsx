import { Heart, Activity, Pill, Calendar, TrendingUp, Bell, Clock, Plus, FileText, Video, Phone, AlertCircle, Check, ChevronRight, Zap } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { useMode } from "../../contexts/ModeContext";
import { ModeToggle } from "../ModeToggle";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { fadeInUp, fadeIn, staggerContainer } from "../../utils/animations";

export function HealthManagement() {
  const { mode } = useMode();
  const navigate = useNavigate();
  
  const healthMetrics = [
    { icon: Heart, label: "心率", value: "72", unit: "bpm", color: "text-red-500", status: "正常" },
    { icon: Activity, label: "血压", value: "120/80", unit: "mmHg", color: "text-blue-500", status: "正常" },
    { icon: TrendingUp, label: "血糖", value: "5.6", unit: "mmol/L", color: "text-green-500", status: "正常" },
    { icon: Bell, label: "体温", value: "36.5", unit: "℃", color: "text-orange-500", status: "正常" },
  ];

  const medications = [
    { name: "阿司匹林", dosage: "100mg", frequency: "每天1次", time: "早餐后", remaining: 28 },
    { name: "降压药", dosage: "5mg", frequency: "每天1次", time: "晚饭后", remaining: 15 },
    { name: "维生素D", dosage: "400IU", frequency: "每天1次", time: "午餐后", remaining: 42 },
  ];

  const upcomingAppointments = [
    {
      doctor: "李医生",
      department: "心内科",
      date: "4月5日",
      time: "09:00",
      hospital: "市人民医院",
    },
    {
      doctor: "张医生",
      department: "内分泌科",
      date: "4月12日",
      time: "14:00",
      hospital: "中心医院",
    },
  ];

  // Elder Mode - Simplified
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
              backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.85), rgba(34, 211, 238, 0.85)), url('https://images.unsplash.com/photo-1666979289472-96e6d3245b84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzcyUyMGxpZmVzdHlsZSUyMGV4ZXJjaXNlfGVufDF8fHx8MTc3NTAwNzY1Mnww&ixlib=rb-4.1.0&q=80&w=1080')`
            }}
          >
            <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
              <h1 className="text-white text-6xl font-bold mb-6">健康服务</h1>
              <p className="text-white text-2xl mb-8">全方位健管理</p>
              
              <div className="flex gap-4 items-center">
                <button
                  onClick={() => navigate("/appointment")}
                  className="flex items-center gap-3 px-10 py-5 bg-white hover:bg-gray-100 text-blue-600 rounded-2xl transition-colors shadow-2xl text-2xl font-bold"
                >
                  <Calendar className="w-10 h-10" />
                  预约挂号
                </button>
                <button
                  onClick={() => navigate("/health-records")}
                  className="flex items-center gap-3 px-10 py-5 bg-white/20 backdrop-blur hover:bg-white/30 text-white rounded-2xl transition-colors shadow-xl text-2xl font-bold border-2 border-white/40"
                >
                  <FileText className="w-10 h-10" />
                  健康档案
                </button>
                
                <div className="ml-auto">
                  <ModeToggle />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Health Metrics - Large */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {healthMetrics.map((metric, index) => (
              <Card key={index} className="shadow-xl border-4 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardContent className="p-10 text-center">
                  <metric.icon className={`w-20 h-20 ${metric.color} mx-auto mb-4`} />
                  <p className="text-2xl text-blue-700 font-medium mb-4">{metric.label}</p>
                  <div className="flex items-baseline justify-center gap-2 mb-4">
                    <span className="text-6xl font-bold text-blue-900">{metric.value}</span>
                    <span className="text-2xl text-blue-600">{metric.unit}</span>
                  </div>
                  <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-500 text-2xl px-8 py-2 rounded-2xl">
                    {metric.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Medications - Simplified */}
          <Card className="mb-8 shadow-xl border-4 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardContent className="p-10">
              <h3 className="text-4xl font-bold mb-8 text-blue-900">今日用药</h3>
              <div className="space-y-6">
                {medications.map((med, index) => (
                  <div
                    key={index}
                    className="p-8 bg-white rounded-2xl border-4 border-blue-200 shadow-lg"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-3xl font-bold mb-2 text-blue-900">{med.name}</h4>
                        <p className="text-2xl text-blue-700">{med.dosage} · {med.time}</p>
                      </div>
                      <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-500 px-8 py-3 text-xl rounded-2xl">
                        剩余 {med.remaining} 片
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Appointments - Large */}
          <Card className="mb-8 shadow-xl border-4 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardContent className="p-10">
              <h3 className="text-4xl font-bold mb-8 text-blue-900">预约挂号</h3>
              <div className="space-y-6">
                {upcomingAppointments.map((apt, index) => (
                  <div key={index} className="p-8 bg-white border-4 border-blue-300 rounded-2xl shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-3xl font-bold mb-2 text-blue-900">{apt.doctor}</h4>
                        <p className="text-2xl text-blue-700 mb-2">{apt.department}</p>
                        <p className="text-xl text-blue-600">{apt.hospital}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-blue-600 mb-1">{apt.date}</p>
                        <p className="text-2xl text-blue-700">{apt.time}</p>
                      </div>
                    </div>
                    <Button size="lg" className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-2xl text-2xl py-6">
                      查看详情
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-6">
            <button 
              onClick={() => navigate("/appointment")}
              className="p-10 bg-gradient-to-br from-blue-400 to-cyan-400 text-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow"
            >
              <Calendar className="w-20 h-20 mx-auto mb-4" />
              <p className="text-3xl font-bold">预约体检</p>
            </button>
            <button 
              onClick={() => navigate("/health-records")}
              className="p-10 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow"
            >
              <Pill className="w-20 h-20 mx-auto mb-4" />
              <p className="text-3xl font-bold">健康档案</p>
            </button>
            <button 
              onClick={() => navigate("/consultation")}
              className="p-10 bg-gradient-to-br from-cyan-400 to-blue-400 text-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow"
            >
              <FileText className="w-20 h-20 mx-auto mb-4" />
              <p className="text-3xl font-bold">在线咨询</p>
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Smart Mode - Original Design
  const healthRecords = [
    { title: "体检报告", date: "2026-03-25", hospital: "市人民医院", type: "综合体检" },
    { title: "血压监测", date: "2026-03-20", hospital: "社区卫生中心", type: "常规检查" },
    { title: "血糖记录", date: "2026-03-15", hospital: "社区卫生中心", type: "慢病管理" },
    { title: "心电图检查", date: "2026-03-10", hospital: "市人民医院", type: "专项检查" },
  ];

  const healthNews = [
    {
      title: "春季养生指南",
      date: "2天前",
      category: "健康资讯",
      image: "https://images.unsplash.com/photo-1666979289472-96e6d3245b84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzcyUyMGxpZmVzdHlsZSUyMGV4ZXJjaXNlfGVufDF8fHx8MTc3NTAwNzY1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "老年人运动注意事项",
      date: "3天前",
      category: "健康资讯",
      image: "https://images.unsplash.com/photo-1666979289472-96e6d3245b84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzcyUyMGxpZmVzdHlsZSUyMGV4ZXJjaXNlfGVufDF8fHx8MTc3NTAwNzY1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
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
          className="relative h-[300px] bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(5,150,105,0.85) 0%, rgba(0,147,233,0.82) 55%, rgba(128,208,199,0.8) 100%), url('https://images.unsplash.com/photo-1666979289472-96e6d3245b84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzcyUyMGxpZmVzdHlsZSUyMGV4ZXJjaXNlfGVufDF8fHx8MTc3NTAwNzY1Mnww&ixlib=rb-4.1.0&q=80&w=1080')`
          }}
        >
          <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-200 text-sm font-medium tracking-wide">健康管理平台</span>
            </div>
            <h1 className="text-white text-5xl font-bold mb-3">健康服务中心</h1>
            <p className="text-white/85 text-lg mb-7">全方位健康监测，守护您的每一天</p>
            <div className="flex gap-3 items-center">
              <button
                onClick={() => navigate("/appointment")}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/95 hover:bg-white text-emerald-700 rounded-xl transition-all shadow-lg font-semibold text-sm"
              >
                <Calendar className="w-4 h-4" /> 预约挂号
              </button>
              <button
                onClick={() => navigate("/health-records")}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur hover:bg-white/30 text-white rounded-xl transition-all text-sm"
              >
                <FileText className="w-4 h-4" /> 健康档案
              </button>
              <div className="ml-auto"><ModeToggle /></div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">

        {/* ── Wellness Score Banner ── */}
        <motion.div
          className="rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-6 flex items-center gap-8" style={{ background: "linear-gradient(135deg, #064e3b 0%, #059669 40%, #0093E9 100%)" }}>
            {/* Score Circle */}
            <div className="flex-shrink-0 relative w-28 h-28">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="10" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="white" strokeWidth="10"
                  strokeLinecap="round" strokeDasharray="288 314" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">92</span>
                <span className="text-white/70 text-xs">健康分</span>
              </div>
            </div>
            {/* Stats */}
            <div className="flex-1 text-white">
              <h2 className="text-2xl font-bold mb-1">今日健康概况</h2>
              <p className="text-white/70 text-sm mb-4">您的综合健康评分为 <span className="text-green-300 font-bold">优秀</span></p>
              <div className="grid grid-cols-4 gap-3">
                {healthMetrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <div key={index} className="bg-white/15 backdrop-blur rounded-xl px-3 py-2.5 text-center">
                      <Icon className={`w-5 h-5 mx-auto mb-1 ${metric.color}`} />
                      <p className="text-base font-bold text-white leading-none">{metric.value}</p>
                      <p className="text-[10px] text-white/65 mt-0.5">{metric.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Quick Actions */}
            <div className="flex-shrink-0 flex flex-col gap-2">
              <button onClick={() => navigate("/appointment")} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-colors">
                <Calendar className="w-4 h-4" /> 预约挂号
              </button>
              <button onClick={() => navigate("/health-records")} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-colors">
                <FileText className="w-4 h-4" /> 健康档案
              </button>
              <button onClick={() => navigate("/consultation")} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-colors">
                <Phone className="w-4 h-4" /> 在线咨询
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-8 space-y-5">

            {/* Health Trends */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg">健康趋势</h3>
                  </div>
                  <span className="text-xs text-gray-400">本周数据</span>
                </div>
                <div className="space-y-5">
                  {[
                    { label: "本周运动目标", val: 75, color: "bg-blue-500" },
                    { label: "饮水量达标率", val: 60, color: "bg-cyan-500" },
                    { label: "睡眠质量评分", val: 85, color: "bg-indigo-500" },
                    { label: "用药准时率", val: 92, color: "bg-emerald-500" },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-gray-700">{item.label}</span>
                        <span className="font-semibold" style={{ color: "#0093E9" }}>{item.val}%</span>
                      </div>
                      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${item.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.val}%` }}
                          transition={{ duration: 1, delay: i * 0.15 + 0.3 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Health Records */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-lg">健康档案</h3>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Plus className="w-4 h-4 mr-1" /> 添加
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {healthRecords.map((record, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-blue-50/40 rounded-xl hover:from-blue-50 hover:to-blue-100/50 transition-colors cursor-pointer border border-gray-100">
                      <div className="w-11 h-11 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900 mb-0.5">{record.title}</p>
                        <p className="text-xs text-gray-500 mb-1 truncate">{record.hospital}</p>
                        <div className="flex items-center gap-1.5">
                          <Badge variant="secondary" className="text-xs px-2 py-0">{record.type}</Badge>
                          <span className="text-xs text-gray-400">{record.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Medications */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-rose-100 rounded-xl flex items-center justify-center">
                      <Pill className="w-5 h-5 text-rose-600" />
                    </div>
                    <h3 className="font-semibold text-lg">用药计划</h3>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Plus className="w-4 h-4 mr-1" /> 添加
                  </Button>
                </div>
                <div className="space-y-3">
                  {medications.map((med, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-rose-50 to-purple-50/50 rounded-xl border border-rose-100">
                      <div className="w-11 h-11 bg-gradient-to-br from-rose-400 to-purple-400 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Pill className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-semibold text-sm">{med.name}</p>
                          <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 text-xs px-2">{med.dosage}</Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{med.frequency}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{med.time}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs">剩余 {med.remaining}片</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Health News */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center">
                      <Bell className="w-5 h-5 text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-lg">健康资讯</h3>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full">查看更多</Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {healthNews.map((news, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                      <img src={news.image} alt={news.title} className="w-full h-36 object-cover" />
                      <div className="p-3">
                        <Badge variant="secondary" className="mb-1.5 text-xs">{news.category}</Badge>
                        <p className="font-semibold text-sm mb-1">{news.title}</p>
                        <p className="text-xs text-gray-500">{news.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="col-span-4 space-y-5">
            {/* Upcoming Appointments */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">预约挂号</h3>
                  <Button variant="ghost" size="sm" className="text-blue-600 h-7 px-2">
                    <Plus className="w-3.5 h-3.5 mr-1" /> 新增
                  </Button>
                </div>
                <div className="space-y-3">
                  {upcomingAppointments.map((apt, index) => (
                    <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-sm">{apt.doctor}</p>
                          <p className="text-xs text-gray-500">{apt.department}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm" style={{ color: "#0093E9" }}>{apt.date}</p>
                          <p className="text-xs text-gray-500">{apt.time}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">{apt.hospital}</p>
                      <Button size="sm" className="w-full bg-blue-500 hover:bg-blue-600 rounded-full text-xs h-7">查看详情</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-5">
                <h3 className="font-semibold mb-3">急救人员位置</h3>
                <div className="bg-gray-100 rounded-xl relative h-44 overflow-hidden mb-4">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=116.3%2C39.9%2C116.5%2C40.0&layer=mapnik"
                    className="w-full h-full rounded-xl"
                    style={{ border: 0 }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Card className="border border-blue-100">
                    <CardContent className="p-3 text-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mx-auto mb-2 border-2 border-blue-100">
                        <img src="https://images.unsplash.com/photo-1622902046580-2b47f47f5471?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbGUlMjBkb2N0b3IlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzUwMzIyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="李医生" className="w-full h-full object-cover" />
                      </div>
                      <p className="font-medium text-xs mb-0.5">李医生</p>
                      <p className="text-xs text-gray-500 mb-2">执业资质</p>
                      <Button size="sm" variant="outline" className="text-xs rounded-full w-full h-6">联系</Button>
                    </CardContent>
                  </Card>
                  <Card className="border border-blue-100">
                    <CardContent className="p-3 text-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mx-auto mb-2 border-2 border-blue-100">
                        <img src="https://images.unsplash.com/photo-1686737357932-ae1c50492a9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGZlbWFsZSUyMG51cnNlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc1MDkxMDI4fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="张护士" className="w-full h-full object-cover" />
                      </div>
                      <p className="font-medium text-xs mb-0.5">张医生</p>
                      <p className="text-xs text-gray-500 mb-2">资深护理</p>
                      <Button size="sm" variant="outline" className="text-xs rounded-full w-full h-6">联系</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Smart Health Tips */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-emerald-50 to-blue-50">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold">智能健康建议</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { title: "运动建议", desc: "建议每天进行30分钟有氧运动", color: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-500" },
                    { title: "饮食建议", desc: "血糖正常，保持当前饮食习惯", color: "bg-blue-100 text-blue-800", dot: "bg-blue-500" },
                    { title: "睡眠建议", desc: "睡眠良好，保持规律作息", color: "bg-violet-100 text-violet-800", dot: "bg-violet-500" },
                  ].map((tip, i) => (
                    <div key={i} className={`p-3 rounded-xl ${tip.color}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${tip.dot} flex-shrink-0`} />
                        <p className="font-semibold text-xs">{tip.title}</p>
                      </div>
                      <p className="text-xs opacity-80 pl-3.5">{tip.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg border-0 text-white" style={{ background: "linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)" }}>
              <CardContent className="p-5">
                <h3 className="font-semibold mb-3">快捷服务</h3>
                <div className="space-y-2">
                  {[
                    { label: "预约体检", icon: Calendar, path: "/appointment" },
                    { label: "健康档案", icon: FileText, path: "/health-records" },
                    { label: "在线咨询", icon: Phone, path: "/consultation" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <button key={i} onClick={() => navigate(item.path)} className="w-full flex items-center gap-3 bg-white/20 backdrop-blur hover:bg-white/30 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors text-left">
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        {item.label}
                        <ChevronRight className="w-4 h-4 ml-auto opacity-70" />
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
}