import { useResponsibleLayout } from "@/utils/hooks"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { CardLogs } from "../CardLogs"
import { useRouter } from "next/router"

export const Layout = ({ children }: any) => {

    const isMobile = useResponsibleLayout()
    const router = useRouter()

    /** 現在いるページの、スラッシュを含むリンク名(例:"/About") */
    const activeLink = router.pathname
    const isInPosts = activeLink.includes('posts')

    return (
        <div className="flex flex-col items-center">
            <Header links={['About', 'Works', 'Blog']} />
            {
                isMobile ?
                    <main className="mt-4 w-10/12 min-h-screen">
                        {children}
                    </main>
                    :
                    <div className="flex w-9/12 gap-11">
                        <main className="mt-4 w-11/12 min-h-screen">
                            {children}
                        </main>
                        {isInPosts ? null :
                            <nav className="mt-4 w-6/12">
                                <CardLogs />
                            </nav>
                        }
                    </div>

            }
            {/* <Footer/> */}
            <Footer />
        </div>
    )
}