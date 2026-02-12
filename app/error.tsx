'use client'

import { useEffect } from 'react'
import { IoIosAlert } from "react-icons/io";
import { AlertCircle, RefreshCcw, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const router = useRouter()

    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Error:', error)
    }, [error])

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                    {/* Error Icon */}
                    <div className="flex justify-center">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertCircle className="w-10 h-10 text-red-600" />
                        </div>
                    </div>

                    {/* Error Message */}
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Oops! Something went wrong
                        </h1>
                        <p className="text-gray-600">
                            We encountered an unexpected error. Don&apos;t worry, we&apos;re on it!
                        </p>
                    </div>

                    {/* Error Details (Development only) */}
                    {process.env.NODE_ENV === 'development' && (
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <p className="text-xs font-mono text-gray-700 wrap-break-words">
                                {error.message || 'Unknown error occurred'}
                            </p>
                            {error.digest && (
                                <p className="text-xs font-mono text-gray-500 mt-2">
                                    Error ID: {error.digest}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-3 pt-2">
                        <button
                            onClick={reset}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#1570EF] text-white rounded-lg hover:bg-[#1266DD] transition-colors duration-200 font-medium"
                        >
                            <RefreshCcw className="w-4 h-4" />
                            Try Again
                        </button>
                        <button
                            onClick={() => router.push('/')}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                        >
                            <Home className="w-4 h-4" />
                            Go to Dashboard
                        </button>
                    </div>

                    {/* Support Text */}
                    <div className="text-center pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                            Need help?{' '}
                            <a
                                href="mailto:support@example.com"
                                className="text-[#1570EF] hover:underline font-medium"
                            >
                                Contact Support
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
