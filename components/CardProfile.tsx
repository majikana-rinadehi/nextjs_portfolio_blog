import Image from "next/image"
import img from "@/public/picture.jpg"
import { useResponsibleLayout } from "@/utils/hooks"
import { ExternalLinks } from "./ExternalLinks"

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
                            sm:pl-10 sm:pt-6 sm:text-2xl">
                {props.title}
            </div>
            <div className="flex justify-center
                            sm:justify-start sm:gap-5">
                <Image
                    src={img}
                    alt={"nino"}
                    className="h-24 w-24 rounded-full object-cover object-center
                                sm:ml-16 sm:h-44 sm:w-44"
                />
                {isMobile ? null :
                    <div className="ml-2">
                        <div className="flex text-3xl">
                            {props.name}
                        </div>
                        <div className="mt-3 flex text-xl">
                            {props.description}
                        </div>
                        <ExternalLinks hideFlagMap={{ githubSub: true}}/>
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
                    <div className="flex justify-center items-center">
                        <ExternalLinks classNameList={["h-7 w-7"]}/>
                    </div>
                </>
                : null
            }
        </div>
    )
}