import React from 'react'
import { Folder as FolderIcon, FileIcon, Trash } from "lucide-react"
import type { file_table, folder_table } from '~/server/db/schema';
import Link from 'next/link';
import { deleteFile } from '~/server/actions';
import Tip from '~/components/tip';

export function FileRow(props: { file: (typeof file_table.$inferSelect) }) {
    const { file } = props;

    return (
        <li key={file.id} className="px-6 py-4 border-b border-gray-700 hover:bg-gray-750">
            <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-7 flex items-center">
                    <a
                        href={file.url}
                        target='_blank'
                        className="flex items-center text-gray-100 hover:text-blue-400">
                        <FileIcon className="mr-3" size={20} />
                        {file.name}
                    </a>
                </div>
                <div className="col-span-2 text-gray-400">
                    {"File"}
                </div>
                <div className="col-span-2 text-gray-400">{file.size}</div>
                <div className="col-span-1 text-gray-400">
                    <Tip tip='delete'>
                        <Trash
                            onClick={() => { deleteFile(file.id) }}
                            className="cursor-pointer size-5"
                            aria-label='delete file' />

                    </Tip>
                </div>
            </div>
        </li>
    )
}

export function FolderRow(props: {
    folder: (typeof folder_table.$inferSelect),
}) {
    const { folder } = props;

    return (
        <li key={folder.id} className="px-6 py-4 border-b border-gray-700 hover:bg-gray-750">
            <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-6 flex items-center">
                    <Link href={`/f/${folder.id}`}
                        className="flex items-center text-gray-100 hover:text-blue-400"
                    >
                        <FolderIcon className="mr-3" size={20} />
                        {folder.name}
                    </Link>
                </div>
                <div className="col-span-3 text-gray-400">
                </div>
                <div className="col-span-3 text-gray-400">
                </div>
            </div>
        </li>
    )
}
