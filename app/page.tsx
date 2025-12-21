"use client";

import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Video, FileText, Smartphone, Zap, RefreshCw, Play } from "lucide-react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/scripts");
    }
  }, [status, router]);

  const handleLogin = () => {
    trackEvent("login", { method: "google" });
    signIn("google", { callbackUrl: "/scripts" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-lg sm:text-xl tracking-tighter">
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Video className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span className="font-bitcount uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              <span className="hidden sm:inline">TELEPROMPTER24</span>
              <span className="sm:hidden">TP24</span>
            </span>
          </div>
          <nav className="flex items-center gap-1 sm:gap-4">
            <Link href="/blog">
              <Button variant="ghost" className="text-sm font-medium px-2 sm:px-4">Blog</Button>
            </Link>
            <Button onClick={handleLogin} variant="ghost" className="text-sm font-medium px-2 sm:px-4">
              Log In
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-[calc(100svh-3.5rem)] sm:min-h-[calc(100vh-4rem)] flex items-center justify-center py-8 sm:py-0">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-5 sm:space-y-8">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs sm:text-sm font-medium bg-muted/50 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                Free Online Teleprompter
              </div>
              <h1 className="text-3xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mx-auto">
                Turn any device into a{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Professional Teleprompter</span>
              </h1>
              <p className="max-w-[700px] text-base sm:text-lg text-muted-foreground md:text-xl/relaxed xl:text-2xl/relaxed mx-auto px-2">
                No clunky apps. No lost files. Write in <span className="font-semibold text-foreground">Google Docs</span>, import with one click, and prompt from your laptop, tablet, or phone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center px-2">
                <Button onClick={handleLogin} size="lg" className="h-11 sm:h-12 px-5 sm:px-8 text-base sm:text-lg font-bold tracking-wide text-white gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/20 transition-all">
                  <FileText className="h-5 w-5 shrink-0" />
                  <span className="sm:hidden">Import from Google Docs</span>
                  <span className="hidden sm:inline">Connect Google Doc & Import Script</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                No credit card • Works on iOS & Android
              </p>
            </div>
          </div>

          {/* Abstract Background Elements */}
          <div className="absolute top-0 left-0 -z-10 h-full w-full overflow-hidden opacity-30 pointer-events-none">
            <div className="absolute top-[20%] left-[5%] sm:left-[10%] h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-blue-500/20 blur-[80px] sm:blur-[100px]" />
            <div className="absolute top-[30%] right-[5%] sm:right-[10%] h-56 w-56 sm:h-96 sm:w-96 rounded-full bg-purple-500/20 blur-[80px] sm:blur-[100px]" />
          </div>
        </section>

        {/* Features / Benefits */}
        <section className="py-10 sm:py-16 md:py-24 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-5xl">Why Creators Love It</h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground md:text-lg">Everything you need to nail your delivery, without the tech headaches.</p>
            </div>
            <div className="grid gap-4 sm:gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-4 sm:p-6 rounded-2xl bg-background border shadow-sm hover:shadow-md transition-shadow">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center mb-3 sm:mb-4">
                  <RefreshCw className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Google Docs Sync</h3>
                <p className="text-sm sm:text-base text-muted-foreground">Make edits in Google Docs and see them instantly in the teleprompter. No more copy-pasting.</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 sm:p-6 rounded-2xl bg-background border shadow-sm hover:shadow-md transition-shadow">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center mb-3 sm:mb-4">
                  <Smartphone className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Any Device, Anywhere</h3>
                <p className="text-sm sm:text-base text-muted-foreground">Works in the browser on your iPhone, iPad, Android, or laptop. Turn your spare tablet into a pro rig.</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 sm:p-6 rounded-2xl bg-background border shadow-sm hover:shadow-md transition-shadow">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center mb-3 sm:mb-4">
                  <Zap className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Free & Simple</h3>
                <p className="text-sm sm:text-base text-muted-foreground">Clean interface, adjustable speed, mirror mode for beam splitters, and font controls. Zero clutter.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works (SEO Content) */}
        <section className="py-10 sm:py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl">The Easiest Workflow for YouTubers & Speakers</h2>
                <p className="text-muted-foreground text-sm sm:text-lg">
                  Stop memorizing lines or looking down at notes. Our online teleprompter software makes it easy to maintain eye contact with your audience.
                </p>
                <ul className="space-y-3 sm:space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs sm:text-sm">1</div>
                    <span className="text-sm sm:text-base">Write your script in Google Docs</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs sm:text-sm">2</div>
                    <span className="text-sm sm:text-base">Paste the link into teleprompter24.com</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs sm:text-sm">3</div>
                    <span className="text-sm sm:text-base">Adjust speed, font, and start recording</span>
                  </li>
                </ul>
              </div>
              <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
                {/* Decorative Mockup Placeholder */}
                <div className="relative rounded-xl border bg-background shadow-2xl p-2 aspect-video flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-6 sm:h-8 bg-muted/50 border-b flex items-center px-3 sm:px-4 gap-1.5 sm:gap-2">
                    <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-red-400"></div>
                    <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-yellow-400"></div>
                    <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="mt-6 sm:mt-8 text-center px-3 sm:px-8">
                    <p className="text-sm sm:text-2xl md:text-3xl font-bold text-foreground/80 leading-relaxed">
                      <span className="hidden sm:inline">"Welcome to the channel! Today we're going to talk about how to speak confidently on camera..."</span>
                      <span className="sm:hidden">"Welcome to the channel! Today we're talking about speaking on camera..."</span>
                    </p>
                  </div>
                  {/* Fake Speed Control */}
                  <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1.5 sm:py-2 bg-foreground/90 text-background rounded-full text-xs sm:text-sm font-mono flex items-center gap-1.5 sm:gap-2 shadow-lg">
                    <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current" /> Speed: 2.5
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t py-8 sm:py-12 bg-muted/20">
          <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 font-semibold">
              <Video className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-bitcount text-sm sm:text-base">
                <span className="hidden sm:inline">TELEPROMPTER24</span>
                <span className="sm:hidden">TP24</span>
              </span>
            </div>
            <div className="flex gap-4 sm:gap-6 text-sm font-medium text-muted-foreground">
              <Link href="/blog" className="hover:text-foreground">Blog</Link>
              <Link href="#" className="hover:text-foreground">Terms</Link>
              <Link href="#" className="hover:text-foreground">Privacy</Link>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-right">
              © {new Date().getFullYear()} teleprompter24.com
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
