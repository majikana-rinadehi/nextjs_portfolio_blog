import fs from 'fs'
import { CardBlog } from "@/components/CardBlog"
import matter from 'gray-matter'
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'

export type Post = {
    title: string
    tags: string[]
}

export const getStaticProps = () => {
    const filePaths = fs.readdirSync(`pages/posts/files`)
    const fileInfoList: {
        title: string
        topics: string[]
        date: string
        slug: string
    }[] = filePaths.map(filePath => {
        const file = fs.readFileSync(`pages/posts/files/${filePath}`)
        const { data } = matter(file)
        return {
            title: data.title,
            topics: data.topics
                .replace(/^\[|\]$|"|"/g, "")
                .split(","),
            date: data.date,
            slug: filePath.replace(/\.md$/, "")
        }
    })
    return {
        props: {
            fileInfoList
        }
    }
}

export const Blog = (props: InferGetStaticPropsType<typeof getStaticProps>) => {

    const sortedFileInfoList = props.fileInfoList.sort(
        (post1, post2) => {
            return post1.date < post2.date ? 1 : -1
        }
    )

    return (
        <div className="mb-4 flex flex-col justify-between">
            {/* Card_Works */}
            {sortedFileInfoList.map((post, i) => (
                <Link key={i} href={`/posts/${post.slug}`}>
                    <CardBlog {...post} index={i} />
                </Link>
            ))}
        </div>
    )
}

export default Blog