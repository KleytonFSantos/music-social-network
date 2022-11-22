import axios from 'axios'

const baseUrl = process.env.VUE_APP_API_URL


type Post = {
    title: string,
    image: string,
    description: string,
    user_id: number,
}

export const postsService = {
    async addPost(
        post: Post,
        successFunction: (response: Response) => void,
        errorFunction: (err: Error) => void
    ) {
        const token = localStorage.getItem('token');

        const config = {
            headers:{
                Authorization: 'Bearer ' + token
            }
        };
        await axios.post(`${baseUrl}/add-post/${post.user_id}`, post, config)
        .then((response) => {
            successFunction(response.data)
        }).catch((err) => {
            errorFunction(err.response.data.message)
        })
    },
    async deletePost(
        userId: number,
        postId: number,
        successFunction: (response: object) => void,
        errorFunction: (err: Response) => void
    ){
        const token = localStorage.getItem('token');

        const config = {
            headers:{
                Authorization: 'Bearer ' + token
            }
        };

        await axios.delete(`${baseUrl}/${userId}/delete-post/${postId}`, config)
        .then((res) => {
            console.log('success', res);
            successFunction(res);
        }).catch((err) => {
            errorFunction(err)
            console.log('error', err);
        });
    },
    async editPost(
        userId: number,
        postId: number,
        post: Post,
        successFunction: (response: object) => void,
        errorFunction: (err: Response) => void
    ){
        const token = localStorage.getItem('token');

        const config = {
            headers:{
                Authorization: 'Bearer ' + token
            }
        };

        await axios.put(`${baseUrl}/${userId}/edit-post/${postId}`, post, config)
        .then((res) => {
            console.log('success', res);
            successFunction(res);
        }).catch((err) => {
            errorFunction(err)
            console.log('error', err);
        });
    }
}
