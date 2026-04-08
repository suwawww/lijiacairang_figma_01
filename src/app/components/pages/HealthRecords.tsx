import { useState } from "react";
import { ArrowLeft, FileText, Download, Plus, Calendar, TrendingUp, Activity, Heart } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useNavigate } from "react-router";
import { useMode } from "../../contexts/ModeContext";
import { ModeToggle } from "../ModeToggle";

export function HealthRecords() {
  const navigate = useNavigate();
  const { mode } = useMode();

  const medicalRecords = [
    { id: 1, type: "体检报告", date: "2026-03-25", hospital: "市人民医院", doctor: "李医生", status: "已完成" },
    { id: 2, type: "血压监测", date: "2026-03-20", hospital: "社区卫生中心", doctor: "张医生", status: "已完成" },
    { id: 3, type: "血糖记录", date: "2026-03-15", hospital: "社区卫生中心", doctor: "王医生", status: "已完成" },
    { id: 4, type: "心电图检查", date: "2026-03-10", hospital: "市人民医院", doctor: "刘医生", status: "已完成" },
  ];

  const healthData = [
    { label: "血压", current: "120/80", trend: "稳定", color: "blue" },
    { label: "血糖", current: "5.6", trend: "正常", color: "green" },
    { label: "心率", current: "72", trend: "正常", color: "red" },
    { label: "体重", current: "68kg", trend: "下降", color: "orange" },
  ];

  const prescriptions = [
    { id: 1, medicine: "阿司匹林", dosage: "100mg", frequency: "每天1次", startDate: "2026-01-01", endDate: "2026-06-30" },
    { id: 2, medicine: "降压药", dosage: "5mg", frequency: "每天1次", startDate: "2026-01-01", endDate: "2026-12-31" },
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
            <h1 className="text-4xl font-bold">健康档案</h1>
            <ModeToggle />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Health Data Overview */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {healthData.map((data, index) => (
              <Card key={index} className="shadow-xl border-4 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardContent className="p-10 text-center">
                  <p className="text-3xl text-blue-700 font-bold mb-4">{data.label}</p>
                  <p className="text-6xl font-bold text-blue-900 mb-4">{data.current}</p>
                  <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-2xl px-8 py-2 rounded-2xl">
                    {data.trend}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Medical Records */}
          <Card className="mb-8 shadow-xl border-4 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardContent className="p-10">
              <h2 className="text-4xl font-bold text-blue-900 mb-8">就诊记录</h2>
              <div className="space-y-6">
                {medicalRecords.map((record) => (
                  <div key={record.id} className="bg-white p-8 rounded-2xl border-4 border-blue-200 shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-3xl font-bold text-blue-900 mb-2">{record.type}</h3>
                        <p className="text-2xl text-blue-700 mb-2">{record.hospital}</p>
                        <p className="text-xl text-blue-600">医生: {record.doctor}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl text-blue-700 mb-2">{record.date}</p>
                        <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xl px-6 py-2">
                          {record.status}
                        </Badge>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-2xl py-6 rounded-2xl">
                      <FileText className="w-8 h-8 mr-3" />
                      查看报告
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Prescriptions */}
          <Card className="shadow-xl border-4 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardContent className="p-10">
              <h2 className="text-4xl font-bold text-blue-900 mb-8">用药记录</h2>
              <div className="space-y-6">
                {prescriptions.map((rx) => (
                  <div key={rx.id} className="bg-white p-8 rounded-2xl border-4 border-blue-200 shadow-lg">
                    <h3 className="text-3xl font-bold text-blue-900 mb-4">{rx.medicine}</h3>
                    <div className="grid grid-cols-2 gap-6 text-2xl text-blue-700">
                      <p>剂量: {rx.dosage}</p>
                      <p>频次: {rx.frequency}</p>
                      <p>开始: {rx.startDate}</p>
                      <p>结束: {rx.endDate}</p>
                    </div>
                  </div>
                ))}
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
          <h1 className="text-2xl font-bold">健康档案管理</h1>
          <ModeToggle />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="records" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="records">就诊记录</TabsTrigger>
            <TabsTrigger value="data">健康数据</TabsTrigger>
            <TabsTrigger value="prescriptions">用药记录</TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">就诊记录</h2>
              <Button className="bg-blue-500 hover:bg-blue-600 rounded-full">
                <Plus className="w-4 h-4 mr-2" />
                新增记录
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {medicalRecords.map((record) => (
                <Card key={record.id} className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                          <FileText className="w-7 h-7 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{record.type}</h3>
                          <p className="text-gray-600 mb-1">{record.hospital}</p>
                          <p className="text-sm text-gray-500">医生: {record.doctor}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600 mb-2">{record.date}</p>
                        <Badge className="bg-green-100 text-green-700">{record.status}</Badge>
                        <Button variant="outline" size="sm" className="mt-2 rounded-full">
                          <Download className="w-4 h-4 mr-1" />
                          下载
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="data">
            <div className="grid grid-cols-4 gap-4 mb-6">
              {healthData.map((data, index) => (
                <Card key={index} className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50">
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-600 mb-2">{data.label}</p>
                    <p className="text-3xl font-bold mb-2">{data.current}</p>
                    <Badge className={`bg-${data.color}-100 text-${data.color}-700`}>{data.trend}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">健康趋势图</h3>
                <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-16 h-16 text-blue-400" />
                  <p className="ml-4 text-gray-500">图表数据可视化区域</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescriptions" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">用药记录</h2>
              <Button className="bg-blue-500 hover:bg-blue-600 rounded-full">
                <Plus className="w-4 h-4 mr-2" />
                添加处方
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {prescriptions.map((rx) => (
                <Card key={rx.id} className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-xl mb-4">{rx.medicine}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <p className="text-gray-500">剂量</p>
                        <p className="font-medium">{rx.dosage}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">频次</p>
                        <p className="font-medium">{rx.frequency}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">开始日期</p>
                        <p className="font-medium">{rx.startDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">结束日期</p>
                        <p className="font-medium">{rx.endDate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
