import { useResponsibleLayout } from "@/utils/hooks"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { CardLogs } from "../CardLogs"

export const Layout = ({ children }: any) => {

    const isMobile = useResponsibleLayout()

    return (
        <div className="flex flex-col items-center">
            <Header links={['About', 'Works', 'Blog']} />
            {
                isMobile ?
                    <main className="mt-4 w-10/12 sm:w-8/12 min-h-screen">
                        {children}
                    </main>
                    :
                    <div className="flex w-8/12 gap-11">
                        <main className="mt-4 w-10/12 sm:w-8/12 min-h-screen">
                            {children}
                        </main>
                        <nav className="mt-4 w-4/12">
                            <CardLogs />
                        </nav>
                    </div>

            }
            {/* <Footer/> */}
            <Footer />
        </div>
    )
}