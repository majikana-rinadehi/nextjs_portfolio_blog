import { useResponsibleLayout } from "@/utils/hooks"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

type Props = {
    links: string[]
}

export const Header = (props: Props) => {

    const router = useRouter()
    const isMobile = useResponsibleLayout()

    /** 現在いるページの、スラッシュを含むリンク名(例:"/About") */
    const activeLink = router.pathname

    const Links = (props: Props) => {
        return (
            <>
                {props.links.map((link, i) =>
                    <Link
                        key={i}
                        href={{
                            pathname: "/" + link
                        }}>
                        <div
                            key={i}
                            className={`px-3 py-1 font-bold 
                                        ${"/" + link === activeLink
                                    ? "text-red-500 border-b-2 border-red-500"
                                    : ""}`}>
                            {link}
                        </div>
                    </Link>
                )}
            </>
        )
    }

    return (
        <header className="sticky top-0 w-full z-50 flex justify-center p-4 bg-[#ECECEC]">
            {/* blog title */}
            {isMobile ?
                <div className="w-full flex flex-row justify-around items-center text-xl
                            font-bold">
                    <div className='mr-4 ml-2 w-2/12 text-center text-4xl bg-red-500 text-white 
                                font-weight-800'>
                        <Link href={"/About"}>
                            P
                        </Link>
                    </div>
                    <Links links={props.links} />
                </div>
                :
                <>
                    <div className="w-full flex flex-col justify-center items-center gap-5 text-6xl font-weight-800">
                        <div className="flex">
                            <div className="rounded-[30px] px-5 py-1 bg-red-500 text-white">
                                Rudy
                            </div>'s
                            <span className="ml-5">tech</span>
                            <span className="ml-5">Lab.</span>
                        </div>
                        <div className="w-8/12 flex flex-row justify-start items-center text-4xl font-weight-800">
                            <Links {...props} />
                        </div>
                    </div>
                </>
            }
        </header>
    )
}