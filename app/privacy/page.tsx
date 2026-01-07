import { Video } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy - Teleprompter24",
  description: "Privacy Policy for Teleprompter24, a free online teleprompter service by snekmedia GmbH.",
};

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold tracking-tight mb-8">Privacy Policy</h1>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">1. Introduction</h2>
              <p>
                Teleprompter24 (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is operated by snekmedia GmbH. This Privacy Policy explains how we collect, use, and protect your information when you use our online teleprompter service at teleprompter24.com.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">2. Information We Collect</h2>

              <h3 className="text-lg font-medium">2.1 Google Account Information</h3>
              <p>When you sign in with Google, we receive:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your email address</li>
                <li>Your name</li>
                <li>Your profile picture</li>
              </ul>

              <h3 className="text-lg font-medium">2.2 Google Docs Access</h3>
              <p>
                With your permission, we access your Google Docs in read-only mode to display them as teleprompter scripts. We do not modify, store the full content of, or share your Google Docs with third parties. We only store metadata (document title and URL) to enable quick access to your saved scripts.
              </p>

              <h3 className="text-lg font-medium">2.3 Script Metadata</h3>
              <p>
                When you save a script, we store the following in our database:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Google Doc ID and URL</li>
                <li>Document title</li>
                <li>Your email address (to associate scripts with your account)</li>
                <li>Timestamp of when the script was saved</li>
              </ul>

              <h3 className="text-lg font-medium">2.4 Analytics Data</h3>
              <p>
                We use Google Analytics 4 to collect anonymous usage data to improve our service. This includes page views, device type, and general location data.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">3. Google API Services User Data Policy</h2>
              <p>
                Teleprompter24&apos;s use and transfer of information received from Google APIs adheres to the{" "}
                <a
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google API Services User Data Policy
                </a>
                , including the Limited Use requirements.
              </p>
              <p>
                Specifically:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>We only use Google Docs data to provide the teleprompter functionality you requested</li>
                <li>We do not transfer Google user data to third parties except as necessary to provide the service</li>
                <li>We do not use Google user data for advertising purposes</li>
                <li>We do not allow humans to read your Google Docs content unless required for security purposes, with your consent, or to comply with legal obligations</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">4. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Authenticate you and manage your account</li>
                <li>Display your Google Docs as teleprompter scripts</li>
                <li>Save and manage your script library</li>
                <li>Improve our service based on usage patterns</li>
                <li>Respond to support requests</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">5. Third-Party Services</h2>
              <p>We use the following third-party services:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Google OAuth</strong> - For authentication</li>
                <li><strong>Google Docs API</strong> - To read your documents</li>
                <li><strong>Google Analytics 4</strong> - For anonymous usage analytics</li>
                <li><strong>Cloudflare</strong> - For hosting, content delivery, and database services</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">6. Data Storage and Security</h2>
              <p>
                Your script metadata is stored securely in Cloudflare D1, a serverless SQL database. We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, or destruction.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">7. Data Retention and Deletion</h2>
              <p>
                You can delete your saved scripts at any time from your dashboard. To request complete account deletion, including all associated data, please contact us at the email address below.
              </p>
              <p>
                You can also revoke Teleprompter24&apos;s access to your Google account at any time through your{" "}
                <a
                  href="https://myaccount.google.com/permissions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google Account permissions settings
                </a>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">8. Your Rights</h2>
              <p>Under applicable data protection laws (including GDPR), you have the right to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Request data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p>
                <strong>snekmedia GmbH</strong><br />
                Email:{" "}
                <a href="mailto:office@snekmedia.com" className="text-blue-600 hover:underline">
                  office[ät]snekmedia.com
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
