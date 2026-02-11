import { CookieHelper } from "@/helper/cookie.helper";

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

    getClientStatus: async () => {

        const userToken = CookieHelper.get({ key: "token" });

        const config = {

            headers: {

                "Content-Type": "application/json",

            },

        };

        return await Fetch.get('/clientStatus', config);

    },

    getStaffData: async () => {

        const userToken = CookieHelper.get({ key: "token" });

        const config = {

            headers: {

                "Content-Type": "application/json",

            },

        };

        return await Fetch.get('/staffData', config);

    },

    getSingleStaffData: async ({id}:{id:string}) => {

        const userToken = CookieHelper.get({ key: "token" });

        const config = {

            headers: {

                "Content-Type": "application/json",

            },

        };

        return await Fetch.get(`/staffData/${id}`, config);

    },

    getClientData: async () => {

        const userToken = CookieHelper.get({ key: "token" });

        const config = {

            headers: {

                "Content-Type": "application/json",

            },

        };

        return await Fetch.get('/clientData', config);

    },

    updateSingleStaffData:async ({id}:{id:string}) => {

        const userToken = CookieHelper.get({ key: "token" });

        const config = {

            headers: {

                "Content-Type": "application/json",

            },

        };

        return await Fetch.patch(`/staffData/${id}`, config);

    },

    getSingleClientData: async ({id}:{id:string}) => {

        const userToken = CookieHelper.get({ key: "token" });

        const config = {

            headers: {

                "Content-Type": "application/json",

            },

        };

        return await Fetch.get(`/clientData/${id}`, config);

    },

    updateSingleClientData:async ({id}:{id:string}) => {

        const userToken = CookieHelper.get({ key: "token" });

        const config = {

            headers: {

                "Content-Type": "application/json",

            },

        };

        return await Fetch.patch(`/clientData/${id}`, config);

    },

    getCertificates: async ({id}:{id?:string}) => {

        const userToken = CookieHelper.get({ key: "token" });

        const config = {

            headers: {

                "Content-Type": "application/json",

            },

        };

        return await Fetch.get('/certificates', config);

    },

    getInvoicePayrollStatus: async () => {

        const userToken = CookieHelper.get({ key: "token" });

        const config = {

            headers: {

                "Content-Type": "application/json",

            },

        };

        return await Fetch.get('/invoicePayrollStatus', config);

    },

    reportUser: async (reportData: {
        reportedUserId: string;
        reason: string;
        description: string;
        timestamp: Date;
    }) => {

        const userToken = CookieHelper.get({ key: "token" });

        const config = {

            headers: {

                "Content-Type": "application/json",

                Authorization: userToken,

            },

        };

        return await Fetch.post('/report/user', reportData, config);

    }

}
 