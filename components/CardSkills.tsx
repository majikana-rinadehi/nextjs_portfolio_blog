import { useResponsibleLayout } from "@/utils/hooks"

type Props = {
    title: string
    skillGroups: SkillGroup[]
}

export type SkillGroup = {
    title: string
    skills: string[]
}

export const CardSkills = (props: Props) => {

    const isMobile = useResponsibleLayout()

    return (
        <div className="mt-8 pb-4 rounded-xl shadow-custom bg-white
                        sm:pb-8 sm:rounded-[50px]">
            <div className="pt-4 pl-6 text-xl
                            sm:pl-10 sm:pt-6 sm:text-2xl">
                {props.title}
            </div>
            { props.skillGroups.map((skillGroup, i) => (
                <div key={`skillGroup_${i}`}>
                    <div
                        className={`${i > 0 ? "mt-4" : "mt-2"} pl-6 text-sm
                                    sm:pl-14 sm:text-xl`}>
                        {/* 得意・業務経験あり */}
                        ・{skillGroup.title}
                    </div>
                    <div
                        className="px-8 flex flex-wrap
                                    sm:pl-16 sm:pr-8">
                        { skillGroup.skills.map((skill, i) => (
                            <div
                                key={i} 
                                className="mt-2 mr-3 px-2 bg-slate-300">
                                {/* Vue.js */}
                                <span className="text-sm sm:text-lg">{skill}</span>
                            </div>
                        ))}
                    </div>
                </div>

            ))}
        </div>
    )
}