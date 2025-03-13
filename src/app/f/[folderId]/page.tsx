import { db } from "~/server/db"
import { files as filesSchema, folders as foldersSchema } from "~/server/db/schema"
import DriveContents from "~/app/drive-content"
import { eq } from "drizzle-orm"

async function getAllParentFolders(folderId: number) {
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

export default async function GoogleDriveClone(props:
    { params: Promise<{ folderId: string }> }) {
    const params = await props.params

    const parsedFolderId = parseInt(params.folderId)
    if (isNaN(parsedFolderId)) {
        return <div>Invalid folder id</div>
    }

    const foldersPromise = db
        .select()
        .from(foldersSchema)
        .where(eq(foldersSchema.parent, parsedFolderId))

    const filesPromise = db
        .select()
        .from(filesSchema)
        .where(eq(filesSchema.parent, parsedFolderId))

    const parentsPromise = getAllParentFolders(parsedFolderId);


    // fetch at once
    const [folders, files, parents] = await Promise.all([
        foldersPromise,
        filesPromise,
        parentsPromise]);

    return (
        <div>
            <DriveContents files={files} folders={folders} parents={parents} />
        </div>
    )
}

