import "server-only"

import { db } from "~/server/db"
import { file_table as filesSchema, folder_table as foldersSchema } from "~/server/db/schema"
import { eq, isNull } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"

export const QUERIES = {
    getAllParentFolders: async function (folderId: number) {
        if (folderId === 0) return [];
        // walk up the tree of folders until we reach the root
        const parents = [];
        let currentFolderId: number | null = folderId;

        // do this while we are not at root
        // becuase the root folder will not have a parent i.e -> null
        while (currentFolderId !== null) {
            const folder = await db.select()
                .from(foldersSchema)
                .where(eq(foldersSchema.id, currentFolderId));

            if (!folder[0]) {
                // navigate to /f/0
                throw new Error("Folder not found");
            }
            // add the folder to the list
            parents.unshift(folder[0]);
            currentFolderId = folder[0]?.parent;
        }
        return parents;
    }
    ,
    getFolders: async function (folderId: number) {
        const userId = await auth();
        // if folder id = 0 then look for root folder
        // the root folder is one that has a parent of null
        return db
            .select()
            .from(foldersSchema)
            .where(eq(foldersSchema.parent, folderId))
    }
    ,
    getFiles: function (folderId: number) {
        return db
            .select()
            .from(filesSchema)
            .where(eq(filesSchema.parent, folderId))
    }
    ,
    getFolderById: async function (folderId: number) {
        const file = await db.select()
            .from(filesSchema)
            .where(eq(filesSchema.id, folderId));

        if (!file[0]) throw new Error("File not found");
        return file[0];
    },

    getRootFolder: async function () {
        const userId = await auth();
        const folder = await db.select()
            .from(foldersSchema)
            .where(isNull(foldersSchema.parent)
                && eq(foldersSchema.ownerId, userId.userId!))

        if (!folder[0]) return []; // throw new Error("Folder not found")
        return folder[0];
    },
}

export const MUTATIONS = {
    createFile: async function (formData: {
        file: {
            name: string;
            url: string;
            size: number;
            parent: number;
        },
        userId: string;
    }) {
        return await db.insert(filesSchema).values({
            ...formData.file,
            ownerId: formData.userId,
        });
    },
    createFolder: async function (formData: {
        folder: {
            name: string;
            parent: number;
        },
        userId: string;
    }) {
        return await db.insert(foldersSchema).values({
            ...formData.folder,
            ownerId: formData.userId,
        });
    }
}


