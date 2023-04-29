type Props = {
    title: string
    name: string
    description: string
}

export const CardProfile = (props: Props) => {
    return (
        <div className={"h-52 rounded-xl shadow-custom bg-white"}>
            <div className="pt-4 pl-6 text-xl">
                {props.title}
            </div>
            <div className="flex justify-center">
                <div className="-mt-2 h-24 w-24 rounded-full bg-slate-300">
                </div>
            </div>
            <div className="mt-2 flex justify-center text-xl">
                {props.name}
            </div>
            <div className="mt-1 flex justify-center text-sm">
                {props.description}
            </div>
        </div>
    )
}