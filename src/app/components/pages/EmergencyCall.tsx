import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { AlertCircle, Phone, MapPin, Users, Bell } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "motion/react";

export function EmergencyCall() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1 && !isCancelled) {
          // Auto send when countdown reaches 0
          handleSend();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // ESC key handler
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCancel();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      clearInterval(timer);
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isCancelled]);

  const handleCancel = () => {
    setIsCancelled(true);
    navigate(-1); // Go back to previous page
  };

  const handleSend = () => {
    setIsCancelled(true);
    // In a real app, this would trigger the emergency call
    alert("紧急呼救已发送！\n\n已执行：\n• 拨打120急救电话\n• 通知社区医护人员\n• 发送位置信息\n• 联系紧急联系人");
    navigate("/emergency");
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-50 to-white flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="max-w-2xl w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div 
          className="bg-gradient-to-b from-blue-200 to-blue-100 rounded-3xl p-12 shadow-2xl"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Alert Icon */}
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative">
              <motion.div 
                className="w-32 h-32 bg-blue-400 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-10 h-10 text-white" strokeWidth={3} />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 
            className="text-4xl font-bold text-center text-gray-800 mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            紧急呼救即将发送
          </motion.h1>
          <motion.p 
            className="text-center text-gray-600 text-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            如果误触，请立即取消
          </motion.p>

          {/* Countdown Timer */}
          <motion.div 
            className="bg-gradient-to-br from-purple-500 via-blue-500 to-blue-600 rounded-3xl p-12 mb-6 shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <p className="text-white text-center text-xl mb-4">倒计时</p>
            <div className="text-center">
              <motion.span 
                className="text-white text-9xl font-bold tracking-wider"
                key={countdown}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {countdown}
              </motion.span>
            </div>
            <p className="text-white text-center text-xl mt-4">
              秒后自动发送呼救
            </p>
          </motion.div>

          {/* Action List */}
          <motion.div 
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 mb-6 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <p className="text-white text-lg font-semibold mb-4">
              系统将执行以下操作：
            </p>
            <ul className="space-y-3 text-white">
              {[
                { icon: Phone, text: "自动拨打120急救电话" },
                { icon: Users, text: "通知社区医护人员" },
                { icon: MapPin, text: "发送位置信息给所属医疗人员" },
                { icon: Bell, text: "自动联系紧急联系人" },
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                >
                  <item.icon className="w-5 h-5 mt-1 flex-shrink-0" />
                  <span className="text-lg">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="grid grid-cols-2 gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <Button
              onClick={handleCancel}
              className="h-16 text-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg"
            >
              取消呼救
            </Button>
            <Button
              onClick={handleSend}
              className="h-16 text-xl font-semibold bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-2xl shadow-lg"
            >
              立即发送
            </Button>
          </motion.div>

          {/* Help Text */}
          <motion.p 
            className="text-center text-gray-600 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            点击"取消呼救"或按ESC键可以取消
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
