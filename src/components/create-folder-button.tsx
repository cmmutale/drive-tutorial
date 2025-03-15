import React from 'react'
import { Button } from './ui/button'
import { Form, FormField } from './ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './ui/input'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogTrigger } from './ui/alert-dialog'
import { createFolder } from '~/server/actions'
import { useRouter } from "next/navigation"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
})

export default function CreateFolderButton(props: { parentId: number }) {
    const navigation = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // do somethign with form values
        createFolder(values.name, props.parentId).then((res) => {
            if (res.error) {
                console.log(res.error)
            } else {
                console.log(res.success)
            }
        })

        // navigation.refresh();
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>New Folder</AlertDialogTrigger>
            <AlertDialogContent>
                <div>
                    <Form {...form}>
                        <form
                            className='space-y-4'
                            onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <Input
                                        placeholder='Folder Name'
                                        {...field}
                                    />
                                )}
                            />
                            <AlertDialogAction asChild>
                                <Button type='submit'>Create</Button>
                            </AlertDialogAction>
                        </form>
                    </Form>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}
