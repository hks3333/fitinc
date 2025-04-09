"use client"

import { ModeToggle } from "./modeToggle"
import { Button } from "./ui/button"

export function Header() {
    return (
        <div className="h-[8vh] min-h-[60px] w-full min-w-[500px] rounded-xl bg-white px-2 sm:px-3 md:px-4 lg:px-6 xl:px-7 flex items-center justify-between">
            <h1 className="text-2xl">Welcome Back, John Doe</h1>
            <ModeToggle />
            <Button className="bg-blue-500 rounded-full h-10 w-10 cursor-pointer">G</Button>
        </div>
    )
}
