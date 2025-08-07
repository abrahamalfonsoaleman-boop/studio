
"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, Loader, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { laguitoChat, type ChatMessage } from "@/ai/flows/laguito-chat-flow";
import { cn } from "@/lib/utils";

export function LaguitoBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const botResponse = await laguitoChat({
        history: [...messages, userMessage],
        question: input,
      });
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error al contactar al bot:", error);
      const errorMessage: ChatMessage = {
        role: "model",
        content: "Lo siento, tuve un problema para responder. Inténtalo de nuevo.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-primary shadow-lg hover:bg-primary/90 transition-transform hover:scale-110"
        aria-label="Abrir chat de Laguito"
      >
        <Bot className="h-8 w-8 text-primary-foreground" />
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="flex flex-col p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="flex items-center gap-2 font-headline">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/images/Logo-vector.png" alt="Laguito" />
                <AvatarFallback>L</AvatarFallback>
              </Avatar>
              <span>Laguito Asistente</span>
            </SheetTitle>
            <SheetDescription className="sr-only">
              Chat con el asistente virtual del Club Del Lago.
            </SheetDescription>
             <SheetClose asChild>
                <Button variant="ghost" size="icon" className="absolute top-3 right-3">
                    <X className="h-5 w-5" />
                </Button>
            </SheetClose>
          </SheetHeader>
          <ScrollArea className="flex-1" ref={scrollAreaRef}>
            <div className="p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-sm text-muted-foreground p-4 bg-muted/50 rounded-lg">
                  ¡Hola! Soy Laguito, tu asistente virtual. ¿En qué puedo ayudarte hoy sobre el Club Del Lago?
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-3",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "model" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/images/Logo-vector.png" alt="Laguito" />
                      <AvatarFallback>L</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-xs rounded-lg px-4 py-2 text-sm",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {message.content}
                  </div>
                  {message.role === "user" && (
                     <Avatar className="h-8 w-8">
                      <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3 justify-start">
                   <Avatar className="h-8 w-8">
                      <AvatarImage src="/images/Logo-vector.png" alt="Laguito" />
                      <AvatarFallback>L</AvatarFallback>
                    </Avatar>
                  <div className="bg-muted rounded-lg px-4 py-3 flex items-center space-x-2">
                    <Loader className="h-4 w-4 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Laguito está escribiendo...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-4 border-t bg-background">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pregúntale algo a Laguito..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                {isLoading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
                <span className="sr-only">Enviar</span>
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
