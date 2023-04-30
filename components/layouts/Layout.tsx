import { Footer } from "./Footer"
import { Header } from "./Header"

export const Layout = ({ children }: any) => {
    return (
        <div className="flex flex-col items-center">
            <Header links={['About', 'Works', 'Blog']} />
            <main className="mt-4 w-10/12 sm:w-8/12 min-h-screen">
                {/* <PostHeader/> */}
                {children}
            </main>
            {/* <Footer/> */}
            <Footer/>
        </div>
    )
}