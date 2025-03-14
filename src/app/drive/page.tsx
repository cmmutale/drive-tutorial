import DriveContents from "~/app/drive-content"
import InitiateDrive from "~/components/initiate-drive";
import { QUERIES } from "~/server/db/queries";

export default async function GoogleDriveClone() {
    const { id } = await QUERIES.getRootFolder();

    if (!id) {
        return (
            <div className="page-wrapper">
                <section className="wrapper container mx-auto py-12">
                    <div className="stack space-y-4">
                        <h1 className="text-3xl">Drive</h1>
                        <p>There is no root folder</p>
                        <InitiateDrive />
                    </div>
                </section>
            </div>
        )
    }

    // fetch at once
    const [folders, files, parents] = await Promise.all([
        QUERIES.getFolders(id),
        QUERIES.getFiles(id),
        QUERIES.getAllParentFolders(id)]);

    return (
        <div>
            <DriveContents
                files={files}
                folders={folders}
                parents={parents}
                currentFolderId={id} />
        </div>
    )
}

