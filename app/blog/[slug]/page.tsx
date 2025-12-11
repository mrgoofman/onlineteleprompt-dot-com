import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const runtime = 'edge';
export const dynamicParams = false;

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: "Post Not Found" };
    return {
        title: `${post.title} - Teleprompter24 Blog`,
        description: post.excerpt,
    };
}

// Generate static params for all known posts at build time
export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                        <span className="font-bitcount uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">TELEPROMPTER24</span>
                    </Link>
                    <nav className="flex items-center gap-4">
                        <Link href="/blog">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <ArrowLeft className="h-4 w-4" /> Back to Blog
                            </Button>
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-4 md:px-6 py-12 md:py-24">
                <article className="max-w-3xl mx-auto">
                    <div className="mb-10 text-center border-b pb-8">
                        <div className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-primary uppercase bg-primary/10 rounded-full">
                            Blog Post
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl mb-4 text-foreground">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span className="font-medium text-foreground">{post.author}</span>
                        </div>
                    </div>

                    {/* 
              Manual Styling for HTML Content 
              We use Tailwind's [&_tag] syntax to style the inner HTML elements since the typography plugin is acting up.
            */}
                    <div
                        className="
                text-lg leading-relaxed text-foreground/90
                [&_p]:mb-6 [&_p]:leading-7
                [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:tracking-tight [&_h2]:text-foreground
                [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-foreground
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6
                [&_li]:mb-2 [&_li]:pl-1
                [&_strong]:font-bold [&_strong]:text-foreground
                [&_em]:italic
                [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-primary/50 [&_a]:hover:decoration-primary
                [&_blockquote]:border-l-4 [&_blockquote]:border-primary/50 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:text-muted-foreground
              "
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>
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
