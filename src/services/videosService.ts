import axios from 'axios'

const baseUrl = process.env.VUE_APP_API_URL


type Videos = {
    title: string,
    video: string,
    user_id: number,
}

export const videosService = {
    addVideos(
        video: Videos,
        successFunction: (res?: object) => void,
        errorFunction: (error?: object) => void,
    ){
        const token = localStorage.getItem('token');

        const config = {
            headers:{
                Authorization: 'Bearer ' + token
            }
        };
        axios.post(`${baseUrl}/add-youtube-video/${video.user_id}`, video, config)
        .then((res) => {
            successFunction(res)
        }).catch((error) => {
            errorFunction(error)
        })
    },
    async deleteVideo(
        userId: number,
        videoId: number,
        successFunction: () => void,
        errorFunction: (err: object) => void
    ): Promise<void> {
        const token = localStorage.getItem('token');

        const config = {
            headers:{
                Authorization: 'Bearer ' + token
            }
        };
        await axios.delete(`${baseUrl}/${userId}/delete-youtube-videos/${videoId}`, config)
        .then(() => {
            successFunction()
        }).catch(err=>{
            errorFunction(err)
        })
    }
}