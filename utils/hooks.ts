import { useState, useEffect, useLayoutEffect } from "react"

export const useResponsibleLayout = (): boolean => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {

        const breakPoint = 640

        const handleResize = () => {
            setIsMobile(window.innerWidth <= breakPoint)
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    })

    return isMobile
}