import { CookieHelper } from "@/helper/cookie.helper";
import { Project } from "@/app/type";
import { Fetch } from "@/lib/Fetch";
 
const config = {

    headers: {

        "Content-Type": "application/json",

    },

};
 
export const UserService = {
    login: async ({ email, password }: { email: string, password: string }, context = null) => {
        // const userToken = CookieHelper.get({ key: "token", context });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        return await Fetch.post(`/login`, { email: email, password: password }, config);
    },
 
    me: async () => {
        const userToken = CookieHelper.get({ key: "token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                // Authorization: userToken,
            },
        };
        return await Fetch.get('/me', config);
    },
 
    logout: async (id: string) => {
        console.log("User id : ", id)
        const userToken = CookieHelper.get({ key: "token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: userToken,
            },
        };
        return await Fetch.post('/logout', { userid: id }, config);
    },

    getStaffStatus: async () => {
        const userToken = CookieHelper.get({ key: "token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        return await Fetch.get('/staffStatus', config);
    },
    createProject: async (project: Project) => {
        const userToken = CookieHelper.get({ key: "token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: userToken,
            },
        };
        return await Fetch.post('/project', project, config);
    },
    getProjects: async() =>{
        const userToken = CookieHelper.get({key: "token"});
        const config = {
            headers: {
                Authorization: userToken,
            }
        };
        return await Fetch.get('/project', config);
    }

}
 