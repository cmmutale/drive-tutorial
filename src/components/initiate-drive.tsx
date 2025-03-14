import React from 'react'
import { Button } from './ui/button'
import { auth } from '@clerk/nextjs/server'
import { db } from '~/server/db'
import { folder_table } from '~/server/db/schema'
import { revalidatePath } from 'next/cache'

export default function InitiateDrive() {
    return (
        <div>
            <form action={async () => {
                "use server"
                const user = await auth();
                if (!user.userId) throw new Error("User not found!");

                const rootFolder = await db
                    .insert(folder_table)
                    .values({
                        name: "root",
                        ownerId: user.userId,
                        parent: null,
                    }).$returningId();
                revalidatePath("/drive")
            }}>

                <Button
                    type='submit'
                    className='uppercase'>Get started</Button>
            </form>
        </div>
    )
}
