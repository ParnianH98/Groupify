function readyForRequest(that){
    that.$axios.onError(async (error) => {
        if(error.response.status === 401){
            try{
                res = await this.$axios.$post('api/token/refresh/', {
                    token: localStorage.getItem('refresh')
                })
                localStorage.setItem('access', res.data.access_token)
            } catch (er){
                console.log(er)
            }
        }
    })
}

export function postReq(that, url ,config){
    if(localStorage.getItem('access')){
        readyForRequest()
        that.$axios.setToken(localStorage.getItem('accesss'), 'Bearer')
        const res = that.$axios.$post(url, config)
        return res
    }
    else{
        that.$axios.setHeader('Authorization')
        const res = that.$axios.$post(url, config)
        return res
    }
}