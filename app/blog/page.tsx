import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Blog - Teleprompter24",
    description: "News, updates, and tips for content creators using Teleprompter24.",
};

export default function BlogIndex() {
    const posts = getAllPosts();

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                        <span className="font-bitcount uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">TELEPROMPTER24</span>
                    </Link>
                    <nav className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost">Home</Button>
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-4 md:px-6 py-12 md:py-24">
                <div className="max-w-3xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">Blog</h1>
                        <p className="text-muted-foreground text-lg">Updates, guides, and tips for creators.</p>
                    </div>

                    <div className="grid gap-8">
                        {posts.map((post) => (
                            <article key={post.slug} className="flex flex-col gap-4 p-6 border rounded-xl hover:shadow-lg transition-shadow bg-card">
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold tracking-tight hover:text-primary transition-colors">
                                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                    </h2>
                                    <p className="text-sm text-muted-foreground">{post.date} • {post.author}</p>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {post.excerpt}
                                </p>
                                <div className="pt-2">
                                    <Link href={`/blog/${post.slug}`} className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                                        Read more <ArrowLeft className="h-4 w-4 rotate-180" />
                                    </Link>
                                </div>
                            </article>
                        ))}

                        {posts.length === 0 && (
                            <p className="text-center text-muted-foreground">No posts yet. Check back soon!</p>
                        )}
                    </div>
                </div>
            </main>

            <footer className="border-t py-12 bg-muted/20 mt-auto">
                <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 font-semibold">
                        <span className="font-bitcount">TELEPROMPTER24</span>
                    </div>
                    <p className="text-sm text-muted-foreground text-center md:text-right">
                        © {new Date().getFullYear()} teleprompter24.com. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
