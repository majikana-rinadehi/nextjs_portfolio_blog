type Props = {
    title: string
    description: string
    skills: string[]
    index: number
}

export const CardWorks = (props: Props) => {
    return (
        <div className={`${props.index > 0 ? "mt-8" : ""} pb-6 rounded-xl shadow-custom bg-white`}>
            <div className="flex px-8 justify-between">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="mt-4 h-28 w-16 bg-slate-300">
                    </div>
                ))}
            </div>
            <div className="pt-2 pl-6 text-xl">
                {/* manage-stock */}
                {props.title}
            </div>
            <div className="px-8 flex text-xs">
                {/* 冷蔵庫・日用品の在庫管理アプリです */}
                {props.description}
            </div>
            <div className="px-8 flex flex-wrap">
                {props.skills.map((skill, i) => (
                    <div key={i} className="mt-2 mr-3 px-2 bg-slate-300">
                        {/* Vue.js */}
                        <span className="text-sm">{skill}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}