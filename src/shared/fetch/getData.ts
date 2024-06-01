type TGetData = (url: string) => Promise<any>

export const getData: TGetData = async (url) => {
    const headers = new Headers()
    const token = localStorage.getItem('access-token')
    if (token) {
        headers.set('x-auth', token)
    }
    let res = await fetch(`${import.meta.env.VITE_HOST + url}`, {
        method: 'GET',
        headers: headers,
    })
    return res.json()
}
