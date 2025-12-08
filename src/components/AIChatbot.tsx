import { useState } from "react";
import { Bot, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: "Hi! I'm your Interact AI assistant. I can help you navigate to any platform or feature. Try asking me to take you somewhere!"
    }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages([...messages, { role: "user", content: message }]);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `I can help you navigate to ${message}. Would you like me to take you there?`
      }]);
    }, 500);

    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Dialog */}
      {isOpen && (
        <Card className="fixed bottom-24 left-1/2 -translate-x-1/2 w-96 max-w-[calc(100vw-2rem)] h-[500px] flex flex-col shadow-2xl z-50 animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Interact AI Assistant</h3>
                <p className="text-xs opacity-90">Always here to help</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-white/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex gap-2",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === "assistant" && (
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={cn(
                    "px-4 py-2 rounded-2xl max-w-[75%]",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me to take you anywhere..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Floating Orb Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-8 left-1/2 -translate-x-1/2 z-50",
          "h-16 w-16 rounded-full",
          "bg-gradient-to-br from-blue-500 to-blue-700",
          "shadow-lg hover:shadow-xl",
          "flex items-center justify-center",
          "transition-all duration-300 hover:scale-110",
          "group"
        )}
        style={{
          animation: "breathe 3s ease-in-out infinite"
        }}
        aria-label="Open AI Assistant"
      >
        <Bot className="h-8 w-8 text-white transition-transform group-hover:scale-110" />
        
        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-full bg-blue-500 blur-xl group-hover:opacity-70 transition-opacity"
          style={{
            animation: "breatheGlow 3s ease-in-out infinite"
          }}
        />
      </button>
      
      {/* CSS Animation */}
      <style>{`
        @keyframes breathe {
          0%, 100% {
            transform: translate(-50%, 0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, 0) scale(1.05);
            opacity: 0.9;
          }
        }
        
        @keyframes breatheGlow {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </>
  );
}
