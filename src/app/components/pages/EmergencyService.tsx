import { Phone, Video, MessageCircle, Heart, Activity, Stethoscope, AlertCircle, ChevronRight, MapPin, User, Shield, Clock } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useMode } from "../../contexts/ModeContext";
import { ModeToggle } from "../ModeToggle";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

// ── Long-press SOS button ──────────────────────────────────────────────────
interface SOSLongPressProps {
  size?: "normal" | "large";
  onTrigger: () => void;
}

function SOSLongPressButton({ size = "normal", onTrigger }: SOSLongPressProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"idle" | "pressing" | "triggered">("idle");

  // Use refs so interval callback always sees the latest values
  const intervalRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef   = useRef(0);
  const phaseRef      = useRef<"idle" | "pressing" | "triggered">("idle");
  const onTriggerRef  = useRef(onTrigger);
  useEffect(() => { onTriggerRef.current = onTrigger; }, [onTrigger]);

  const isLarge  = size === "large";
  const DURATION = 3000;
  const TICK     = 30;

  // Cleanup on unmount
  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  function stopInterval() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function startPress() {
    if (phaseRef.current === "triggered") return;
    stopInterval();
    progressRef.current = 0;
    setProgress(0);
    phaseRef.current = "pressing";
    setPhase("pressing");

    intervalRef.current = setInterval(() => {
      progressRef.current += (TICK / DURATION) * 100;

      if (progressRef.current >= 100) {
        progressRef.current = 100;
        setProgress(100);
        stopInterval();
        phaseRef.current = "triggered";
        setPhase("triggered");
        // Navigate after a short visual pause
        setTimeout(() => onTriggerRef.current(), 300);
        return;
      }

      setProgress(progressRef.current);
    }, TICK);
  }

  function cancelPress() {
    if (phaseRef.current === "triggered") return;
    stopInterval();
    progressRef.current = 0;
    setProgress(0);
    phaseRef.current = "idle";
    setPhase("idle");
  }

  // SVG ring params
  const btnSize = isLarge ? 288 : 160;
  const radius  = isLarge ? 132 : 72;
  const stroke  = isLarge ? 10  : 6;
  const circ    = 2 * Math.PI * radius;
  const dash    = (progress / 100) * circ;

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: btnSize, height: btnSize }}
    >
      {/* Breathing glow when idle */}
      {phase === "idle" && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,147,233,0.3) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* SVG progress ring */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={btnSize}
        height={btnSize}
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle cx={btnSize / 2} cy={btnSize / 2} r={radius}
          fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={stroke} />
        <circle cx={btnSize / 2} cy={btnSize / 2} r={radius}
          fill="none" stroke="#ffffff" strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`} />
      </svg>

      {/* Inner button */}
      <button
        onMouseDown={startPress}
        onMouseUp={cancelPress}
        onMouseLeave={cancelPress}
        onTouchStart={(e) => { e.preventDefault(); startPress(); }}
        onTouchEnd={(e)   => { e.preventDefault(); cancelPress(); }}
        onTouchCancel={cancelPress}
        className="rounded-full bg-white/90 hover:bg-white flex flex-col items-center justify-center shadow-2xl transition-transform active:scale-95"
        style={{ width: btnSize - stroke * 2 - 8, height: btnSize - stroke * 2 - 8 }}
        aria-label="长按3秒拨打120"
      >
        <AnimatePresence mode="wait">
          {phase === "triggered" ? (
            <motion.div key="triggered"
              initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center"
            >
              <Phone className={isLarge ? "w-24 h-24 mb-2" : "w-10 h-10 mb-1"} style={{ color: "#0093E9" }} />
              <span className={`font-bold ${isLarge ? "text-3xl" : "text-base"}`} style={{ color: "#0093E9" }}>
                呼叫中…
              </span>
            </motion.div>
          ) : phase === "pressing" ? (
            <motion.div key="pressing" className="flex flex-col items-center">
              <Phone className={isLarge ? "w-24 h-24 mb-2" : "w-10 h-10 mb-1"} style={{ color: "#0093E9" }} />
              <span className={`font-bold tabular-nums ${isLarge ? "text-3xl" : "text-base"}`} style={{ color: "#0093E9" }}>
                {Math.max(1, Math.ceil(3 - (progress / 100) * 3))}s
              </span>
            </motion.div>
          ) : (
            <motion.div key="idle" className="flex flex-col items-center">
              <Phone className={isLarge ? "w-24 h-24 mb-2" : "w-10 h-10 mb-1"} style={{ color: "#0093E9" }} />
              <span className={`font-bold ${isLarge ? "text-3xl" : "text-base"}`} style={{ color: "#0093E9" }}>
                SOS
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
// ──────────────────────────────────────────────────────────────────────────────

export function EmergencyService() {
  const { mode } = useMode();
  const navigate = useNavigate();
  const [selectedGuide, setSelectedGuide] = useState<number | null>(null);

  const handleSOSTrigger = () => {
    navigate("/emergency-call");
  };

  const emergencyGuides = [
    {
      id: 1,
      icon: Heart,
      title: "心肺复苏 (CPR)",
      steps: [
        "确保现场安全，检查患者意识",
        "呼叫120急救电话",
        "使患者���在坚硬平面上",
        "进行胸外按压：每分钟100-120次",
        "打开气道，进行人工呼吸",
        "持续进行直到专业人员到达"
      ]
    },
    {
      id: 2,
      icon: Activity,
      title: "气道梗阻急救",
      steps: [
        "判断患者是否能说话或咳嗽",
        "站在患者身后，双臂环抱其腰部",
        "一手握拳，拳眼对准患者腹部",
        "另一手包住拳头，快速向内向上冲击",
        "重复操作直到异物排出",
        "如失去意识，立即进行CPR"
      ]
    },
    {
      id: 3,
      icon: AlertCircle,
      title: "严重出血处理",
      steps: [
        "让伤者坐下或躺下",
        "用干净布料直接压迫伤口",
        "保持压迫至少10分钟",
        "如可能，抬高受伤部位",
        "不要移除已粘附在伤口的布料",
        "持续压迫直到医护人员到达"
      ]
    }
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
              backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.85), rgba(34, 211, 238, 0.85)), url('https://images.unsplash.com/photo-1622115585848-1d5b6e8af4e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJzdCUyMGFpZCUyMGVtZXJnZW5jeSUyMHRyYWluaW5nJTIwQ1BSfGVufDF8fHx8MTc3NTAwNzY1MXww&ixlib=rb-4.1.0&q=80&w=1080')`
            }}
          >
            <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
              <h1 className="text-white text-6xl font-bold mb-6">应急救援服务</h1>
              <p className="text-white text-2xl mb-8">随时待命，专业急救</p>
              
              <div className="flex gap-4 items-center">
                <button
                  className="flex items-center gap-3 px-10 py-5 text-white rounded-2xl transition-all shadow-2xl text-2xl font-bold hover:opacity-90"
                  style={{ background: "linear-gradient(to right, #80D0C7, #0093E9)" }}
                  onClick={() => navigate("/emergency-call")}
                >
                  <Phone className="w-10 h-10" />
                  立即呼叫 120
                </button>
                
                <div className="ml-auto">
                  <ModeToggle />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Emergency Call - Giant Long-Press Button */}
          <Card className="mb-8 shadow-xl border-0 text-white" style={{ background: "linear-gradient(to bottom right, #80D0C7, #0093E9)" }}>
            <CardContent className="p-12">
              <h3 className="text-5xl font-bold mb-8 text-center">紧急呼救</h3>
              <div className="flex items-center justify-center">
                <SOSLongPressButton size="large" onTrigger={handleSOSTrigger} />
              </div>
              <p className="text-center text-3xl mt-8 text-white/90">长按3秒自动拨打120</p>
            </CardContent>
          </Card>

          {/* Quick Actions - Large */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-400 to-cyan-400 text-white">
              <button 
                onClick={() => navigate("/video-guide")}
                className="w-full p-12 text-center"
              >
                <Video className="w-28 h-28 mx-auto mb-6" />
                <p className="text-4xl font-bold">视频急救指导</p>
              </button>
            </Card>
            <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
              <button 
                onClick={() => navigate("/consultation")}
                className="w-full p-12 text-center"
              >
                <MessageCircle className="w-28 h-28 mx-auto mb-6" />
                <p className="text-4xl font-bold">在线咨询医生</p>
              </button>
            </Card>
          </div>

          {/* Emergency Guides - Simplified */}
          <Card className="shadow-xl border-4 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardContent className="p-10">
              <h3 className="text-4xl font-bold mb-8 text-blue-900">急救操作指南</h3>
              <div className="space-y-6">
                {emergencyGuides.map((guide) => (
                  <div key={guide.id}>
                    <button
                      onClick={() => setSelectedGuide(selectedGuide === guide.id ? null : guide.id)}
                      className="w-full flex items-center justify-between p-8 bg-white hover:bg-blue-50 rounded-2xl transition-colors border-4 border-blue-200 shadow-lg"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                          <guide.icon className="w-12 h-12 text-white" />
                        </div>
                        <span className="text-3xl font-bold text-blue-900">{guide.title}</span>
                      </div>
                      <ChevronRight
                        className={`w-10 h-10 text-blue-400 transition-transform ${
                          selectedGuide === guide.id ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    {selectedGuide === guide.id && (
                      <div className="mt-6 p-8 bg-white border-4 border-blue-300 rounded-2xl shadow-lg">
                        <h4 className="text-3xl font-bold mb-6 text-blue-700">操作步骤：</h4>
                        <ol className="space-y-6">
                          {guide.steps.map((step, index) => (
                            <li key={index} className="flex gap-6">
                              <span className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-2xl">
                                {index + 1}
                              </span>
                              <span className="text-2xl text-blue-900 pt-2">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tips - Large */}
          <Card className="mt-8 shadow-xl border-4 border-blue-300 bg-gradient-to-br from-blue-100 to-cyan-100">
            <CardContent className="p-10">
              <h3 className="text-4xl font-bold mb-6 flex items-center gap-4 text-blue-900">
                <Clock className="w-10 h-10 text-blue-600" />
                紧急提示
              </h3>
              <ul className="space-y-5 text-2xl text-blue-900">
                <li className="flex gap-4">
                  <span className="text-blue-600 text-3xl">•</span>
                  <span>保持冷静，评估现场安全</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-600 text-3xl">•</span>
                  <span>立即拨打120说明情况</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-600 text-3xl">•</span>
                  <span>按照指导进行初步急救</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-blue-600 text-3xl">•</span>
                  <span>不要移动受伤严重者</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    );
  }

  // Smart Mode - Original Design
  const emergencyContacts = [
    { icon: Phone, label: "急救中心", number: "120", desc: "24小时急救响应", color: "from-red-400 to-rose-500", path: "/emergency-call" },
    { icon: Shield, label: "消防救援", number: "119", desc: "火灾抢险救援", color: "from-orange-400 to-amber-500", path: "/emergency-call" },
    { icon: Stethoscope, label: "医疗咨询", number: "在线", desc: "专家在线问诊", color: "from-blue-400 to-cyan-500", path: "/consultation" },
  ];

    const nearbyResponders = [
      {
        name: "李医生",
        type: "急救医",
        specialty: "心内科专家 · 15年经验",
        distance: "1.2km",
        rating: "4.9",
        available: true,
        image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbGUlMjBkb2N0b3IlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzUwMzIyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        name: "张护士",
        type: "急救护士",
        specialty: "急诊科 · 8年经验",
        distance: "2.5km",
        rating: "4.8",
        available: true,
        image: "https://images.unsplash.com/photo-1686737357932-ae1c50492a9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGZlbWFsZSUyMG51cnNlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc1MDkxMDI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        name: "王医生",
        type: "全科医生",
        specialty: "社区医疗 · 10年经验",
        distance: "3.8km",
        rating: "4.7",
        available: false,
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbGUlMjBkb2N0b3J8ZW58MXx8fHwxNzc1MDkzNTI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      },
    ];

  const quickServices = [
    { title: "视频急救指导", icon: Video, color: "from-purple-400 to-purple-600", path: "/video-guide" },
    { title: "在线医疗咨询", icon: MessageCircle, color: "from-blue-400 to-blue-600", path: "/consultation" },
    { title: "健康档案查看", icon: Stethoscope, color: "from-green-400 to-green-600", path: "/health-records" },
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
            backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(185,28,28,0.75) 50%, rgba(0,147,233,0.7) 100%), url('https://images.unsplash.com/photo-1622115585848-1d5b6e8af4e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJzdCUyMGFpZCUyMGVtZXJnZW5jeSUyMHRyYWluaW5nJTIwQ1BSfGVufDF8fHx8MTc3NTAwNzY1MXww&ixlib=rb-4.1.0&q=80&w=1080')`
          }}
        >
          <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              <span className="text-red-300 text-sm font-medium tracking-wide">紧急救援服务</span>
            </div>
            <h1 className="text-white text-5xl font-bold mb-3">应急救援中心</h1>
            <p className="text-white/80 text-lg mb-7">专业急救团队随时待命，守护每一秒的生命安全</p>
            <div className="flex gap-3 items-center">
              <button
                onClick={() => navigate("/emergency-call")}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all shadow-lg font-semibold text-sm"
              >
                <Phone className="w-4 h-4" /> 立即呼叫 120
              </button>
              <button
                onClick={() => navigate("/video-guide")}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur hover:bg-white/30 text-white rounded-xl transition-all text-sm"
              >
                <Video className="w-4 h-4" /> 视频急救指导
              </button>
              <div className="ml-auto"><ModeToggle /></div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">

        {/* ── Full-Width SOS Panel ── */}
        <motion.div
          className="rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            className="p-8 flex items-center gap-10"
            style={{ background: "linear-gradient(135deg, #0f172a 0%, #0093E9 55%, #80D0C7 100%)" }}
          >
            {/* Left: text */}
            <div className="flex-1 text-white">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 bg-red-400 rounded-full animate-pulse" />
                <span className="text-red-300 text-sm font-medium">长按3秒 · 自动触发</span>
              </div>
              <h2 className="text-4xl font-bold mb-3">紧急呼救 SOS</h2>
              <p className="text-white/75 leading-relaxed mb-6">
                系统将自动定位您的位置并通知最近的急救团队。专业医护人员会第一时间响应，保障您的生命安全。
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: MapPin, label: "自动定位", desc: "GPS精准定位" },
                  { icon: Clock, label: "3分钟响应", desc: "极速到达现场" },
                  { icon: Shield, label: "24h待命", desc: "全天候专业服务" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl p-3">
                      <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold leading-none">{item.label}</p>
                        <p className="text-white/60 text-xs mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: SOS button */}
            <div className="flex flex-col items-center gap-4 flex-shrink-0">
              <SOSLongPressButton size="large" onTrigger={handleSOSTrigger} />
              <p className="text-white/70 text-sm text-center">长按3秒自动拨打120</p>
            </div>
          </div>
        </motion.div>

        {/* ── Speed Dial Cards ── */}
        <div className="grid grid-cols-3 gap-4">
          {emergencyContacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <motion.button
                key={index}
                onClick={() => navigate(contact.path)}
                className={`bg-gradient-to-br ${contact.color} text-white rounded-2xl p-6 shadow-lg hover:shadow-xl text-left group relative overflow-hidden`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                whileHover={{ y: -3 }}
              >
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full" />
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-white/25 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-3xl font-bold text-white/90">{contact.number}</span>
                </div>
                <p className="font-bold text-lg">{contact.label}</p>
                <p className="text-sm text-white/75 mt-1">{contact.desc}</p>
                <div className="flex items-center gap-1 mt-3 text-white/60 text-xs">
                  <span>点击拨打</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* ── Quick Services Row ── */}
        <div className="grid grid-cols-3 gap-4">
          {quickServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.button
                key={index}
                onClick={() => navigate(service.path)}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100 group"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                whileHover={{ x: 2 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{service.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">点击进入</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </motion.button>
            );
          })}
        </div>

        {/* ── Main 2-col Grid ── */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left: Guides + AI */}
          <div className="col-span-8 space-y-5">
            {/* Emergency Guides */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center">
                    <Heart className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">急救操作指南</h3>
                    <p className="text-xs text-gray-500">点击查看分步骤操作说明</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {emergencyGuides.map((guide) => (
                    <div key={guide.id}>
                      <button
                        onClick={() => setSelectedGuide(selectedGuide === guide.id ? null : guide.id)}
                        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50/50 hover:from-blue-50 hover:to-blue-100/50 rounded-xl transition-colors border border-gray-100"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                            <guide.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-left">
                            <span className="font-semibold text-gray-900">{guide.title}</span>
                            <p className="text-xs text-gray-500 mt-0.5">{guide.steps.length} 个操作步骤</p>
                          </div>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${selectedGuide === guide.id ? "rotate-90" : ""}`} />
                      </button>

                      {selectedGuide === guide.id && (
                        <motion.div
                          className="mt-2 p-5 bg-blue-50 border border-blue-200 rounded-xl"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                        >
                          <h4 className="font-semibold text-sm text-blue-700 mb-4">操作步骤：</h4>
                          <div className="space-y-3">
                            {guide.steps.map((step, index) => (
                              <div key={index} className="flex gap-3 items-start">
                                <span className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                  {index + 1}
                                </span>
                                <span className="text-sm text-gray-700 pt-0.5">{step}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Emergency Assistant */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-violet-50 to-blue-50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </span>
                  <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">AI急救助手</span>
                </h3>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm text-gray-700">遇到紧急情况？我可以为您提供即时急救指导和步骤演示。</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {["心脏急救", "摔倒处理", "窒息急救"].map((label, i) => (
                    <Button key={i} variant="outline" className="rounded-full text-sm">{label}</Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Nearby Responders */}
          <div className="col-span-4 space-y-5">
            <Card className="shadow-lg border-0">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">附近急救人员</h3>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    {nearbyResponders.filter(r => r.available).length}人在线
                  </Badge>
                </div>

                {/* Map */}
                <div className="bg-gray-100 rounded-xl mb-4 relative h-44 overflow-hidden">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=116.3%2C39.9%2C116.5%2C40.0&layer=mapnik"
                    className="w-full h-full rounded-xl"
                    style={{ border: 0 }}
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded-full px-2 py-1 flex items-center gap-1 text-xs text-gray-700">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> 实时
                  </div>
                </div>

                <div className="space-y-3">
                  {nearbyResponders.map((responder, index) => (
                    <div key={index} className={`p-3 rounded-xl border transition-colors ${responder.available ? "border-blue-200 bg-blue-50/50 hover:bg-blue-50" : "border-gray-200 bg-gray-50"}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow flex-shrink-0">
                          <img src={responder.image} alt={responder.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-sm">{responder.name}</span>
                            {responder.available && <span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />}
                          </div>
                          <p className="text-xs text-gray-500 truncate">{responder.specialty}</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
                          <MapPin className="w-3 h-3" />{responder.distance}
                        </div>
                      </div>
                      {responder.available && (
                        <Button size="sm" className="w-full bg-blue-500 hover:bg-blue-600 rounded-full text-xs h-7">
                          立即联系
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
              <CardContent className="p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-amber-800">
                  <Clock className="w-4 h-4 text-amber-600" /> 紧急提示
                </h3>
                <ul className="space-y-2">
                  {["保持冷静，评估现场安全", "立即拨打120说明情况", "按照指导进行初步急救", "不要移动受伤严重者"].map((tip, i) => (
                    <li key={i} className="flex gap-2 text-sm text-amber-900">
                      <span className="text-amber-500 mt-0.5 flex-shrink-0">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
}