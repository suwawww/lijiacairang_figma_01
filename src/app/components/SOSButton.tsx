import { useState } from "react";
import { Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { useMode } from "../contexts/ModeContext";

export function SOSButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const { mode } = useMode();

  const isElder = mode === "elder";

  const handleSOSClick = () => {
    setIsOpen(true);
  };

  const handleEmergencyCall = () => {
    setIsCalling(true);
    // 模拟呼叫
    setTimeout(() => {
      setIsCalling(false);
      setIsOpen(false);
    }, 3000);
  };

  return (
    <>
      <button
        onClick={handleSOSClick}
        className="fixed bottom-8 right-8 w-20 h-20 text-white rounded-full shadow-2xl flex items-center justify-center z-50 transition-transform hover:scale-110 active:scale-95"
        style={
          isElder
            ? { background: "linear-gradient(135deg, #80D0C7, #0093E9)" }
            : { background: "#dc2626" }
        }
        aria-label="紧急呼救"
      >
        <Phone className="w-10 h-10" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              SOS 紧急呼救
            </DialogTitle>
            <DialogDescription className="text-center text-sm text-gray-500">
              系统将自动定位您的位置并通知最近的急救人员
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-6">
            <div className="text-center">
              <div
                className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6"
                style={isElder ? { background: "linear-gradient(135deg, #e0f7f5, #cce8ff)" } : { background: "#fee2e2" }}
              >
                <Phone
                  className="w-16 h-16"
                  style={{ color: isElder ? "#0093E9" : "#dc2626" }}
                />
              </div>
              <p className="text-lg text-gray-700 mb-8">
                {isCalling ? "正在连接急救服务..." : "立即呼叫急救服务"}
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleEmergencyCall}
                disabled={isCalling}
                className="w-full text-white py-6 text-xl border-0"
                style={
                  isElder
                    ? { background: "linear-gradient(to right, #80D0C7, #0093E9)" }
                    : { background: "#dc2626" }
                }
              >
                {isCalling ? "正在呼叫..." : "立即呼叫 120"}
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
                variant="outline"
                className="w-full py-6 text-lg"
                disabled={isCalling}
              >
                取消
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}