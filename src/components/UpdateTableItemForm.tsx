import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { PopoverClose } from '@radix-ui/react-popover'
import { IAddTableItem } from './AddTableItemForm'
import { useForm } from 'react-hook-form'
import { IInvoice } from '@/routes/home/index.lazy'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/shared/redux/store'
import React, { useState } from 'react'
import { updateItemMutation } from '@/shared/hooks/queries/updateItemMutations'

interface IUpdateTableItem extends IAddTableItem {}

interface UpdateTableItemFormProps {
    invoice: IInvoice
}

const UpdateTableItemForm: React.FC<UpdateTableItemFormProps> = ({
    invoice,
}) => {
    const { register, handleSubmit } = useForm<IUpdateTableItem>()
    const dispatch: AppDispatch = useDispatch()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { mutate: udpateMutate } = updateItemMutation(dispatch, setIsLoading)

    const updateItem = (formData: IUpdateTableItem) => {
        setIsLoading((prevState) => !prevState)
        const updateInvoice: IInvoice = {
            companySigDate: invoice.companySigDate,
            companySignatureName: `${formData.docNumber}.sig`,
            documentName: `${formData.docNumber}.pdf`,
            documentStatus: formData.docStatus,
            documentType: formData.docType,
            employeeNumber: '' + formData.employeeNumber,
            employeeSigDate: invoice.employeeSigDate,
            employeeSignatureName: `${formData.docNumber}.sig`,
            id: invoice.id,
        }
        udpateMutate(updateInvoice)
    }
    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    
                    <Button disabled={isLoading} variant="outline"> Внести изменения 
                    {isLoading && (
                        <div role="status" className="ml-2">
                            <svg
                                aria-hidden="true"
                                className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    )}</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <form onSubmit={handleSubmit(updateItem)}>
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">
                                    Обновление элемента
                                </h4>
                            </div>
                            <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="name">
                                        Название документа
                                    </Label>
                                    <Input
                                        id="name"
                                        className="col-span-2 h-8"
                                        {...register('docNumber', {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="status">Статус</Label>
                                    <Input
                                        id="status"
                                        className="col-span-2 h-8"
                                        {...register('docStatus', {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="type">Тип</Label>
                                    <Input
                                        id="type"
                                        className="col-span-2 h-8"
                                        {...register('docType', {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="number">
                                        Номер работника
                                    </Label>
                                    <Input
                                        id="number"
                                        className="col-span-2 h-8"
                                        {...register('employeeNumber', {
                                            required: true,
                                        })}
                                    />
                                </div>
                            </div>
                        </div>
                        <PopoverClose className="m-2">
                            <Button>Сохранить</Button>
                        </PopoverClose>
                    </form>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default UpdateTableItemForm
