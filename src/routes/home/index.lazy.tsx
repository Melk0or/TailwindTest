import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import { useQuery } from '@tanstack/react-query'
import { getData } from '@/shared/fetch/getData'
import { useDispatch, useSelector } from 'react-redux'
import {
    getMainItemsTableSelector,
    removeItem,
} from '@/shared/redux/slices/table.slice'
import { AppDispatch } from '@/shared/redux/store'
import { useLoadProducts } from '@/shared/hooks/useLoadTalbeItems'
import AddTablItemForm from '@/components/AddTableItemForm'
import { X } from 'lucide-react'
import { deleteMutations } from '@/shared/hooks/queries/deleteMutations'
import UpdateTableItemForm from '@/components/UpdateTableItemForm'
import { useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export interface IInvoice {
    companySigDate: string
    companySignatureName: string
    documentName: string
    documentStatus: string
    documentType: string
    employeeNumber: string
    employeeSigDate: string
    employeeSignatureName: string
    id: string
}

const TableDemo = () => {
    const tableItems = useSelector(getMainItemsTableSelector)
    const dispatch: AppDispatch = useDispatch()
    const { mutate: deleteMutate } = deleteMutations()

    const deleteItems = (invoice: IInvoice) => {
        deleteMutate(invoice.id)
        dispatch(removeItem(invoice))
    }
    // @ts-ignore: error message
    const { data } = useQuery({
        queryKey: ['table'],
        queryFn: () => {
            return getData('/ru/data/v3/testmethods/docs/userdocs/get')
        },
        select: (d: { data: IInvoice[] }) => {
            if (tableItems.length < 1) {
                localStorage.setItem('tableItems', JSON.stringify(d.data))
                useLoadProducts(dispatch)
            }
        },
    })
    return (
        <>
            <Table className={tableItems.length === 0 ? ('border-separate border-spacing-2') : undefined}>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]" colSpan={1}>
                            Счет
                        </TableHead>
                        <TableHead colSpan={1}>Статус</TableHead>
                        <TableHead colSpan={2}>Тип документа</TableHead>
                        <TableHead className="text-right" colSpan={1}>
                            Номер работника
                        </TableHead>
                        <TableHead className="text-right" colSpan={1}>
                            Изменить
                        </TableHead>
                        <TableHead className="text-right" colSpan={1}>
                            Удалить
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableItems.length === 0 ? (
                        <>
                            {new Array(5).fill(0).map((_, index) => (
                                <tr key={index} className="space-y-3 w-full">
                                    <td colSpan={1}>
                                        <Skeleton className="h-[50px] w-full rounded-xl p-4" />
                                    </td>
                                    <td colSpan={1}>
                                        <Skeleton className="h-[50px] w-full rounded-xl p-4" />
                                    </td>
                                    <td colSpan={2}>
                                        <Skeleton className="h-[50px] w-full rounded-xl p-4" />
                                    </td>
                                    <td colSpan={1}>
                                        <Skeleton className="h-[50px] w-full rounded-xl p-4" />
                                    </td>
                                    <td colSpan={1}>
                                        <Skeleton className="h-[50px] w-full rounded-xl p-4" />
                                    </td>
                                    <td colSpan={1}>
                                        <Skeleton className="h-[50px] w-full rounded-xl p-4" />
                                    </td>
                                </tr>
                            ))}
                        </>
                    ) : (
                        tableItems.map((invoice: IInvoice, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium" colSpan={1}>
                                    {invoice.id.slice(0, 5)}
                                </TableCell>
                                <TableCell colSpan={1}>
                                    {invoice.documentStatus}
                                </TableCell>
                                <TableCell colSpan={2}>
                                    {invoice.documentType}
                                </TableCell>
                                <TableCell className="text-right" colSpan={1}>
                                    {invoice.employeeNumber}
                                </TableCell>
                                <TableCell className="text-right" colSpan={1}>
                                    <UpdateTableItemForm invoice={invoice} />
                                </TableCell>
                                <TableCell
                                    className="flex justify-end"
                                    colSpan={1}
                                >
                                    <X
                                        className="w-5 h-5 cursor-pointer"
                                        onClick={() => deleteItems(invoice)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <AddTablItemForm />
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    )
}

const HomePage = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('access-token')) {
            navigate({ to: '/' })
        }
    }, [])
    return (
        <div>
            <TableDemo />
        </div>
    )
}

export const Route = createLazyFileRoute('/home/')({
    component: HomePage,
})
