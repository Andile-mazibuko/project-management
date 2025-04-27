export interface Project {
    id?:string,
    name: string,
    deadline: string,
    manager?: string,
    priority: "High" | "Medium" | "Low"
}
export interface User{
    id?: string,
    first_name: string,
    last_name: string,
    email: string

}