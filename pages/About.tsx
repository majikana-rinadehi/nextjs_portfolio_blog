import { CardProfile } from "@/components/CardProfile"
import { CardSkills, SkillGroup } from "@/components/CardSkills"
import { skills } from "@/data/skill"
import { InferGetStaticPropsType } from "next"

export const getStaticProps = () => {
    const props = {
        skillGroups: skills
    }
    return {
        props
    }
}

export const About = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <div className="flex flex-col justify-between">
                {/* Card_Profile */} 
                <CardProfile 
                    title="Profile" name="Rudy" description="Frontend Developer"/>
                {/* Card_Skills */}
                <CardSkills 
                    title="Skills" skillGroups={props.skillGroups}/>
            </div>
        </>
    )
}

export default About