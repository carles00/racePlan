import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: "http://localhost:4000",
    fetchOptions: {
        onSuccess: (ctx) => {
            const authToken = ctx.response.headers.get("set-auth-token") // get the token from the response headers
            // Store the token securely (e.g., in localStorage)
            if(authToken){
              localStorage.setItem("bearer_token", authToken);
            }
        },
        onError:() =>{
          localStorage.removeItem("bearer_token");
        },
        auth: {
           type:"Bearer",
           token: () => localStorage.getItem("bearer_token") || "" // get the token from localStorage
        }
    }
})