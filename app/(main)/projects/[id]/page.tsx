import ProjectDetails from "../_component/ProjectDetails"


export default async function page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params
    const { id } = params
    return (
        <ProjectDetails id={id} />
    )
}