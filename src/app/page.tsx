import Link from 'next/link'
import React from 'react'
import { Button } from '~/components/ui/button'

export default function HomePage() {
    return (
        <div className='page-wrapper w-full min-h-screen grid place-content-center'>
            <section className="wrapper w-full max-w-xl">
                <div className="inner">
                    <div className="stack space-y-4 flex flex-col items-center">
                        <h1 className='text-4xl text-center'>
                            Drive Tutorial - cmmdev</h1>
                        <Link href={`/drive`}>
                            <Button className='uppercase'>Go to drive</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
