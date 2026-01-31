import * as React from "react"
import { cn } from "@/lib/utils"

// Since I don't have radix-ui installed, I will implement a custom simple Tabs component
// to avoid adding more complex dependencies for now, or I can install radix-ui/react-tabs.
// Given the constraints and "first round" speed, a custom implementation is faster than debugging potential npm issues if I can't install new packages easily.
// BUT, using standard Headless UI is better.
// Actually, I'll build a complete custom Tabs component without external lib for simplicity and speed.

const Tabs = React.forwardRef(({ defaultValue, className, children, ...props }, ref) => {
    const [activeTab, setActiveTab] = React.useState(defaultValue)

    return (
        <div
            ref={ref}
            className={cn("w-full", className)}
            {...props}
            data-active-tab={activeTab}
        >
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { activeTab, setActiveTab })
                }
                return child
            })}
        </div>
    )
})
Tabs.displayName = "Tabs"

const TabsList = React.forwardRef(({ className, activeTab, setActiveTab, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
            className
        )}
        {...props}
    >
        {React.Children.map(children, child => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, { activeTab, setActiveTab })
            }
            return child
        })}
    </div>
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef(({ className, value, activeTab, setActiveTab, children, ...props }, ref) => (
    <button
        ref={ref}
        className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            activeTab === value && "bg-background text-foreground shadow-sm",
            className
        )}
        onClick={() => setActiveTab(value)}
        {...props}
    >
        {children}
    </button>
))
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef(({ className, value, activeTab, children, ...props }, ref) => {
    if (value !== activeTab) return null;
    return (
        <div
            ref={ref}
            className={cn(
                "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
