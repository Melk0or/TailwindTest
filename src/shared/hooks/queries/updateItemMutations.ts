import { patchData } from './../../fetch/patchData';
import {  updateItem } from '@/shared/redux/slices/table.slice';
import { AppDispatch } from '@/shared/redux/store';
import { IInvoice } from '@/routes/home/index.lazy';
import { useMutation } from '@tanstack/react-query'


export const updateItemMutation = (dispatch: AppDispatch, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    return useMutation({
        mutationFn: (invoice: IInvoice) => {
            return patchData('/ru/data/v3/testmethods/docs/userdocs/set/', invoice)
        },
        onSuccess: (d) => {
            dispatch(updateItem(d.data));
            setIsLoading(prevState => !prevState);
            console.log(d);
        },
    })
}
