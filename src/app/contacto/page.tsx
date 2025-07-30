
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Clock, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { sendContactEmail } from "@/ai/flows/send-contact-email"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { ScrollAnimator } from "@/components/scroll-animator"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, introduce una dirección de correo válida.",
  }),
  message: z.string().min(10, {
    message: "El mensaje debe tener al menos 10 caracteres.",
  }),
})

const MailboxIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"/>
        <polyline points="15,9 18,9 18,11"/>
        <path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2H4"/>
        <path d="M6 13h4"/>
    </svg>
)


export default function ContactoPage() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await sendContactEmail(values);
      toast({
        title: "¡Mensaje enviado!",
        description: "Gracias por contactarnos. Te responderemos pronto.",
      })
      form.reset()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al enviar el mensaje",
        description: "Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.",
      })
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
        <main className="flex-1">
            <div className="w-full max-w-6xl mx-auto py-12 md:py-20 px-4">
              <ScrollAnimator>
                <div className="text-center mb-12">
                    <div className="flex justify-center items-center gap-4">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                        ¿En qué podemos ayudarte?
                        </h1>
                        <MailboxIcon className="text-primary h-12 w-12" />
                    </div>
                </div>
              </ScrollAnimator>

              <div className="grid md:grid-cols-2 gap-12">
                <ScrollAnimator>
                  <div className="space-y-6">
                      <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel>Nombre</FormLabel>
                              <FormControl>
                                  <Input placeholder="Escribe tu nombre aquí" {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                          <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                  <Input placeholder="Escribe tu correo aquí" {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                          <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel>Mensaje</FormLabel>
                              <FormControl>
                                  <Textarea
                                  placeholder="Escribe aquí tu mensaje"
                                  className="min-h-[150px]"
                                  {...field}
                                  />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                          <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                          Enviar
                          </Button>
                      </form>
                      </Form>
                  </div>
                </ScrollAnimator>

                <ScrollAnimator>
                  <div className="space-y-6">
                      <Card>
                      <CardHeader className="flex-row items-center gap-4">
                          <Phone className="h-6 w-6 text-primary" />
                          <CardTitle>Teléfono</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <p className="text-muted-foreground">81 8357 5500</p>
                      </CardContent>
                      </Card>
                      <Card>
                      <CardHeader className="flex-row items-center gap-4">
                          <Mail className="h-6 w-6 text-primary" />
                          <CardTitle>Correo</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <p className="text-muted-foreground">atencionaasociados@clubdelago.com.mx</p>
                      </CardContent>
                      </Card>
                      <div className="grid sm:grid-cols-2 gap-6">
                      <Card>
                          <CardHeader className="flex-row items-center gap-4">
                          <MapPin className="h-6 w-6 text-primary" />
                          <CardTitle>Dirección</CardTitle>
                          </CardHeader>
                          <CardContent>
                          <p className="text-muted-foreground text-sm">
                              Priv. del Lago #200, Col, Del Paseo Residencial, 64920, Monterrey, N.L.s
                          </p>
                          </CardContent>
                      </Card>
                      <Card>
                          <CardHeader className="flex-row items-center gap-4">
                          <Clock className="h-6 w-6 text-primary" />
                          <CardTitle>Horarios</CardTitle>
                          </CardHeader>
                          <CardContent>
                          <p className="text-muted-foreground text-sm">
                              Lunes a Viernes: 9:00 a 18:00
                          </p>
                          </CardContent>
                      </Card>
                      </div>
                  </div>
                </ScrollAnimator>
              </div>
            </div>
        </main>
        <Footer />
    </div>
  )
}
