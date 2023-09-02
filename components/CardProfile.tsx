import Image from "next/image"
import img from "@/public/picture.jpg"
import { useResponsibleLayout } from "@/utils/hooks"
import { ExternalLinks, type Props as ExternalLinksProps } from "./ExternalLinks"

type Props = {
    title: string
    name: string
    description: string
}

export const CardProfile = (props: Props) => {

    const isMobile = useResponsibleLayout()

    const externalLinksProps: ExternalLinksProps = {
        hideFlagMap:{ githubSub: true }
    }

    return (
        <div className="py-4 rounded-xl shadow-custom bg-white
                        sm:py-6 sm:rounded-[50px]">
            <div className="pl-6 text-xl
                            sm:pl-10 sm:text-2xl">
                {props.title}
            </div>
            <div className="flex justify-center">
                <div className="sm:w-1/2 sm:flex sm:flex-row sm:justify-end sm:items-center">
                    <Image
                        src={img}
                        alt={"nino"}
                        className="h-24 w-24 rounded-full object-cover object-center
                                sm:ml-16 sm:h-44 sm:w-44"
                    />

                </div>
                {isMobile ? null :
                    <div className="w-1/2 ml-2 p-4">
                        <div className="flex text-3xl">
                            {props.name}
                        </div>
                        <div className="mt-3 flex text-xl">
                            {props.description}
                        </div>
                        <ExternalLinks {...externalLinksProps} />
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
                        <ExternalLinks classNameList={["h-7 w-7"]} {...externalLinksProps}/>
                    </div>
                </>
                : null
            }
        </div>
    )
}