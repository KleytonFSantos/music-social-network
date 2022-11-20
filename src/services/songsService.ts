import axios from 'axios'

const baseUrl = process.env.VUE_APP_API_URL


type Songs = {
    artist_id: number,
    artist_name: string,
    songs: [{
      id: number,
      title: string,
      namefile: string,
      user_id: string,
      created_at: string,
    }]
  }
  

export const songsService = {
    addSongs( 
    resource: {
        title: string | null, 
        song: string | null, 
    }, 
    successFunction: () => void,
    errorFunction: (err: object) => void
    ) {
        const token = localStorage.getItem('token');

        const config = {
            headers:{
                Authorization: 'Bearer ' + token
            }
        };
        axios.post(`${baseUrl}/add-song`, resource, config)
        .then((res) => {
            successFunction()
            console.log('songUploaded', res);
        }).catch(err => {
            errorFunction(err)
        });
    },
    async SongsByUserId(
        userId: number, 
        successFunction: (res: Songs | unknown) => void, 
        // errorFunction: () => void
    ): Promise<void> {
        const token = localStorage.getItem('token');

        const config = {
            headers:{
                Authorization: 'Bearer ' + token
            }
        };
        await axios.get(`${baseUrl}/get-songs/${userId}`, config)
        .then((res) => {
            successFunction(res)
        }).catch(err=>console.log('err', err))
    },
    async deleteSong(
        userId: number,
        songId: number,
        successFunction: () => void,
        errorFunction: (err: object) => void
    ): Promise<void> {
        const token = localStorage.getItem('token');

        const config = {
            headers:{
                Authorization: 'Bearer ' + token
            }
        };
        await axios.delete(`${baseUrl}/delete-song/${userId}/${songId}`, config)
        .then(() => {
            successFunction()
        }).catch(err=>{
            errorFunction(err)
        })
    }
}