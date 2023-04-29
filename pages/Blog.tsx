import { CardBlog } from "@/components/CardBlog"

export type Post = {
    title: string
    tags: string[]
}

// TODO: fetch by getStaticProps
const posts: Post[] = [
    {
        title: "Next.jsでSSR/SSG/CSR/ISRを使い分ける",
        tags: ['React', 'Next.js']
    },
    {
        title: "Linuxコマンドだけで爆速で文字列を処理する",
        tags: ['Linux', 'awk']
    },
]

export const Blog = () => {
    return (
        <>
            <div className="flex flex-col justify-between">
                {/* Card_Works */} 
                { posts.map((post, i) => (
                    <CardBlog {...post} index={i}/>
                ))}
            </div>
        </>
    )
}

export default Blog