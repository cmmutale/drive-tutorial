import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "~/components/ui/tooltip"

export default function Tip(props: { tip: string, children: React.ReactNode }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {props.children}
                </TooltipTrigger>
                <TooltipContent>
                    <p>{props.tip}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
