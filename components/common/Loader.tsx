import { Loader2 } from "lucide-react"

interface LoaderProps {
  message?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function Loader({ 
  message = "Loading...", 
  size = "md",
  className = ""
}: LoaderProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className={`${sizeClasses[size]} animate-spin text-amber-500`} />
        <p className={`text-muted-foreground ${textSizeClasses[size]}`}>
          {message}
        </p>
      </div>
    </div>
  )
}
