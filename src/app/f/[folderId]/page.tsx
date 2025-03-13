import { db } from "~/server/db"
import { files as filesSchema, folders as foldersSchema } from "~/server/db/schema"
import DriveContents from "~/app/drive-content"
import { z } from "zod"
import { eq } from "drizzle-orm"

export default async function GoogleDriveClone(props:
    { params: Promise<{ folderId: string }> }) {
    const params = await props.params

    const parsedFolderId = parseInt(params.folderId)
    if (isNaN(parsedFolderId)) {
        return <div>Invalid folder id</div>
    }

    const folders = await db.select().from(foldersSchema).where(eq(foldersSchema.parent, parsedFolderId))
    const files = await db.select().from(filesSchema).where(eq(filesSchema.parent, parsedFolderId))

    return (
        <div>
            <DriveContents files={files} folders={folders} />
        </div>
    )
}

