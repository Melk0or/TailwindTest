import { deleteData } from '@/shared/fetch/deleteData';
import { useMutation } from '@tanstack/react-query'

export const deleteMutations = () => {
    return useMutation({
        mutationFn: (id: string) => {
            return deleteData('/ru/data/v3/testmethods/docs/userdocs/delete/', id)
        }
    })
}
