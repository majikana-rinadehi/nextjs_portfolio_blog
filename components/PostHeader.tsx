type Props = {
    emoji: string
    title: string
}

export const PostHeader = (props: Props) => {
    return (
        <>
            {/* article icon */}
            <div className="flex flex-col items-center p-4 rounded-3xl bg-slate-300 drop-shadow-lg">
                <div className="mt-4 flex justify-center text-7xl">
                    {props.emoji ? props.emoji : '😁'}
                </div>
                <div className="my-8 p-1 rounded-lg bg-black">
                    <h1 className="text-center text-2xl text-white">
                        {props.title}
                    </h1>
                </div>
            </div>
        </>
    )
}