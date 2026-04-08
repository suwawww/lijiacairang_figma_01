import { useState } from "react";
import { ArrowLeft, User, Camera, Save } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useNavigate } from "react-router";
import { useMode } from "../../contexts/ModeContext";
import { ModeToggle } from "../ModeToggle";
import { motion } from "motion/react";

export function EditProfile() {
  const navigate = useNavigate();
  const { mode } = useMode();
  const [formData, setFormData] = useState({
    name: "李先生",
    age: "68",
    phone: "13812345678",
    email: "li***@email.com",
    address: "北京市朝阳区XX街道XX社区",
    idCard: "110***********1234",
    emergencyContact: "李女士",
    emergencyPhone: "13987654321",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save logic here
    navigate("/profile");
  };

  // Elder Mode
  if (mode === "elder") {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-blue-50 via-cyan-50 to-blue-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.div 
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="flex items-center gap-3 text-2xl font-bold">
              <ArrowLeft className="w-10 h-10" />
              返回
            </button>
            <h1 className="text-4xl font-bold">编辑资料</h1>
            <ModeToggle />
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <form onSubmit={handleSubmit}>
            {/* Avatar */}
            <Card className="mb-8 shadow-xl border-4 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardContent className="p-10">
                <div className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <Avatar className="w-40 h-40">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-6xl">
                        李
                      </AvatarFallback>
                    </Avatar>
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white shadow-xl"
                    >
                      <Camera className="w-8 h-8" />
                    </button>
                  </div>
                  <p className="text-2xl text-blue-700">点击更换头像</p>
                </div>
              </CardContent>
            </Card>

            {/* Basic Info */}
            <Card className="mb-8 shadow-xl border-4 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardContent className="p-10">
                <h2 className="text-4xl font-bold text-blue-900 mb-8">基本信息</h2>
                <div className="space-y-8">
                  <div>
                    <Label className="text-2xl text-blue-700 mb-3 block">姓名</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="text-3xl p-8 border-4 border-blue-200 rounded-2xl"
                    />
                  </div>
                  <div>
                    <Label className="text-2xl text-blue-700 mb-3 block">年龄</Label>
                    <Input
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="text-3xl p-8 border-4 border-blue-200 rounded-2xl"
                    />
                  </div>
                  <div>
                    <Label className="text-2xl text-blue-700 mb-3 block">手机号</Label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="text-3xl p-8 border-4 border-blue-200 rounded-2xl"
                    />
                  </div>
                  <div>
                    <Label className="text-2xl text-blue-700 mb-3 block">居住地址</Label>
                    <Input
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="text-3xl p-8 border-4 border-blue-200 rounded-2xl"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="mb-8 shadow-xl border-4 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardContent className="p-10">
                <h2 className="text-4xl font-bold text-blue-900 mb-8">紧急联系人</h2>
                <div className="space-y-8">
                  <div>
                    <Label className="text-2xl text-blue-700 mb-3 block">联系人姓名</Label>
                    <Input
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                      className="text-3xl p-8 border-4 border-blue-200 rounded-2xl"
                    />
                  </div>
                  <div>
                    <Label className="text-2xl text-blue-700 mb-3 block">联系人电话</Label>
                    <Input
                      value={formData.emergencyPhone}
                      onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                      className="text-3xl p-8 border-4 border-blue-200 rounded-2xl"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-3xl py-10 rounded-3xl shadow-xl"
            >
              <Save className="w-10 h-10 mr-4" />
              保存修改
            </Button>
          </form>
        </div>
      </motion.div>
    );
  }

  // Smart Mode
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:underline">
            <ArrowLeft className="w-5 h-5" />
            返回
          </button>
          <h1 className="text-2xl font-bold">编辑个人资料</h1>
          <ModeToggle />
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit}>
          {/* Avatar Section */}
          <Card className="shadow-lg border-0 mb-6">
            <CardContent className="p-8">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-3xl">
                      李
                    </AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">更换头像</h3>
                  <p className="text-sm text-gray-600">支持JPG、PNG格式，大小不超过5MB</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Info */}
          <Card className="shadow-lg border-0 mb-6">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold mb-6">基本信息</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label>姓名</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>年龄</Label>
                  <Input
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>手机号</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>邮箱</Label>
                  <Input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div className="col-span-2">
                  <Label>居住地址</Label>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div className="col-span-2">
                  <Label>身份证号</Label>
                  <Input
                    value={formData.idCard}
                    onChange={(e) => setFormData({ ...formData, idCard: e.target.value })}
                    className="mt-2"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">身份证号不可修改，如需变更请联系客服</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="shadow-lg border-0 mb-6">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold mb-6">紧急联系人</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label>联系人姓名</Label>
                  <Input
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>联系人电话</Label>
                  <Input
                    value={formData.emergencyPhone}
                    onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex-1 py-6 text-lg rounded-xl"
            >
              取消
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 py-6 text-lg rounded-xl"
            >
              <Save className="w-5 h-5 mr-2" />
              保存修改
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}