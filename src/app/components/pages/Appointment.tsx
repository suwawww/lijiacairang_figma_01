import { useState } from "react";
import { ArrowLeft, Calendar as CalendarIcon, Clock, User, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useNavigate } from "react-router";
import { useMode } from "../../contexts/ModeContext";
import { ModeToggle } from "../ModeToggle";

export function Appointment() {
  const navigate = useNavigate();
  const { mode } = useMode();
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);

  const hospitals = [
    { id: 1, name: "市人民医院", address: "朝阳区建国路1号", distance: "1.2km" },
    { id: 2, name: "中心医院", address: "朝阳区东三环中路38号", distance: "2.5km" },
    { id: 3, name: "社区卫生中心", address: "朝阳区望京街道", distance: "0.8km" },
  ];

  const departments = [
    "心内科", "神经内科", "消化内科", "内分泌科", "呼吸内科", "全科"
  ];

  const doctors = [
    { id: 1, name: "李医生", title: "主任医师", specialty: "心内科", hospital: "市人民医院", rating: "4.9", patients: "1200+", available: ["上午", "下午"] },
    { id: 2, name: "张医生", title: "副主任医师", specialty: "心内科", hospital: "市人民医院", rating: "4.8", patients: "980+", available: ["上午"] },
    { id: 3, name: "王医生", title: "主治医师", specialty: "全科", hospital: "社区卫生中心", rating: "4.7", patients: "1500+", available: ["全天"] },
  ];

  const timeSlots = [
    { time: "09:00", available: true },
    { time: "09:30", available: true },
    { time: "10:00", available: false },
    { time: "10:30", available: true },
    { time: "11:00", available: true },
    { time: "14:00", available: true },
    { time: "14:30", available: false },
    { time: "15:00", available: true },
    { time: "15:30", available: true },
    { time: "16:00", available: true },
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
            <h1 className="text-4xl font-bold">预约挂号</h1>
            <ModeToggle />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Hospitals */}
          <Card className="mb-8 shadow-xl border-4 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardContent className="p-10">
              <h2 className="text-4xl font-bold text-blue-900 mb-8">选择医院</h2>
              <div className="space-y-6">
                {hospitals.map((hospital) => (
                  <div key={hospital.id} className="bg-white p-8 rounded-2xl border-4 border-blue-200 shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                          <MapPin className="w-10 h-10 text-white" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-blue-900 mb-2">{hospital.name}</h3>
                          <p className="text-2xl text-blue-700">{hospital.address}</p>
                        </div>
                      </div>
                      <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-2xl px-8 py-3 rounded-2xl">
                        {hospital.distance}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Doctors */}
          <Card className="mb-8 shadow-xl border-4 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardContent className="p-10">
              <h2 className="text-4xl font-bold text-blue-900 mb-8">选择医生</h2>
              <div className="space-y-6">
                {doctors.map((doctor) => (
                  <div key={doctor.id} className="bg-white p-8 rounded-2xl border-4 border-blue-200 shadow-lg">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <User className="w-12 h-12 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-3xl font-bold text-blue-900 mb-2">{doctor.name}</h3>
                        <p className="text-2xl text-blue-700 mb-2">{doctor.title} · {doctor.specialty}</p>
                        <p className="text-xl text-blue-600">{doctor.hospital}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-blue-900 mb-2">★ {doctor.rating}</p>
                        <p className="text-xl text-blue-700">{doctor.patients} 患者</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => setSelectedDoctor(doctor.id)}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-2xl py-6 rounded-2xl"
                    >
                      选择医生
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Time Slots */}
          {selectedDoctor && (
            <Card className="shadow-xl border-4 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardContent className="p-10">
                <h2 className="text-4xl font-bold text-blue-900 mb-8">选择时间</h2>
                <div className="grid grid-cols-3 gap-6">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      disabled={!slot.available}
                      className={`p-8 text-2xl font-bold rounded-2xl border-4 transition-all ${
                        slot.available
                          ? "bg-white border-blue-200 text-blue-900 hover:shadow-xl hover:scale-105"
                          : "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <Clock className="w-10 h-10 mx-auto mb-3" />
                      {slot.time}
                    </button>
                  ))}
                </div>
                <Button className="w-full mt-8 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-2xl py-8 rounded-2xl">
                  确认预约
                </Button>
              </CardContent>
            </Card>
          )}
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
          <h1 className="text-2xl font-bold">预约挂号</h1>
          <ModeToggle />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Left - Form */}
          <div className="col-span-8">
            <Card className="shadow-lg border-0 mb-6">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">预约信息</h2>
                <div className="space-y-4">
                  <div>
                    <Label>选择医院</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择医院" />
                      </SelectTrigger>
                      <SelectContent>
                        {hospitals.map((hospital) => (
                          <SelectItem key={hospital.id} value={hospital.id.toString()}>
                            {hospital.name} ({hospital.distance})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>选择科室</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择科室" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>就诊日期</Label>
                    <Input type="date" />
                  </div>

                  <div>
                    <Label>患者姓名</Label>
                    <Input placeholder="请输入患者姓名" />
                  </div>

                  <div>
                    <Label>联系电话</Label>
                    <Input type="tel" placeholder="请输入联系电话" />
                  </div>

                  <div>
                    <Label>就诊说明</Label>
                    <Input placeholder="请简要描述症状或需求" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Doctors List */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">推荐医生</h3>
                <div className="space-y-4">
                  {doctors.map((doctor) => (
                    <div key={doctor.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{doctor.name}</h4>
                        <p className="text-sm text-gray-600">{doctor.title} · {doctor.specialty}</p>
                        <p className="text-xs text-gray-500">{doctor.hospital}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-600">★ {doctor.rating}</p>
                        <p className="text-xs text-gray-500">{doctor.patients}</p>
                      </div>
                      <Button 
                        onClick={() => setSelectedDoctor(doctor.id)}
                        size="sm" 
                        className="bg-blue-500 hover:bg-blue-600 rounded-full"
                      >
                        选择
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right - Time Slots */}
          <div className="col-span-4">
            <Card className="shadow-lg border-0 mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">可预约时间</h3>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      disabled={!slot.available}
                      className={`p-4 text-sm font-medium rounded-xl transition-all ${
                        slot.available
                          ? "bg-blue-50 hover:bg-blue-100 text-blue-700 border-2 border-blue-200"
                          : "bg-gray-50 text-gray-400 border-2 border-gray-200 cursor-not-allowed"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-500 to-purple-500 text-white">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">预约须知</h3>
                <ul className="space-y-2 text-sm">
                  <li>• 请提前15分钟到达医院</li>
                  <li>• 携带身份证和医保卡</li>
                  <li>• 如需取消请提前24小时</li>
                  <li>• 首次就诊需建立档案</li>
                </ul>
              </CardContent>
            </Card>

            <Button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 py-6 text-lg rounded-xl">
              确认预约
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
