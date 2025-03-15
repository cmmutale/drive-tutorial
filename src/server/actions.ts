"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "./db";
import { file_table as filesSchema, folder_table as foldersSchema } from "./db/schema";
import { cookies } from "next/headers";
import { eq, and } from "drizzle-orm";
import { UTApi } from "uploadthing/server";

const utApi = new UTApi();

export async function deleteFile(fileId: number) {
    const session = await auth();
    if (!session.userId) return { error: "Unauthorized" }

    const [file] = await db.select()
        .from(filesSchema)
        .where(and(eq(filesSchema.id, fileId), eq(filesSchema.ownerId, session.userId)));

    if (!file) return { error: "File not found" }

    const utApiResult = await utApi.deleteFiles([file.url.replace("https://utfs.io/f/", ""),])

    console.log("utApiResult", utApiResult)

    const dbDeleteResult = await db.delete(filesSchema).where(eq(filesSchema.id, fileId))

    console.log("dbDeleteResult", dbDeleteResult)

    const c = await cookies();
    c.set("force-refresh", JSON.stringify(Math.random()));
    return { success: true }
}

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