import InitiateDrive from "~/components/initiate-drive";
import { QUERIES } from "~/server/db/queries";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function GoogleDriveClone() {
    const session = await auth();
    if (!session.userId) return redirect("/sign-in");

    const rootFolder = await QUERIES.getRootFolderForUser(session.userId);

    if (!rootFolder) {
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

    return redirect(`/f/${rootFolder.id}`)
}

