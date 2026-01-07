import { Video } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service - Teleprompter24",
  description: "Terms of Service for Teleprompter24, a free online teleprompter service by snekmedia GmbH.",
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg sm:text-xl tracking-tighter">
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Video className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span className="font-bitcount uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              TELEPROMPTER24
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12 sm:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Terms of Service</h1>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
              <p>
                By accessing or using Teleprompter24 (&quot;the Service&quot;), operated by snekmedia GmbH, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">2. Description of Service</h2>
              <p>
                Teleprompter24 is a free online teleprompter application that integrates with Google Docs. The Service allows users to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Sign in with their Google account</li>
                <li>Import Google Docs for use as teleprompter scripts</li>
                <li>Display scripts with adjustable speed, font size, and mirror mode</li>
                <li>Save script references for quick access</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">3. User Accounts</h2>
              <p>
                To use certain features of the Service, you must sign in with a Google account. You are responsible for maintaining the security of your account credentials and for all activities that occur under your account.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">4. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Use the Service for any illegal purpose</li>
                <li>Attempt to gain unauthorized access to the Service or its systems</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Use automated systems to access the Service without permission</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">5. Intellectual Property</h2>
              <p>
                The Service, including its design, features, and content (excluding user-provided content), is owned by snekmedia GmbH and protected by copyright and other intellectual property laws.
              </p>
              <p>
                Your Google Docs and scripts remain your property. We do not claim any ownership rights over your content.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">6. Third-Party Services</h2>
              <p>
                The Service integrates with Google services (Google OAuth, Google Docs API). Your use of these integrations is subject to Google&apos;s terms of service. We are not responsible for any issues arising from third-party services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">7. Disclaimer of Warranties</h2>
              <p>
                THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">8. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, SNEKMEDIA GMBH SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">9. Service Modifications</h2>
              <p>
                We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">10. Termination</h2>
              <p>
                We may terminate or suspend your access to the Service at any time, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Service will immediately cease.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">11. Changes to Terms</h2>
              <p>
                We reserve the right to update these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the &quot;Last updated&quot; date. Your continued use of the Service after such changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">12. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of Germany, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Germany.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">13. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p>
                <strong>snekmedia GmbH</strong><br />
                Email:{" "}
                <a href="mailto:office@snekmedia.com" className="text-blue-600 hover:underline">
                  office@snekmedia.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 sm:py-12 bg-muted/20">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-semibold">
            <Video className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-bitcount text-sm sm:text-base">TELEPROMPTER24</span>
          </div>
          <div className="flex gap-4 sm:gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-right">
            © {new Date().getFullYear()} teleprompter24.com
          </p>
        </div>
      </footer>
    </div>
  );
}
