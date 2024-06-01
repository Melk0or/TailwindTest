import { addItem } from '@/shared/redux/slices/table.slice';
import { AppDispatch } from '@/shared/redux/store';
import { IInvoice } from '@/routes/home/index.lazy';
import { postData } from '@/shared/fetch/postData'
import { useMutation } from '@tanstack/react-query'


export const addItemMutation = (dispatch: AppDispatch, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    return useMutation({
        mutationFn: (invoice: IInvoice) => {
            return postData('/ru/data/v3/testmethods/docs/userdocs/create', invoice)
        },
        onSuccess: (d) => {
            dispatch(addItem(d.data));
            setIsLoading(prevState => !prevState);
            console.log(d);
        },
    })
}
