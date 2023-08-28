import Image from "next/image"
import img from "@/public/picture.jpg"
import { useResponsibleLayout } from "@/utils/hooks"

type Props = {
    title: string
    name: string
    description: string
}

export const CardProfile = (props: Props) => {

    const isMobile = useResponsibleLayout()

    return (
        <div className="pb-4 rounded-xl shadow-custom bg-white
                        sm:rounded-[50px]">
            <div className="pt-4 pl-6 text-xl
                            sm:pl-10 sm:pt-6 sm:text-3xl">
                {props.title}
            </div>
            <div className="flex justify-center
                            sm:justify-start sm:gap-10">
                <Image
                    src={img}
                    alt={"nino"}
                    className="h-24 w-24 rounded-full object-cover object-center
                                sm:ml-20 sm:h-44 sm:w-44"
                />
                {isMobile ? null :
                    <div>
                        <div className="flex text-4xl">
                            {props.name}
                        </div>
                        <div className="mt-3 flex text-2xl">
                            {props.description}
                        </div>
                        <div className="mt-4 ml-2 flex gap-5">
                            <div className="h-10 w-10 bg-slate-500">
                            </div>
                            <div className="h-10 w-10 bg-slate-500"></div>
                            <div className="h-10 w-10 bg-slate-500"></div>
                            <div className="h-10 w-10 bg-slate-500"></div>
                        </div>
                    </div>
                }
            </div>
            {isMobile ?
                <>
                    <div className="mt-2 flex justify-center text-xl">
                        {props.name}
                    </div>
                    <div className="mt-1 flex justify-center text-sm">
                        {props.description}
                    </div>
                </>
                : null
            }
        </div>
    )
}