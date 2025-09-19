
"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import { Bot, Send, Loader, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { laguitoChat, type ChatMessage } from "@/ai/flows/laguito-chat-flow";
import { cn } from "@/lib/utils";
import { type LaguitoAnswer } from "@/ai/flows/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import Link from "next/link";


// Componente para renderizar la respuesta estructurada del bot
const BotMessageContent = ({ content }: { content: string }) => {
  try {
    const parsedContent: LaguitoAnswer = JSON.parse(content);
    
    return (
      <div className="space-y-3">
        <p className="text-sm">{parsedContent.summary}</p>
        {parsedContent.cards.map((card, index) => (
          <Card key={index} className="bg-muted/50">
            <CardHeader className="p-3">
              <CardTitle className="text-sm font-semibold">{card.title}</CardTitle>
              {card.subtitle && <p className="text-xs text-muted-foreground">{card.subtitle}</p>}
            </CardHeader>
            <CardContent className="p-3 pt-0">
              {card.bullets && card.bullets.length > 0 && (
                <ul className="list-disc list-inside space-y-1 text-xs">
                  {card.bullets.map((bullet, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: bullet.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  ))}
                </ul>
              )}
              {card.table && card.table.rows.length > 0 && (
                 <Table className="text-xs">
                   <TableHeader>
                     <TableRow>
                       {card.table.columns.map((col, i) => <TableHead key={i} className="h-6 px-2">{col}</TableHead>)}
                     </TableRow>
                   </TableHeader>
                   <TableBody>
                     {card.table.rows.map((row, i) => (
                       <TableRow key={i}>
                         {row.map((cell, j) => <TableCell key={j} className="p-2">{cell}</TableCell>)}
                       </TableRow>
                     ))}
                   </TableBody>
                 </Table>
              )}
              {card.cta && (
                <Button asChild size="sm" className="mt-2">
                    <Link href={card.cta.href}>{card.cta.label}</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
        {parsedContent.handoff && (
            <Card className="bg-accent/20 border-accent">
                 <CardHeader className="p-3">
                    <CardTitle className="text-sm font-semibold">Te recomiendo contactar a:</CardTitle>
                 </CardHeader>
                 <CardContent className="p-3 pt-0 text-xs space-y-1">
                    <p><strong>{parsedContent.handoff.name}</strong></p>
                    {parsedContent.handoff.email && <p><a href={`mailto:${parsedContent.handoff.email}`} className="hover:underline">{parsedContent.handoff.email}</a></p>}
                    {parsedContent.handoff.phone && <p>{parsedContent.handoff.phone}</p>}
                    {parsedContent.handoff.note && <p className="text-muted-foreground mt-1">{parsedContent.handoff.note}</p>}
                 </CardContent>
            </Card>
        )}
      </div>
    );
  } catch (error) {
    // Si no es un JSON, muestra el texto plano.
    return <div className="text-sm">{content}</div>;
  }
};


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
        history: messages,
        question: input,
      });
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error al contactar al bot:", error);
      const errorMessage: ChatMessage = {
        role: "model",
        content: JSON.stringify({
            intent: "desconocido",
            summary: "Lo siento, tuve un problema para responder. Por favor, inténtalo de nuevo más tarde.",
            cards: []
        }),
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
        <SheetContent className="flex flex-col p-0 w-full sm:max-w-md">
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
                      "max-w-xs md:max-w-sm rounded-lg px-3 py-2",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground text-sm"
                        : "bg-background"
                    )}
                  >
                    {message.role === 'model' ? <BotMessageContent content={message.content} /> : <p className="text-sm">{message.content}</p>}
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
