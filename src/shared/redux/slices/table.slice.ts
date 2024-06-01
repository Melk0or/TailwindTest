import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IInvoice } from '@/routes/home/index.lazy'

interface ITableItems {
    items: IInvoice[]
}

const initialState: ITableItems = {
    items: [],
}

const tableSlice = createSlice({
    name: 'tableSlice',
    initialState,
    reducers: {
        setProduct(state, action) {
            console.log(action.payload)
            for (const item of action.payload) {
                state.items.push(item)
            }
        },
        removeItem(state, action) {
            state.items = state.items.filter(
                (item) => item.id !== action.payload.id
            )
            localStorage.setItem('tableItems', JSON.stringify(state.items))
        },
        addItem(state, action) {
            console.log(action.payload)
            state.items.push(action.payload);
            localStorage.setItem('tableItems', JSON.stringify(state.items))
        },
        updateItem(state, action) {
            const findItem = state.items.find(item => item.id === action.payload.id);
            for (const item in findItem) {
                findItem[item] = action.payload[item];
            }
            localStorage.setItem('tableItems', JSON.stringify(state.items))
        }
    },
})

export const getMainItemsTableSelector = (state: RootState): IInvoice[] =>
    state.tableSlice.items

export const { setProduct, removeItem, addItem, updateItem } = tableSlice.actions

export default tableSlice.reducer
