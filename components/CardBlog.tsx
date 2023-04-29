type Props = {
    title: string
    tags: string[]
    index: number
}

export const CardBlog = (props: Props) => {
    return (
        <div className={`${props.index > 0 ? "mt-6" : ""} pb-4 rounded-xl shadow-custom bg-white`}>
            <div className="pt-4 px-4">
                {/* Next.jsでSSR/SSG/CSR/ISRを使い分ける */}
                {props.title}
            </div>
            <div className="px-4 flex flex-wrap">
                {props.tags.map((tag, i) => (
                    <div className="mt-2 mr-3 px-2 bg-slate-300">
                        {/* React.js */}
                        <span className="text-sm">{tag}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}