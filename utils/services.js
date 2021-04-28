export function refreshToken(that){
    that.$axios.onResponseError(async (error) => {
        if(localStorage.getItem('access')){
            if(error.response.status === 401){
                try{
                    res = new that.$axios.$post('api/token/refresh/', {
                        token: localStorage.getItem('refresh')
                    })
                    that.$axios.setToken(res.data.access_token, 'Bearer')
                    return Promise.resolve(that.$axios(error.config))
                } catch (er){
                    console.log(er)
                    return Promise.reject(er)
                }
            }
            else return Promise.reject(error)
        }
        else return Promise.reject(error)
    })
}

export function postReq(that, url ,config){    
    const res = that.$axios.$post(url, config)
    return res
}