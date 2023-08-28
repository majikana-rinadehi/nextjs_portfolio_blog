import { AiOutlineLink } from "react-icons/ai"
import { FaGithub, FaGithubSquare } from "react-icons/fa"
import { SiQiita, SiZenn } from "react-icons/si"

export type LinkType = 'github' | 'githubSub' | 'qiita' | 'zenn' | 'blog'

export type Props = {
    classNameList?: string[]
    hrefMap?: { 
        [key in LinkType]?: string
    }
    hideFlagMap?: {
        [key in LinkType]?: boolean
    }
}

export const ExternalLinks = (props: Props) => {

    const classNames = props.classNameList ? props.classNameList.join(" ") : ""
    const hideFlagMap = props.hideFlagMap

    return (
        <div className="mt-4 ml-2 flex gap-4">
            {hideFlagMap?.github ? null :
                <a href={props.hrefMap?.github
                    ? props.hrefMap?.github
                    : "https://github.com/majikana-rinadehi"}
                    target="_blank" rel="noopener noreferrer">
                    <div>
                        <FaGithub className={`h-10 w-10 ${classNames}`} />
                    </div>
                </a>
            }
            {hideFlagMap?.githubSub ? null :
                <a href={props.hrefMap?.githubSub
                    ? props.hrefMap?.githubSub
                    : "https://github.com/majikana-rinadehi"}
                    target="_blank" rel="noopener noreferrer">
                    <div>
                        <FaGithubSquare className={`h-10 w-10 ${classNames}`} />
                    </div>
                </a>
            }
            {hideFlagMap?.qiita ? null :
                <a href={props.hrefMap?.qiita
                    ? props.hrefMap.qiita
                    : "https://qiita.com/rudy39"}
                    target="_blank" rel="noopener noreferrer">
                    <div>
                        <SiQiita className={`h-10 w-10 text-green-500 ${classNames}`} />
                    </div>
                </a>
            }
            {hideFlagMap?.zenn ? null :
                <a href={props.hrefMap?.zenn
                    ? props.hrefMap.zenn
                    : "https://zenn.dev/rudy?tab=scraps"}
                    target="_blank" rel="noopener noreferrer">
                    <div>
                        <SiZenn className={`h-10 w-10 text-blue-400 ${classNames}`} />
                    </div>
                </a>
            }
            {hideFlagMap?.blog ? null :
                <a href={props.hrefMap?.blog
                    ? props.hrefMap.blog
                    : "https://nextjs-portfolio-blog-orcin.vercel.app/About"}
                    target="_blank" rel="noopener noreferrer">
                    <div>
                        <AiOutlineLink className={`h-10 w-10 text-red-500 ${classNames}`} />
                    </div>
                </a>
            }
        </div>
    )
}