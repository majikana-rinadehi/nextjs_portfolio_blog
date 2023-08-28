import { guchitter_1, guchitter_2, guchitter_3, manage_stock_1, manage_stock_2, manage_stock_3 } from '@/public/works'
import { StaticImageData } from 'next/image'
import type { Props as ExternalLinkProps } from '@/components/ExternalLinks'

type Work = {
    title: string
    description: string
    subDescription?: string
    skills: string[]
    url: string
    images: StaticImageData[]
    externalLinkProps: ExternalLinkProps
}

export const works: Work[] = [
    {
        title: "manage-stock", description: "冷蔵庫・日用品の在庫管理アプリです。",
        subDescription: "※Vue.jsからのリアーキテクチャ中",
        skills: ['React', 'TailwindCSS', 'Redux', 'Go', 'Gin', 'Gorm', 'MySQL' ],
        url: "",
        images: [manage_stock_1, manage_stock_2, manage_stock_3],
        externalLinkProps: {
            classNameList: ["h-7 w-7"],
            hideFlagMap: {
                qiita: true, zenn: true, blog: true
            },
            hrefMap: {
                github: "https://github.com/majikana-rinadehi/front-manage-stock-react",
                githubSub: "https://github.com/majikana-rinadehi/backend-manage-stock-go"
            }
        }
    },
    {
        title: "guchitter", description: "キャラになりきって呟けるアプリです",
        skills: ['React', 'Chakla UI', 'Go', 'Gin', 'Gorm', 'MySQL'],
        url: "https://guchitter-app.vercel.app/",
        images: [guchitter_1, guchitter_2, guchitter_3],
        externalLinkProps: {
            classNameList: ["h-7 w-7"],
            hideFlagMap: {
                qiita: true, zenn: true
            },
            hrefMap: {
                github: "https://github.com/majikana-rinadehi/guchitter-app",
                githubSub: "https://github.com/majikana-rinadehi/backend-guchitter-app",
                blog: "https://guchitter-app.vercel.app/"
            }
        }
    },
]