import { User, Phone, MapPin, Heart, Award, LogOut, Calendar, FileText, Settings, Bell, Shield, ChevronRight, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Switch } from "../ui/switch";
import { useMode } from "../../contexts/ModeContext";
import { ModeToggle } from "../ModeToggle";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

export function Profile() {
  const { mode } = useMode();
  const navigate = useNavigate();

  const userInfo = {
    name: "李先生",
    phone: "138****8888",
    location: "北京市朝阳区XX街道XX社区",
    age: "68岁",
    idCard: "110***********1234",
  };

  const emergencyContacts = [
    { name: "李女士", relationship: "配偶", phone: "139****9999" },
    { name: "李明", relationship: "儿子", phone: "137****7777" },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

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
              backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.85), rgba(34, 211, 238, 0.85)), url('https://images.unsplash.com/photo-1758691462749-a95ce1bd7f96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdG9yJTIwY29uc3VsdGF0aW9uJTIwaGVhbHRoY2FyZXxlbnwxfHx8fDE3NzUwMDc2NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080')`
            }}
          >
            <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
              <h1 className="text-white text-6xl font-bold mb-6">个人信息</h1>
              <p className="text-white text-2xl mb-8">管理您的账户</p>
              
              <div className="flex gap-4 items-center">
                <button 
                  onClick={() => navigate("/edit-profile")}
                  className="flex items-center gap-3 px-10 py-5 bg-white hover:bg-gray-100 text-blue-600 rounded-2xl transition-colors shadow-2xl text-2xl font-bold"
                >
                  <User className="w-10 h-10" />
                  编辑资料
                </button>
                
                <div className="ml-auto">
                  <ModeToggle />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Personal Info - Large */}
          <Card className="mb-8 shadow-xl border-4 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardContent className="p-10">
              <div className="flex items-center gap-8 mb-10">
                <Avatar className="w-32 h-32">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-5xl">
                    李
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-5xl font-bold mb-3 text-blue-900">{userInfo.name}</h2>
                  <p className="text-3xl text-blue-700">{userInfo.age}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-center gap-6 p-8 bg-white rounded-2xl border-4 border-blue-200 shadow-lg">
                  <Phone className="w-12 h-12 text-blue-600" />
                  <div>
                    <p className="text-xl text-blue-600 mb-2">手机号</p>
                    <p className="text-3xl font-bold text-blue-900">{userInfo.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 p-8 bg-white rounded-2xl border-4 border-blue-200 shadow-lg">
                  <MapPin className="w-12 h-12 text-blue-600" />
                  <div>
                    <p className="text-xl text-blue-600 mb-2">居住地址</p>
                    <p className="text-3xl font-bold text-blue-900">{userInfo.location}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts - Large */}
          <Card className="mb-8 shadow-xl border-4 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardContent className="p-10">
              <h2 className="text-4xl font-bold mb-8 text-blue-900">紧急联系人</h2>
              <div className="space-y-6">
                {emergencyContacts.map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-8 bg-white rounded-2xl border-4 border-blue-200 shadow-lg"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <User className="w-12 h-12 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold mb-2 text-blue-900">{contact.name}</h3>
                        <p className="text-2xl text-blue-700">{contact.phone}</p>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-500 px-8 py-3 text-2xl rounded-2xl">
                      {contact.relationship}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Account Stats - Large */}
          <Card className="mb-8 shadow-xl border-0 bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <CardContent className="p-10">
              <h3 className="text-4xl font-bold mb-8">账户统计</h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white/20 backdrop-blur rounded-2xl">
                  <p className="text-2xl text-white/90 mb-4">加入天数</p>
                  <p className="text-6xl font-bold">365</p>
                </div>
                <div className="text-center p-6 bg-white/20 backdrop-blur rounded-2xl">
                  <p className="text-2xl text-white/90 mb-4">健康记录</p>
                  <p className="text-6xl font-bold">42</p>
                </div>
                <div className="text-center p-6 bg-white/20 backdrop-blur rounded-2xl">
                  <p className="text-2xl text-white/90 mb-4">预约就诊</p>
                  <p className="text-6xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions - Large */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <button className="p-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow border-4 border-blue-300">
              <Heart className="w-20 h-20 mx-auto mb-4 text-blue-600" />
              <p className="text-3xl font-bold text-blue-800">个人健康档案</p>
            </button>
            <button className="p-10 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow border-4 border-blue-300">
              <Award className="w-20 h-20 mx-auto mb-4 text-blue-600" />
              <p className="text-3xl font-bold text-blue-800">急救志愿者</p>
            </button>
          </div>

          {/* Logout Button - Large */}
          <Button
            onClick={handleLogout}
            variant="outline"
            size="lg"
            className="w-full text-red-600 border-red-300 border-4 hover:bg-red-50 py-10 text-3xl rounded-3xl font-bold"
          >
            <LogOut className="w-10 h-10 mr-4" />
            退出登录
          </Button>
        </div>
      </motion.div>
    );
  }

  // Smart Mode - Original Design
  const settingsItems = [
    { icon: Bell, label: "消息通知", desc: "管理推送提醒", hasSwitch: true, defaultValue: true },
    { icon: Shield, label: "隐私设置", desc: "数据与权限管理", hasSwitch: false },
    { icon: Settings, label: "账户安全", desc: "密码与验证设置", hasSwitch: false },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero / Profile Banner */}
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div
          className="relative pt-6 pb-24 px-6"
          style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #0093E9 55%, #80D0C7 100%)" }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-white/65 text-xs mb-1">个人中心</p>
                <h1 className="text-white text-3xl font-bold">账户信息</h1>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/edit-profile")}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-sm transition-all backdrop-blur"
                >
                  <User className="w-4 h-4" /> 编辑资料
                </button>
                <ModeToggle />
              </div>
            </div>

            {/* Profile Card */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/25 backdrop-blur rounded-2xl flex items-center justify-center border-2 border-white/30 flex-shrink-0">
                <span className="text-white text-3xl font-bold">李</span>
              </div>
              <div className="flex-1 text-white">
                <h2 className="text-2xl font-bold mb-1">{userInfo.name}</h2>
                <p className="text-white/70 text-sm">{userInfo.age} · {userInfo.location}</p>
              </div>
              {/* Inline stats */}
              <div className="flex items-center gap-4 flex-shrink-0">
                {[
                  { value: "365", label: "加入天数" },
                  { value: "42", label: "健康记录" },
                  { value: "8", label: "预约就诊" },
                ].map((s, i) => (
                  <div key={i} className="text-center bg-white/15 backdrop-blur rounded-xl px-5 py-3">
                    <p className="text-2xl font-bold text-white leading-none">{s.value}</p>
                    <p className="text-xs text-white/65 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pull-up overlap card */}
        <div className="absolute bottom-0 left-0 right-0 h-12 rounded-t-3xl bg-gray-50" />
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-2 pb-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-8 space-y-5">

            {/* Personal Info */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-semibold text-lg">基本信息</h2>
                  <Button onClick={() => navigate("/edit-profile")} size="sm" className="bg-blue-500 hover:bg-blue-600 rounded-full">
                    编辑个人资料
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { icon: Phone, label: "手机号", value: userInfo.phone, bg: "bg-blue-50", ic: "text-blue-500" },
                    { icon: MapPin, label: "居住地址", value: userInfo.location, bg: "bg-green-50", ic: "text-green-500" },
                    { icon: Shield, label: "身份证号", value: userInfo.idCard, bg: "bg-purple-50", ic: "text-purple-500" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className={`flex items-center gap-4 p-4 ${item.bg} rounded-xl`}>
                        <div className="w-9 h-9 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0">
                          <Icon className={`w-4 h-4 ${item.ic}`} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                          <p className="font-semibold text-sm text-gray-900">{item.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center">
                      <Phone className="w-4 h-4 text-red-600" />
                    </div>
                    <h2 className="font-semibold text-lg">紧急联系人</h2>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Users className="w-3.5 h-3.5 mr-1" /> 管理
                  </Button>
                </div>
                <div className="space-y-3">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-orange-400 rounded-xl flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="font-semibold text-sm">{contact.name}</p>
                            <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs px-2">{contact.relationship}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{contact.phone}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="rounded-full flex items-center gap-1.5 text-xs">
                        <Phone className="w-3 h-3" /> 拨打
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Settings className="w-4 h-4 text-gray-600" />
                  </div>
                  <h2 className="font-semibold text-lg">系统设置</h2>
                </div>
                <div className="space-y-1">
                  {settingsItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                          <item.icon className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.label}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                      {item.hasSwitch ? (
                        <Switch defaultChecked={item.defaultValue} />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Logout */}
            <Button
              onClick={handleLogout}
              variant="outline"
              size="lg"
              className="w-full text-red-600 border-red-200 hover:bg-red-50 py-5 rounded-xl"
            >
              <LogOut className="w-4 h-4 mr-2" /> 退出登录
            </Button>
          </div>

          {/* Right Column */}
          <div className="col-span-4 space-y-5">
            {/* Health Profile shortcut */}
            <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate("/health-records")}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                      <Heart className="w-6 h-6 text-rose-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">个人健康档案</p>
                      <p className="text-xs text-gray-500 mt-0.5">查看完整健康信息</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            {/* Volunteer Certification */}
            <Card className="shadow-lg border-0 overflow-hidden">
              <div className="h-2" style={{ background: "linear-gradient(to right, #0093E9, #80D0C7)" }} />
              <CardContent className="p-5">
                <div className="flex flex-col items-center text-center pt-2">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3" style={{ background: "linear-gradient(135deg, #0093E9, #80D0C7)" }}>
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-base text-gray-900 mb-1">成为认证急救志愿者</h3>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">完成急救培训认证，帮助更多需要帮助的人，获得社区荣誉勋章</p>
                  <Button className="w-full rounded-full text-sm" style={{ background: "linear-gradient(to right, #0093E9, #80D0C7)" }}>
                    了解详情
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">近期活动</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "体检报告", time: "3月25日", color: "bg-blue-500" },
                    { label: "血压监测", time: "3月20日", color: "bg-green-500" },
                    { label: "预约挂号", time: "3月18日", color: "bg-purple-500" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${activity.color}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">{activity.label}</p>
                      </div>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Help Center */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-emerald-50 to-teal-50">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-emerald-900">需要帮助？</p>
                    <p className="text-xs text-emerald-700">客服热线随时为您服务</p>
                  </div>
                </div>
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600 rounded-full text-sm">
                  联系客服
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
}