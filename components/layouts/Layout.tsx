import { Header } from "./Header"
import { Nav } from "./Nav"
import { Footer } from "./Footer"
import { PostHeader } from "./PostHeader"

export const Layout = ({ children }: any) => {
    return (
        <div className="flex flex-col items-center">
            <Header/>
            <Nav/>
            <main className="mt-4 w-10/12 sm:w-8/12">
                <PostHeader/>
                <div className="my-8">
                    {children}
                </div>
            </main>
            <Footer/>
        </div>
    )
}