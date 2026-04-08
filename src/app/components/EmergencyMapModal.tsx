import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Phone,
  MessageCircle,
  Navigation,
  Clock,
  MapPin,
  ChevronRight,
  Radio,
  Star,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import mapImage from "figma:asset/b058913ecb41e342c4cb81518c003de8f8363382.png";

interface Personnel {
  id: number;
  name: string;
  role: string;
  specialty: string;
  distance: string;
  eta: string;
  status: "available" | "busy" | "enroute";
  rating: number;
  phone: string;
  location: string;
  avatar: string;
  unit: string;
}

const personnelList: Personnel[] = [
  {
    id: 1,
    name: "李明辉",
    role: "急救医生",
    specialty: "心脏急救",
    distance: "0.8 km",
    eta: "3 分钟",
    status: "available",
    rating: 4.9,
    phone: "138-0001-0001",
    location: "兴庆区急救站",
    avatar:
      "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbGUlMjBkb2N0b3IlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzUwMzIyNTJ8MA&ixlib=rb-4.1.0&q=80&w=400",
    unit: "急救车 01",
  },
  {
    id: 2,
    name: "张晓燕",
    role: "护理人员",
    specialty: "老年护理",
    distance: "1.2 km",
    eta: "5 分钟",
    status: "available",
    rating: 4.8,
    phone: "138-0002-0002",
    location: "金凤区社区医院",
    avatar:
      "https://images.unsplash.com/photo-1686737357932-ae1c50492a9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGZlbWFsZSUyMG51cnNlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc1MDkxMDI4fDA&ixlib=rb-4.1.0&q=80&w=400",
    unit: "急救车 03",
  },
  {
    id: 3,
    name: "王建国",
    role: "急救队员",
    specialty: "创伤急救",
    distance: "2.0 km",
    eta: "8 分钟",
    status: "enroute",
    rating: 4.7,
    phone: "138-0003-0003",
    location: "西夏区急救中心",
    avatar:
      "https://images.unsplash.com/photo-1583498802917-47a0e36dc4d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHBhcmFtZWRpYyUyMGVtZXJnZW5jeSUyMHJlc3BvbmRlcnxlbnwxfHx8fDE3NzUwOTY5ODJ8MA&ixlib=rb-4.1.0&q=80&w=400",
    unit: "急救车 07",
  },
  {
    id: 4,
    name: "刘芳",
    role: "全科医生",
    specialty: "内科急症",
    distance: "2.5 km",
    eta: "10 分钟",
    status: "available",
    rating: 4.9,
    phone: "138-0004-0004",
    location: "宁夏医科大学总院",
    avatar:
      "https://images.unsplash.com/photo-1612148348921-afa4f21d239c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwZG9jdG9yJTIwbWVkaWNhbCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzUwOTY5ODR8MA&ixlib=rb-4.1.0&q=80&w=400",
    unit: "急救车 12",
  },
  {
    id: 5,
    name: "陈志远",
    role: "急救司机",
    specialty: "紧急转运",
    distance: "3.1 km",
    eta: "12 分钟",
    status: "busy",
    rating: 4.6,
    phone: "138-0005-0005",
    location: "灵武市急救站",
    avatar:
      "https://images.unsplash.com/photo-1766325693423-69e9fe20605b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWJ1bGFuY2UlMjBkcml2ZXIlMjBlbWVyZ2VuY3klMjBtZWRpY2FsfGVufDF8fHx8MTc3NTA5Njk4NHww&ixlib=rb-4.1.0&q=80&w=400",
    unit: "急救车 15",
  },
];

const statusConfig = {
  available: {
    label: "空闲可用",
    color: "bg-green-100 text-green-700",
    dot: "bg-green-500",
    icon: CheckCircle2,
  },
  busy: {
    label: "执行任务",
    color: "bg-orange-100 text-orange-700",
    dot: "bg-orange-500",
    icon: AlertCircle,
  },
  enroute: {
    label: "前往现场",
    color: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
    icon: Loader2,
  },
};

