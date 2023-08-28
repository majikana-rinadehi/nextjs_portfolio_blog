type Props = {
    title: string
    topics: string[]
    index: number
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
            <div className="px-4 flex flex-wrap
                            sm:mx-8">
                {props.topics.map((tag, i) => (
                    <div key={i} className="mt-2 mr-3 px-2 bg-slate-300">
                        {/* React.js */}
                        <span className="text-sm sm:text-xl">{tag}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}