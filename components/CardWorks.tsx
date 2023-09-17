import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'
import { ExternalLinks } from './ExternalLinks'
import type { Props as ExternalLinkProps } from '@/components/ExternalLinks'
import { motion } from 'framer-motion'

type Props = {
    title: string
    description: string
    subDescription?: string
    skills: string[]
    url: string
    index: number
    images: StaticImageData[]
    externalLinkProps: ExternalLinkProps
}

export const CardWorks = (props: Props) => {

    const [selectImg, setSelectImg] = useState<StaticImageData>(props.images[0])
    const [showModal, setShowModal] = useState(false)

    const onClickImage = (img: StaticImageData) => {
        setSelectImg(img)
        setShowModal(true)
    }

    const onClickCloseModal = () => {
        setShowModal(false)
    }

    const modal = (
        // overlay
        <dialog
            onClick={() => onClickCloseModal()}
            className='fixed z-50 top-0 left-0 w-screen h-full flex flex-col items-center
                     bg-gray-600/50'>
            <motion.div className='w-11/12 rounded-xl p-4 flex flex-col items-center justify-center bg-white
                            sm:h-5/6 sm:p-4 sm:mt-4 sm:w-fit sm:min-w-min sm:rounded-[30px]'>
                <Image
                    src={selectImg}
                    alt=''
                    className='m-4 w-10/12 object-cover object-center border-4 border-gray-600
                                sm:w-11/12 sm:h-5/6'
                />
                <button
                    onClick={onClickCloseModal}
                    className='mt-4 rounded-lg p-2 bg-slate-200'>
                    x閉じる
                </button>
            </motion.div>
        </dialog>
    )

    const content = (
        <div className={`${props.index > 0 ? "mt-8" : ""} pb-6 rounded-xl shadow-custom bg-white
                        sm:rounded-[50px]`}>
            <div className="flex px-8 justify-between
                            sm:justify-around">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="">
                        {
                            props.images.length > i
                                ?
                                <motion.div
                                    initial={{ backdropFilter: 'blur(10px)', opacity: 0 }}
                                    animate={{ backdropFilter: 'blur(0px)', opacity: 1 }}
                                    transition={{ duration: 0.6 }}>
                                    <Image
                                        onClick={() => onClickImage(props.images[i])}
                                        src={props.images[i]}
                                        alt={""}
                                        className="mt-4 h-28 w-16 object-cover object-center border border-slate-300
                                                    sm:mt-7 sm:h-56 sm:w-28 sm:rounded-lg"
                                    />
                                </motion.div>
                                :
                                <div className="mt-4 h-28 w-16 bg-slate-300"></div>
                        }

                    </div>
                ))}
            </div>
            <div className='flex gap-4 items-center'>
                <div className="pt-2 pl-6 text-xl
                            sm:text-2xl">
                    {/* manage-stock */}
                    {props.title}
                </div>
                <ExternalLinks
                    {...props.externalLinkProps}
                />
            </div>
            <div className="px-8 flex text-xs
                            sm:mt-2 sm:ml-4 sm:text-lg">
                {/* 冷蔵庫・日用品の在庫管理アプリです */}
                {props.description}
            </div>
            <div className="px-8 flex text-xs
                            sm:ml-4 sm:text-base">
                {/* 冷蔵庫・日用品の在庫管理アプリです */}
                {props.subDescription}
            </div>
            <div className="px-8 flex flex-wrap
                            sm:ml-4">
                {props.skills.map((skill, i) => (
                    <div key={i} className="mt-2 mr-3 px-2 bg-slate-300
                                            sm:mt-4 sm:ml-2">
                        {/* Vue.js */}
                        <span className="text-sm sm:text-xl">{skill}</span>
                    </div>
                ))}
            </div>
        </div>
    )

    return (
        <>
            {
                showModal
                    ?
                    modal
                    :
                    null
            }
            {content}
        </>
    )
}