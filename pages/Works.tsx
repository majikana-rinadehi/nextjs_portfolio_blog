import { CardWorks } from "@/components/CardWorks"

export type Work = {
    title: string
    description: string
    skills: string[]
}

// TODO: fetch by getStaticProps
const works: Work[] = [
    {
        title: "manage-stock", description: "冷蔵庫・日用品の在庫管理アプリです",
        skills: ['React', 'Go']
    },
    {
        title: "guchitter", description: "キャラになりきって愚痴を言えるアプリです",
        skills: ['React', 'Go']
    },
]

export const Works = () => {
    return (
        <>
            <div className="flex flex-col justify-between">
                {/* Card_Works */} 
                { works.map((work, i) => (
                    <CardWorks {...work} index={i}/>
                ))}
            </div>
        </>
    )
}

export default Works