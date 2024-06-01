import { createLazyFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useForm } from 'react-hook-form'
import { authMutation } from '@/shared/hooks/queries/authMutations'
import { useEffect, useRef, useState } from 'react'
import { Terminal } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useNavigate } from "@tanstack/react-router";

export interface IInput {
    username: string
    password: string
}

const AlertForm = () => {
    return (
        <Alert className="absolute max-w-xl top-10 right-10 animate-vanishing opacity-0">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Инвалид?</AlertTitle>
            <AlertDescription>
                Неправильный логин или пароль, попробуйте снова, шаблон - (user
                {'N'}, password)
            </AlertDescription>
        </Alert>
    )
}

const TabsForm = () => {
    const { register, handleSubmit } = useForm<IInput>()

    const signInForm = useRef<HTMLFormElement>(null)
    const signUpForm = useRef<HTMLFormElement>(null)
    const [isError, setIsError] = useState(false)

    const { mutate: authMutate } = authMutation(setIsError)
    const submitAuth = (formData: IInput) => {
        authMutate(formData)
        signInForm.current?.reset()
        signUpForm.current?.reset()
    }
    return (
        <>
            {isError && <AlertForm />}
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Регистрация</TabsTrigger>
                    <TabsTrigger value="password">Вход</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle>Регистрация</CardTitle>
                            <CardDescription>
                                Зарегистрируйте свой аккаунт, или войдите в
                                существующий
                            </CardDescription>
                        </CardHeader>
                        <form
                            ref={signUpForm}
                            onSubmit={handleSubmit(submitAuth)}
                        >
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="username1">
                                        Имя пользователя
                                    </Label>
                                    <Input
                                        id="username1"
                                        type="text"
                                        {...register('username', {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password1">Пароль</Label>
                                    <Input
                                        id="password1"
                                        type="password"
                                        {...register('password', {
                                            required: true,
                                        })}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Зарегистрироваться</Button>
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle>Вход</CardTitle>
                            <CardDescription>
                                Войдите в аккаунт или создайте новый
                            </CardDescription>
                        </CardHeader>
                        <form
                            ref={signInForm}
                            onSubmit={handleSubmit(submitAuth)}
                        >
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="current">
                                        Имя пользователя
                                    </Label>
                                    <Input
                                        id="current"
                                        type="text"
                                        {...register('username', {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="new">Пароль</Label>
                                    <Input
                                        id="new"
                                        type="password"
                                        {...register('password', {
                                            required: true,
                                        })}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Войти</Button>
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    )
}

const EntryPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('access-token')) {
            navigate({ to: '/home' })
        }
    }, []);

    return (
        <div className="flex flex-col justify-center grow  items-center ">
            <TabsForm />
        </div>
    )
}

export const Route = createLazyFileRoute('/')({
    component: EntryPage,
})
