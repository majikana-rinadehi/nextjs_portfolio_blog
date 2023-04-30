import { guchitter_1, guchitter_2, guchitter_3 } from '@/public/works'
import { StaticImageData } from 'next/image'

type Work = {
    title: string
    description: string
    skills: string[]
    url: string
    images: StaticImageData[]
}

export const works: Work[] = [
    {
        title: "manage-stock", description: "冷蔵庫・日用品の在庫管理アプリです",
        skills: ['React', 'Go'],
        url: "",
        images: []
    },
    {
        title: "guchitter", description: "キャラになりきって愚痴を言えるアプリです",
        skills: ['React', 'Go'],
        url: "https://guchitter-app.vercel.app/",
        images: [guchitter_1, guchitter_2, guchitter_3]
    },
]