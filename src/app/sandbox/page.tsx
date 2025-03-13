import React from 'react'
import { db } from '~/server/db'
import { mockFolders, mockFiles } from '~/lib/mock-data'
import { files, folders } from '~/server/db/schema'

export default function page() {
    return (
        <div>
            <h1>Seed function</h1>

            <form action={
                async () => {
                    "use server"
                    console.log("seeding...")
                    const folderInsert = await db.insert(folders).values(mockFolders.map((folder, index) => ({
                        id: index + 1,
                        name: folder.name,
                        type: folder.type,
                        parent: index !== 0 ? 1 : null
                    })));
                    const fileInsert = await db.insert(files).values(mockFiles.map((file, index) => ({
                        id: index + 1,
                        name: file.name,
                        type: file.type,
                        size: 5000,
                        url: file.url,
                        parent: (index % 3) + 1,
                    })));

                    console.log("folderInsert", folderInsert);
                    console.log("fileInsert", fileInsert);
                }}>
                <button type='submit'>Seed</button>

            </form>
        </div>
    )
}
