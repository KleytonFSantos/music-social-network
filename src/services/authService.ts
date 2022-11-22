import router from '@/router';
import axios from 'axios'

const baseUrl = process.env.VUE_APP_API_URL

type TUser = {
    id: number,
    first_name: string,
    last_name: string,
    profile_image: string,
    city: string,
    state: string
}

export const authService = {
    async register(
        resource: {
            first_name: string, 
            last_name: string, 
            email: string, 
            password: string, 
            password_confirmation: string
        }, 
        successFunction: (res: object) => void, 
        errorFunction: () => void 
        ): Promise<void> {
            let success = false;
            await axios.post(`${baseUrl}/register`, resource)
                .then(res => {
                    success = true;
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('user', res.data.user.email);
                    if(success) {
                        successFunction(res.data);
                    }
                }).catch(() => {
                    if(!success) {
                        errorFunction();
                    }
                })
    },
    async login(
        resource: {
            email: string, 
            password: string 
        }, 
        successFunction: (user: TUser) => void, 
        errorFunction: () => void
        ): Promise<void> {
        let success = false;
        await axios.post(`${baseUrl}/login`, resource)
            .then(res => {
                success = true;
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', res.data.user.email);
                if(success) {
                    successFunction(res.data.user);
                }
            }).catch(() => {
                if(!success) {
                    errorFunction();
                }
            })
    },
    async auth(successFunction: (user: object) => void, errorFunction: () => void) {
        const token = localStorage.getItem('token');

        const config = {
            headers:{
                Authorization: 'Bearer ' + token
            }
        };
        let success = false
        axios.get(`${baseUrl}/user`, config)
            .then((res) => {
                success = true;
                successFunction(res)
            }).catch(() => {
                if (!success) {
                    errorFunction()
                }
            })
    },
    async logout() {
        const token = localStorage.getItem('token');
        
        const config = {
            headers:{
              Authorization: `Bearer ${token}`,
            }
          };
        axios.get(`${baseUrl}/logout`, config)
        .then(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/');
        })
    },
    async getUsers(successFunction: (users: object) => void, errorFunction: (err: object) => void){
        let success = false;
        await axios.get(`${baseUrl}/get-users`)
        .then(res => {
            success = true;
            if(success) {
                successFunction(res.data)
            }
        })
        .catch(err => {
            if(!success) {
                errorFunction(err)
            }
        })
    },
    async getUser(successFunction:(user: TUser) => void, errorFunction:(error: object) => void) {
        const token = localStorage.getItem('token');

        const config = {
            headers:{
              Authorization: `Bearer ${token}`,
            }
          };

        let success = false;
        await axios.get(`${baseUrl}/get-user`, config)
          .then(response => {
            success = true;
            successFunction(response.data)
          }).catch(err => {
            if (!success) {
                errorFunction(err)
            }
          })

    }
}