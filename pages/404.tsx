import Link from "next/link";

export default function Custom404() {
    return (
        <div className="flex flex-col items-center">
            <div className="text-7xl">
                😨
            </div>
            <div className="">
                404
            </div>
            <div className="text-sm">
                お探しのページは見つかりませんでした
            </div>
            <div className="mt-4 px-3 py-2 bg-red-500 hover:bg-red-700 text-white rounded-lg mr-2 font-black text-sm">
                <Link href={'/About'}>
                    ← 戻る
                </Link>
            </div>
        </div>
    )
}