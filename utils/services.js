async function refreshToken(that, token) {
    try{
        const res = await that.$axios.$post('api/token/refresh/', {
            refresh: token.token
        })
        localStorage.setItem('access', res.access)
        localStorage.setItem('accessT', Date.now())
    } catch (er){
        localStorage.setItem('loggedin', false)
        console.log(er)
    }
}

async function getReady(that) {
    const check = localStorage.getItem('loggedin')
    if(check === 'true'){
        const refreshTok = {token: localStorage.getItem('refresh'), time: localStorage.getItem('refreshT')}
        console.log(refreshTok)
        if( Date.now() - refreshTok.time >= 60*60*1000 ){
            localStorage.setItem('loggedin', false)
            localStorage.removeItem('access')
            localStorage.removeItem('accessT')
            localStorage.removeItem('refresh')
            localStorage.removeItem('refreshT')
        } else {
            var accessTok = {token: localStorage.getItem('access'), time: localStorage.getItem('accessT')}
            if ( Date.now() - accessTok.time >= 5*60*1000 ){
                await refreshToken(that, refreshTok)
                accessTok = {token: localStorage.getItem('access'), time: localStorage.getItem('accessT')}
            }
            that.$axios.setToken(accessTok.token, 'Bearer')
        }
    }
}

export async function postReq(that, url, config) {
    await getReady(that)
    const res = that.$axios.$post(url, config);
    return res;
}
export async function getReq(that, url, config) {
    await getReady(that)
    const res = that.$axios.$get(url, config);
    return res;
}

export async function delReq(that, url, config) {
    await getReady(that)
    const res = that.$axios.$delete(url, config);
    return res;
}
