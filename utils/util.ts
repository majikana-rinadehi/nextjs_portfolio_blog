import rehypeStringify from "rehype-stringify/lib"
import remarkParse from "remark-parse/lib"
import remarkRehype from "remark-rehype/lib"
import { unified } from "unified"
import { visit } from "unist-util-visit"
import { format } from "date-fns"

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

type TimeFormat = 'yyyy-MM-dd' | 'yyyy-MM' | 'M/d' | 'yyyy/MM/dd'

/**
 * Returns timestamp string formatted into specified `format`.  
 * If `timestamp` is INVALID, returns as-is `timeStamp` string.
 * @param timeStamp timestamp string
 * @param {TimeFormat} dateFormat 
 * @returns 
 */
export const getFormattedTimeStamp = (timeStamp: string, dateFormat: TimeFormat): string => {
    const isValidDate = !isNaN(new Date(timeStamp).getTime())
    return isValidDate ? format(new Date(timeStamp), dateFormat) : timeStamp
}