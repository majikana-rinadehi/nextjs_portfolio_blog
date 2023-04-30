type Props = {
    title: string
    skillGroups: SkillGroup[]
}

export type SkillGroup = {
    title: string
    skills: string[]
}

export const CardSkills = (props: Props) => {
    return (
        <div className={"mt-8 pb-4 rounded-xl shadow-custom bg-white"}>
            <div className="pt-4 pl-6 text-xl">
                {props.title}
            </div>
            { props.skillGroups.map((skillGroup, i) => (
                <div key={`skillGroup_${i}`}>
                    <div
                        className={`${i > 0 ? "mt-4" : "mt-2"} pl-6 text-sm`}>
                        {/* 得意・業務経験あり */}
                        {skillGroup.title}
                    </div>
                    <div
                        className="px-8 flex flex-wrap">
                        { skillGroup.skills.map((skill, i) => (
                            <div
                                key={i} 
                                className="mt-2 mr-3 px-2 bg-slate-300">
                                {/* Vue.js */}
                                <span className="text-sm">{skill}</span>
                            </div>
                        ))}
                    </div>
                </div>

            ))}
        </div>
    )
}