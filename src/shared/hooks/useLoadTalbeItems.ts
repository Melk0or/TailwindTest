import { setProduct } from '../redux/slices/table.slice';
import { AppDispatch } from '../redux/store';


export const useLoadProducts: (dispatch: AppDispatch) => void = (dispatch) => {
    const tableItems: string | null = localStorage.getItem('tableItems');
    if (tableItems) {
        dispatch(setProduct(JSON.parse(tableItems)));
    }
}