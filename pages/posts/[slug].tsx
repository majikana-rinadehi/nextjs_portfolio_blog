import matter from "gray-matter"
import fs from "fs"
import { InferGetStaticPropsType } from "next"
import { convertMdToHtml } from "@/utils/util"

// dynamic route の場合 getStaticPaths も必要
// pre-build する posts の一覧を getStaticProps にわたす
// // getStaticProps が受け取る context の内容: 
// // // { params: { slug: post1 }}
export async function getStaticPaths() {
    const files = fs.readdirSync(`pages/posts/files`)
    const paths = files.map(v => {
        return {
            // getStaticPaths の戻り値は params でネストする必要がある
            params: {
                slug: v.replace(/\.md$/, "")
            }
        }
    })
    return {
        paths,
        fallback: false
    }
}

// ビルド時にこのページを pre-render するために必要な props を返す
// 引数 context には、 getStaticPaths の戻り値が入る
// // { params: { slug: post1 } }
export async function getStaticProps(context: any) {
    console.log("params:", context)
    const file = fs.readFileSync(`pages/posts/files/${context.params.slug}.md`)
    const { data, content } = matter(file)
    const html = await convertMdToHtml(content)
    console.log(html)
    const props = {
        /** frontMatter */
        frontMatter: data,
        /** 記事本文 */
        content: html
    }

    return {
        props
    }
}

// 記事内容
// getStaticProps の戻り値を受け取り、エンドポイント /pages/[slug] に対応するページ内容を記載する。
// InferGetStaticPropstType により、getStaticProps の戻り値の型を動的に指定できる
export const Post = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <div className="prose">
            <div dangerouslySetInnerHTML={{ __html: props.content}}></div>
        </div>
    )   
}

export default Post