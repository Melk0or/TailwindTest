type TDeleteData = (url: string, id: string) => Promise<any>

export const deleteData: TDeleteData = async (url, id) => {
    const headers = new Headers()
    const token = localStorage.getItem('access-token')
    if (token) {
        headers.set('x-auth', token)
    }
    let res = await fetch(`${import.meta.env.VITE_HOST + url + id}`, {
        method: 'POST',
        headers: headers,

    })
    return res.json()
}
