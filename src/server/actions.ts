"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "./db";
import { file_table as filesSchema, folder_table as foldersSchema } from "./db/schema";
import { cookies } from "next/headers";


export async function createFolder(folderName: string, parentId: number) {
    const session = await auth();
    if (!session.userId) return { error: "Unauthorized" }

    try {
        await db.insert(foldersSchema)
            .values({
                name: folderName,
                parent: parentId,
                ownerId: session.userId,
            })
        const c = await cookies();

        c.set("force-refresh", JSON.stringify(Math.random()));
        return { success: true }
    } catch (err) {
        return { error: "Error creating folder" }
    }
}