interface EmergencyMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmergencyMapModal({ isOpen, onClose }: EmergencyMapModalProps) {
  const [selectedPersonnel, setSelectedPersonnel] = useState<Personnel | null>(
    null
  );
  const [filter, setFilter] = useState<"all" | "available" | "enroute">("all");
  const [callingId, setCallingId] = useState<number | null>(null);

  const filtered = personnelList.filter((p) => {
    if (filter === "all") return true;
    if (filter === "available") return p.status === "available";
    if (filter === "enroute") return p.status === "enroute";
    return true;
  });

  const handleCall = (id: number) => {
    setCallingId(id);
    setTimeout(() => setCallingId(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-4 z-50 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white font-semibold text-lg">
                      急救人员位置联系
                    </h2>
                    <p className="text-blue-100 text-sm">
                      实时追踪 · 当前区域共{" "}
                      <span className="text-white font-medium">
                        {personnelList.length}
                      </span>{" "}
                      名急救人员待命
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-white text-sm">实时更新</span>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 overflow-hidden">
                {/* Left: Map + Stats */}
                <div className="flex-1 flex flex-col overflow-hidden border-r border-gray-100">
                  {/* Map */}
                  <div className="relative h-72 flex-shrink-0 overflow-hidden">
                    <img
                      src={mapImage}
                      alt="急救人员位置地图"
                      className="w-full h-full object-cover"
                    />
                    {/* Map Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                    {/* Pins on map */}
                    <motion.div
                      className="absolute top-[38%] left-[42%]"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <div className="relative">
                        <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">1</span>
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-500 rotate-45" />
                      </div>
                    </motion.div>
                    <motion.div
                      className="absolute top-[52%] left-[58%]"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                    >
                      <div className="relative">
                        <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">2</span>
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-500 rotate-45" />
                      </div>
                    </motion.div>
                    <motion.div
                      className="absolute top-[30%] left-[65%]"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                    >
                      <div className="relative">
                        <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">3</span>
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500 rotate-45" />
                      </div>
                    </motion.div>
                    <motion.div
                      className="absolute top-[60%] left-[30%]"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 2, delay: 1.5 }}
                    >
                      <div className="relative">
                        <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">4</span>
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-500 rotate-45" />
                      </div>
                    </motion.div>
                    <motion.div
                      className="absolute top-[45%] left-[75%]"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 2, delay: 0.8 }}
                    >
                      <div className="relative">
                        <div className="w-8 h-8 bg-orange-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">5</span>
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-orange-500 rotate-45" />
                      </div>
                    </motion.div>

                    {/* Your location */}
                    <motion.div
                      className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <div className="w-5 h-5 bg-red-500 rounded-full border-2 border-white shadow-lg" />
                      <div className="absolute inset-0 w-5 h-5 bg-red-400 rounded-full animate-ping opacity-60" />
                    </motion.div>

                    {/* Legend */}
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur rounded-lg px-3 py-2 flex items-center gap-3 text-xs shadow">
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-red-500 rounded-full" />
                        您的位置
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-green-500 rounded-full" />
                        空闲
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-blue-500 rounded-full" />
                        前往
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 bg-orange-500 rounded-full" />
                        忙碌
                      </span>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-3 p-4 flex-shrink-0 bg-gray-50 border-b border-gray-100">
                    <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-green-100">
                      <p className="text-2xl font-bold text-green-600">3</p>
                      <p className="text-xs text-gray-500 mt-0.5">空闲人员</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-blue-100">
                      <p className="text-2xl font-bold text-blue-600">1</p>
                      <p className="text-xs text-gray-500 mt-0.5">前往现场</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-orange-100">
                      <p className="text-2xl font-bold text-orange-600">1</p>
                      <p className="text-xs text-gray-500 mt-0.5">执行任务</p>
                    </div>
                  </div>

                  {/* SOS Button */}
                  <div className="p-4 flex-shrink-0">
                    <motion.button
                      className="w-full py-3.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-red-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Radio className="w-5 h-5 animate-pulse" />
                      一键呼叫最近急救人员
                    </motion.button>
                  </div>
                </div>

                {/* Right: Personnel List */}
                <div className="w-96 flex flex-col overflow-hidden">
                  {/* Filter */}
                  <div className="flex gap-2 p-4 border-b border-gray-100 flex-shrink-0">
                    {(["all", "available", "enroute"] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`flex-1 py-1.5 rounded-full text-sm transition-all ${
                          filter === f
                            ? "bg-blue-500 text-white shadow-sm"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {f === "all" ? "全部" : f === "available" ? "空闲" : "前往中"}
                      </button>
                    ))}
                  </div>

                  {/* List */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {filtered.map((person, index) => {
                      const sc = statusConfig[person.status];
                      const isSelected = selectedPersonnel?.id === person.id;
                      const isCalling = callingId === person.id;
                      return (
                        <motion.div
                          key={person.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() =>
                            setSelectedPersonnel(isSelected ? null : person)
                          }
                          className={`rounded-xl border-2 cursor-pointer transition-all ${
                            isSelected
                              ? "border-blue-400 bg-blue-50 shadow-md"
                              : "border-gray-100 bg-white hover:border-blue-200 hover:shadow-sm"
                          }`}
                        >
                          <div className="p-3">
                            <div className="flex items-center gap-3">
                              {/* Avatar with number */}
                              <div className="relative flex-shrink-0">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow">
                                  <img
                                    src={person.avatar}
                                    alt={person.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                                  <span className="text-white text-[9px] font-bold">
                                    {person.id}
                                  </span>
                                </div>
                              </div>

                              {/* Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className="font-semibold text-gray-900">
                                    {person.name}
                                  </span>
                                  <Badge
                                    className={`text-[10px] px-2 py-0 ${sc.color} border-0`}
                                  >
                                    <span
                                      className={`w-1.5 h-1.5 rounded-full ${sc.dot} inline-block mr-1`}
                                    />
                                    {sc.label}
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-500 truncate">
                                  {person.role} · {person.specialty}
                                </p>
                                <div className="flex items-center gap-3 mt-1">
                                  <span className="flex items-center gap-1 text-xs text-gray-500">
                                    <Navigation className="w-3 h-3 text-blue-400" />
                                    {person.distance}
                                  </span>
                                  <span className="flex items-center gap-1 text-xs text-blue-600 font-medium">
                                    <Clock className="w-3 h-3" />
                                    {person.eta}
                                  </span>
                                  <span className="flex items-center gap-1 text-xs text-amber-500 ml-auto">
                                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                    {person.rating}
                                  </span>
                                </div>
                              </div>

                              <ChevronRight
                                className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${isSelected ? "rotate-90" : ""}`}
                              />
                            </div>

                            {/* Expanded Detail */}
                            <AnimatePresence>
                              {isSelected && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pt-3 mt-3 border-t border-blue-100 space-y-2">
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                      <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                                      <span>{person.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                      <Radio className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                                      <span>{person.unit}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                      <Phone className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                                      <span>{person.phone}</span>
                                    </div>
                                    <div className="flex gap-2 pt-1">
                                      <motion.button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleCall(person.id);
                                        }}
                                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
                                          isCalling
                                            ? "bg-green-500 text-white"
                                            : "bg-blue-500 hover:bg-blue-600 text-white"
                                        }`}
                                        whileTap={{ scale: 0.97 }}
                                      >
                                        {isCalling ? (
                                          <>
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            呼叫中...
                                          </>
                                        ) : (
                                          <>
                                            <Phone className="w-3.5 h-3.5" />
                                            电话联系
                                          </>
                                        )}
                                      </motion.button>
                                      <motion.button
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium border-2 border-blue-200 text-blue-600 hover:bg-blue-50 transition-all"
                                        whileTap={{ scale: 0.97 }}
                                      >
                                        <MessageCircle className="w-3.5 h-3.5" />
                                        发送消息
                                      </motion.button>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Bottom */}
                  <div className="p-3 border-t border-gray-100 flex-shrink-0">
                    <p className="text-center text-xs text-gray-400">
                      数据每 30 秒自动刷新 · 位置信息仅供参考
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
