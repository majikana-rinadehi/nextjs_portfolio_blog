import rehypeStringify from "rehype-stringify/lib"
import remarkParse from "remark-parse/lib"
import remarkRehype from "remark-rehype/lib"
import { unified } from "unified"
import { visit } from "unist-util-visit"

/**
 * converts markdown text to html text by library 「remark」
 * @param content markdown text
 * @returns html converted from the markdown
 */
export const convertMdToHtml = async (content: string): Promise<string> => {

    // to inspect AST
    const chechAST = () => {
        return (tree: any) => {
            visit(tree, (node) => {
                console.log(node)
            })
        }
    }

    const result = await unified()
        // @ts-ignore
        .use(remarkParse)
        .use(chechAST)
        // @ts-ignore
        .use(remarkRehype)
        .use(chechAST)
        .use(rehypeStringify)
        .process(content)
    
    return result.toString()
}