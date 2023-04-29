import { CardProfile } from "@/components/CardProfile"
import { CardSkills, SkillGroup } from "@/components/CardSkills"

// TODO: fetch by getStaticProps
const skillGroups: SkillGroup[] = [
    {
        title: "得意・業務経験あり",
        skills: [
            'Vue.js', 'Typescript', 'jQuery', 'Java', 'Nest.js'
        ]
    }, 
    {
        title: "趣味",
        skills: [
            'Go', 'React'
        ]
    }, 
]

export const About = () => {
    return (
        <>
            <div className="flex flex-col justify-between">
                {/* Card_Profile */} 
                <CardProfile 
                    title="Profile" name="Rudy" description="Frontend Developer"/>
                {/* Card_Skills */}
                <CardSkills 
                    title="Skills" skillGroups={skillGroups}/>
            </div>
        </>
    )
}

export default About