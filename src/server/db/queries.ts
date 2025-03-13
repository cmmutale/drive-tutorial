import "server-only"

import { db } from "~/server/db"
import { file_table as filesSchema, folder_table as foldersSchema } from "~/server/db/schema"
import { eq } from "drizzle-orm"

export async function getAllParentFolders(folderId: number) {
    // walk up the tree of folders until we reach the root
    const parents = [];
    let currentFolderId: number | null = folderId;

    // do this while we are not at root
    // becuase the root folder will not have a parent i.e -> null
    while (currentFolderId !== null) {
        const folder = await db.select()
            .from(foldersSchema)
            .where(eq(foldersSchema.id, currentFolderId));

        if (!folder[0]) throw new Error("Folder not found");
        // add the folder to the list
        parents.unshift(folder[0]);
        currentFolderId = folder[0]?.parent;
    }

    return parents;
}

export function getFolders(folderId: number) {
    return db
        .select()
        .from(foldersSchema)
        .where(eq(foldersSchema.parent, folderId))
}

export function getFiles(folderId: number) {
    return db
        .select()
        .from(filesSchema)
        .where(eq(filesSchema.parent, folderId))
}
