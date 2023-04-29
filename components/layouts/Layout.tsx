import { Header } from "./Header"
import { Nav } from "./Nav"
import { Footer } from "./Footer"
import { PostHeader } from "./PostHeader"

export const Layout = ({ children }: any) => {
    return (
        <div className="flex flex-col items-center">
            <Header links={['About', 'Works', 'Blog']} />
            <main className="mt-4 w-10/12 sm:w-8/12 h-screen">
                {/* <PostHeader/> */}
                {children}
            </main>
            {/* <Footer/> */}
        </div>
    )
}