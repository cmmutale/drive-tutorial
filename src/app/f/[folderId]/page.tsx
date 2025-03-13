import DriveContents from "~/app/drive-content"
import { QUERIES } from "~/server/db/queries";

export default async function GoogleDriveClone(props:
    { params: Promise<{ folderId: string }> }) {
    const params = await props.params

    const parsedFolderId = parseInt(params.folderId)
    if (isNaN(parsedFolderId)) {
        return <div>Invalid folder id</div>
    }

    // fetch at once
    const [folders, files, parents] = await Promise.all([
        QUERIES.getFolders(parsedFolderId),
        QUERIES.getFiles(parsedFolderId),
        QUERIES.getAllParentFolders(parsedFolderId)]);

    return (
        <div>
            <DriveContents files={files} folders={folders} parents={parents} />
        </div>
    )
}

