import Link from "next/link"
import { useRouter } from "next/router"

type Props = {
    links: string[]
}

export const Header = (props: Props) => {

    const router = useRouter()
    /** 現在いるページの、スラッシュを含むリンク名(例:"/About") */
    const activeLink = router.pathname
    console.log("activeLink:", activeLink)

    return (
        <header className="sticky top-0 w-full z-50 flex justify-center p-4 bg-[#ECECEC]">
            {/* blog title */}
            <div className="w-full flex flex-row justify-around items-center text-xl
                            font-bold">
                <div className='mr-4 ml-2 w-2/12 text-center text-4xl bg-red-500 text-white 
                                font-weight-800'>
                    <Link href={"/About"}>
                        P
                    </Link>
                </div>
                {
                    props.links.map((link, i) =>
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
                    )
                }
            </div>
        </header>
    )
}