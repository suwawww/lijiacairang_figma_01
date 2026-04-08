import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { AlertCircle, Heart } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({ phone: "", code: "" });
  const [registerForm, setRegisterForm] = useState({
    phone: "",
    code: "",
    name: "",
    userType: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 模拟登录
    navigate("/");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // 模拟注册
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl mb-2">社区急救医疗平台</h1>
          <p className="text-gray-600">守护您和家人的健康安全</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">欢迎使用</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">登录</TabsTrigger>
                <TabsTrigger value="register">注册</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-phone">手机号</Label>
                    <Input
                      id="login-phone"
                      type="tel"
                      placeholder="请输入手机号"
                      value={loginForm.phone}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, phone: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-code">验证码</Label>
                    <div className="flex gap-2">
                      <Input
                        id="login-code"
                        type="text"
                        placeholder="请输入验证码"
                        value={loginForm.code}
                        onChange={(e) =>
                          setLoginForm({ ...loginForm, code: e.target.value })
                        }
                        required
                      />
                      <Button type="button" variant="outline">
                        获取验证码
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                    登录
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-phone">手机号</Label>
                    <Input
                      id="register-phone"
                      type="tel"
                      placeholder="请输入手机号"
                      value={registerForm.phone}
                      onChange={(e) =>
                        setRegisterForm({ ...registerForm, phone: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-code">验证码</Label>
                    <div className="flex gap-2">
                      <Input
                        id="register-code"
                        type="text"
                        placeholder="请输入验证码"
                        value={registerForm.code}
                        onChange={(e) =>
                          setRegisterForm({ ...registerForm, code: e.target.value })
                        }
                        required
                      />
                      <Button type="button" variant="outline">
                        获取验证码
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-name">姓名</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="请输入真实姓名"
                      value={registerForm.name}
                      onChange={(e) =>
                        setRegisterForm({ ...registerForm, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="user-type">用户类型</Label>
                    <Select
                      value={registerForm.userType}
                      onValueChange={(value) =>
                        setRegisterForm({ ...registerForm, userType: value })
                      }
                    >
                      <SelectTrigger id="user-type">
                        <SelectValue placeholder="请选择用户类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="patient">普通用户</SelectItem>
                        <SelectItem value="medical">医护人员</SelectItem>
                        <SelectItem value="volunteer">志愿者救援人</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-amber-800">
                      医护人员需提供执业证明，志愿者需通过急救认证
                    </p>
                  </div>

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                    注册
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
