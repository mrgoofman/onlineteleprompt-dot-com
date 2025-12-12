"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Video, FileText, Smartphone, Zap, Check, ArrowRight, RefreshCw, Play } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/scripts");
    }
  }, [status, router]);

  const handleLogin = () => {
    // Direct navigation - bypasses next-auth/react fetch issues
    window.location.href = "/api/auth/signin/google?callbackUrl=%2Fscripts";
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Video className="h-5 w-5" />
            </div>
            <span className="font-bitcount uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">TELEPROMPTER24</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/blog">
              <Button variant="ghost" className="text-sm font-medium">Blog</Button>
            </Link>
            <Button onClick={handleLogin} variant="ghost" className="text-sm font-medium">
              Log In
            </Button>

          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-muted/50 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                Free Online Teleprompter
              </div>
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mx-auto">
                Turn any device into a <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Professional Teleprompter</span>
              </h1>
              <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl/relaxed xl:text-2xl/relaxed mx-auto">
                No clunky apps. No lost files. Write in <span className="font-semibold text-foreground">Google Docs</span>, import with one click, and prompt from your laptop, tablet, or phone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <Button onClick={handleLogin} size="lg" className="h-12 px-8 text-lg font-bold tracking-wide text-white gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/20 transition-all">
                  <FileText className="h-5 w-5" />
                  Connect Google Doc & Import Script
                </Button>
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                No credit card required • Works on iOS & Android
              </p>
            </div>
          </div>

          {/* Abstract Background Elements */}
          <div className="absolute top-0 left-0 -z-10 h-full w-full overflow-hidden opacity-30 pointer-events-none">
            <div className="absolute top-[20%] left-[10%] h-72 w-72 rounded-full bg-blue-500/20 blur-[100px]" />
            <div className="absolute top-[30%] right-[10%] h-96 w-96 rounded-full bg-purple-500/20 blur-[100px]" />
          </div>
        </section>

        {/* Features / Benefits */}
        <section className="py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Creators Love It</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">Everything you need to nail your delivery, without the tech headaches.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center mb-4">
                  <RefreshCw className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Google Docs Sync</h3>
                <p className="text-muted-foreground">Make edits in Google Docs and see them instantly in the teleprompter. No more copy-pasting back and forth.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Any Device, Anywhere</h3>
                <p className="text-muted-foreground">Works in the browser on your iPhone, iPad, Android, or laptop. Turn your spare tablet into a pro rig.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Free & Simple</h3>
                <p className="text-muted-foreground">Clean interface, adjustable speed, mirror mode for beam splitters, and font controls. Zero clutter.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works (SEO Content) */}
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">The Easiest Workflow for YouTubers & Speakers</h2>
                <p className="text-muted-foreground text-lg">
                  Stop memorizing lines or looking down at notes. Our online teleprompter software makes it easy to maintain eye contact with your audience.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">1</div>
                    <span>Write your script in Google Docs</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">2</div>
                    <span>Paste the link into onlineteleprompt.com</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">3</div>
                    <span>Adjust speed, font, and start recording</span>
                  </li>
                </ul>
                <div className="pt-4">

                </div>
              </div>
              <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
                {/* Decorative Mockup Placeholder */}
                <div className="relative rounded-xl border bg-background shadow-2xl p-2 aspect-video flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-8 bg-muted/50 border-b flex items-center px-4 gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="mt-8 text-center px-8">
                    <p className="text-2xl md:text-3xl font-bold text-foreground/80 leading-relaxed">
                      "Welcome to the channel! Today we're going to talk about how to speak confidently on camera..."
                    </p>
                  </div>
                  {/* Fake Speed Control */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-foreground/90 text-background rounded-full text-sm font-mono flex items-center gap-2 shadow-lg">
                    <Play className="h-3 w-3 fill-current" /> Speed: 2.5
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t py-12 bg-muted/20">
          <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 font-semibold">
              <Video className="h-5 w-5" />
              <span className="font-bitcount">TELEPROMPTER24</span>
            </div>
            <div className="flex gap-6 text-sm font-medium text-muted-foreground">
              <Link href="/blog" className="hover:text-foreground">Blog</Link>
              <Link href="#" className="hover:text-foreground">Terms</Link>
              <Link href="#" className="hover:text-foreground">Privacy</Link>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-right">
              © {new Date().getFullYear()} teleprompter24.com. Built for creators.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
