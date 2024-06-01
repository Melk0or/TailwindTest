import { IInvoice } from '@/routes/home/index.lazy'
import { IInput } from '@/routes/index.lazy'
type TObj = IInput | IInvoice

type TPostData = (url: string, obj: TObj) => Promise<any>

export const postData: TPostData = async (url, obj) => {
    const headers = new Headers()
    const token = localStorage.getItem('access-token')
    if (token) {
        headers.set('x-auth', token)
    }
    headers.set('Content-Type', 'application/json')
    let res = await fetch(`${import.meta.env.VITE_HOST + url}`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(obj),
    })
    return res.json()
}
