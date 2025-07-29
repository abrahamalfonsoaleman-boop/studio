
"use client"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/footer'
import { cn } from '@/lib/utils'

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 384 512" fill="currentColor" height="1em" width="1em" {...props}>
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C39.2 141.1 0 183.2 0 241.2c0 61.6 31.3 117.1 83.9 157.4 21.3 16.2 47.7 34.7 72.9 34.7 25.2 0 40.1-14.8 63.6-14.8 23.6 0 38.2 14.8 63.6 14.8 25.2 0 47.7-19.2 68.4-36.2 33.7-27.3 49.5-64.4 49.5-94.3-.1-3.3-.1-6.6-.3-9.9zm-221.7-144c13.3-13.7 21.3-33.4 21.3-51.8 0-22.7-13.8-41.2-31.5-41.2-17.7 0-33.8 18.5-43.9 18.5-10.1 0-26.9-18.5-44.5-18.5-17.7 0-31.5 18.5-31.5 41.2 0 18.5 8.5 38.2 21.8 51.8 13.3 13.7 29.4 33.4 47.1 33.4 17.7 0 34.3-19.7 44.5-19.7s29.4 19.7 44.5 19.7c17.7 0 33.8-19.7 47.1-33.4z" />
    </svg>
);

const GooglePlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 512 512" fill="currentColor" height="1em" width="1em" {...props}>
        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
    </svg>
);

export default function DelagoAppPage() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[400px_1fr] lg:gap-12 xl:grid-cols-[400px_1fr]">
                            <Image
                                src="https://play-lh.googleusercontent.com/zkLw3flPo9YpNoXjcMBmwqNWitpPkiSK3SKiHDVJovZZLoybM3_Xwx8Qi6c5APPXogc=w240-h480-rw"
                                alt="DelagoApp Logo"
                                width={300}
                                height={300}
                                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
                                data-ai-hint="app logo"
                            />
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                                        DELAGOAPPP
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        Experimenta una nueva forma de conectar y gestionar tu día a día con nuestra app. Su diseño intuitivo, funciones inteligentes y experiencia única te mantendrán siempre un paso adelante.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Button size="lg" className="bg-black text-white hover:bg-black/80">
                                        <AppleIcon className="mr-2 h-5 w-5" />
                                        App Store
                                    </Button>
                                    <Button size="lg" className="bg-green-600 text-white hover:bg-green-700">
                                        <GooglePlayIcon className="mr-2 h-5 w-5" />
                                        Google Play
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
