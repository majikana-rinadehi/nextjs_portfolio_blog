import { CardWorks } from "@/components/CardWorks"
import { works } from "@/data/work"
import { InferGetStaticPropsType } from "next"

export const getStaticProps = () => {
    const props = 
        {
            works
        }
    return {
        props
    }
}

export const Works = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <div className="flex flex-col justify-between">
                {/* Card_Works */} 
                { props.works.map((work, i) => (
                    <CardWorks {...work} index={i} key={i}/>
                ))}
            </div>
        </>
    )
}

export default Works