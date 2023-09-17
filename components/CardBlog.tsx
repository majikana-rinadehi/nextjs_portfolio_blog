import { getFormattedTimeStamp } from "@/utils/util"
import { MdUpdate } from "react-icons/md"

type Props = {
    title: string
    topics: string[]
    index: number
    date: string
}

export const CardBlog = (props: Props) => {
    return (
        <div className={`${props.index > 0 ? "mt-6" : ""} pb-4 rounded-xl shadow-custom bg-white
                        sm:pb-6 sm:rounded-[30px]`}>
            <div className="pt-4 px-4
                            sm:px-8 sm:pt-6 sm:text-2xl">
                {/* Next.jsでSSR/SSG/CSR/ISRを使い分ける */}
                {props.title}
            </div>
            <div className="pt-1 px-4 flex items-center gap-1 text-sm text-[#4E5749] font-semibold
                            sm:mx-8 sm:px-2 sm:text-lg">
                {/* 2023/09/08 */}
                <MdUpdate className={`h-5 w-5 sm:h-7 sm:w-7`} />
                {getFormattedTimeStamp(props.date, 'yyyy/MM/dd')}
            </div>
            <div className="px-4 flex flex-wrap
                            sm:mx-8">
                {props.topics.map((tag, i) => (
                    <div key={i} className="mt-2 mr-3 px-2 bg-slate-300">
                        {/* React.js */}
                        <span className="text-sm sm:text-lg">{tag}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}