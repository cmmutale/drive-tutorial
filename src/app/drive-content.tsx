"use client"

import { ChevronRight } from "lucide-react"
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import { FileRow, FolderRow } from "./_file-row"
import type { file_table, folder_table } from "~/server/db/schema"
import Link from "next/link"
import { UploadButton } from "~/components/uploadthing"
import { useRouter } from "next/navigation"
import CreateFolderButton from "~/components/create-folder-button"

export default function DriveContents(props: {
    files: (typeof file_table.$inferSelect)[];
    folders: (typeof folder_table.$inferSelect)[];
    parents: (typeof folder_table.$inferSelect)[];
    currentFolderId: number
}) {
    const navigate = useRouter();

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <Link
                            href={`/`}
                            className="text-gray-300 hover:text-white mr-2"
                        >
                            My Drive
                        </Link>
                        {props.parents.map((folder) => (
                            <div key={folder.id} className="flex items-center">
                                <ChevronRight className="mx-2 text-gray-500" size={16} />
                                <Link
                                    href={`/f/${folder.id}`}
                                    className="text-gray-300 hover:text-white"
                                >
                                    {folder.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div>
                        <header className="flex justify-end items-center p-4 gap-4 h-16">
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </header>
                    </div>
                </div>
                <div className="bg-gray-800 rounded-lg shadow-xl">
                    <div className="px-6 py-4 border-b border-gray-700">
                        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
                            <div className="col-span-6">Name</div>
                            <div className="col-span-3">Type</div>
                            <div className="col-span-3">Size</div>
                        </div>
                    </div>
                    <ul>
                        {props.folders.map((folder) => (
                            <FolderRow
                                key={folder.id}
                                folder={folder}
                            />
                        ))}

                        {props.files.map((file) => (
                            <FileRow key={file.id} file={file} />
                        ))}
                    </ul>
                </div>
                <div className="w-full flex gap-4 items-center">
                    <UploadButton
                        endpoint={`imageUploader`}
                        onClientUploadComplete={() => {
                            navigate.refresh();
                        }} input={{
                            folderId: props.currentFolderId,
                        }} />
                    <CreateFolderButton parentId={props.currentFolderId} />
                </div>
            </div>
        </div>
    )
}

