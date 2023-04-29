import Link from "next/link"

type Props = {
    links: string[]
}

export const Header = (props: Props) => {

    return (
        <header className="sticky top-0 w-full z-50 flex justify-center p-4 bg-[#ECECEC]">
            {/* blog title */}
            <div className="w-full flex flex-row justify-around items-center text-xl
                            font-bold">
                <div className='mr-4 ml-2 w-2/12 text-center text-4xl bg-red-500 text-white 
                            font-weight-800'>
                    P
                </div>
                {
                    props.links.map((link, i) =>
                        <div
                            key={i} 
                            className={"px-3 py-1 font-bold" + " " +
                                        `${i === 0 ? "text-red-500 border-b-2 border-red-500" : ""}` }>
                            <Link href={link}>
                                {link}
                            </Link>
                        </div>
                    )
                }
            </div>
        </header>
    )
}