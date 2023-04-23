import Image from 'next/image'
import img from '@/public/nino.png'

export const Header = () => {
    return (
        <header className="sticky top-0 w-full z-50 flex justify-center p-4 border-b-4 sm:border-b-8 border-black bg-white">
            {/* blog title */}
            <div className="flex justify-center items-center text-3xl sm:text-7xl font-bold italic">
                <div>
                    Rudy's Tech Blog
                </div>
                <div className="w-6/12 sm:w-6/12">
                    <Image
                        className="rounded-2xl"
                        src={img} alt=""
                        width={300}
                    />
                </div>
            </div>
        </header>
    )
}