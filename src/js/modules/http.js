async function get(url) {
        const resp = await fetch(url)
        const resData = await resp.json()
       return resData
}
async function post(url,data) {
        const resp = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const resData = await resp.json()
        return resData
}
async function put(url,data) {
        const resp = await fetch(url,{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const resData = await resp.json()
        return resData
        
}
async function del (url) {
        const resp = await fetch(url,{
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify()
        })
        const resData = "Resource deleted"
        return resData
        
}

export{
    get,
    post,
    put,
    del
}