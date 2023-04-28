type Props = {
    links: string[]
}

export const Header = (props: Props) => {

    return (
        <header className="sticky top-0 w-full z-50 flex justify-center p-4 
                            sm:border-b-8 border-black bg-white">
            {/* blog title */}
            <div className="w-full flex flex-row justify-around items-center text-xl
                            font-bold">
                <div className='mr-4 ml-2 w-2/12 text-center text-4xl bg-red-500 text-white 
                            font-weight-800'>
                    P
                </div>
                {
                    props.links.map((link, i) =>
                        <div className={"px-3 py-1 font-bold" + " " +
                                        `${i === 0 ? "text-red-500 border-b-2 border-red-500" : ""}` }>
                            {link}
                        </div>
                    )
                }
            </div>
        </header>
    )
}