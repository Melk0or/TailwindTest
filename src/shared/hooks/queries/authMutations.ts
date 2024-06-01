import { IInput } from '@/routes/index.lazy'
import { postData } from '@/shared/fetch/postData'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from "@tanstack/react-router";

type TData = { token: string } | null

interface IRes {
    data: TData
    error_code: number
    error_message: string
}

export const authMutation = (setIsError: React.Dispatch<React.SetStateAction<boolean>>) => {
    const navigate = useNavigate({ from: '/' })
    return useMutation({
        mutationFn: (formData: IInput) => {
            return postData('/ru/data/v3/testmethods/docs/login', formData)
        },
        onSuccess: (d: IRes) => {
            if (d.data !== null) {
                localStorage.setItem('access-token', d.data.token)
                console.log(d)
                navigate({ to: '/home' })
            } else {
                setIsError(() => true);
            }
        },
    })
}
