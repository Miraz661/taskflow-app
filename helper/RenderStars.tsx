import { FaStar } from "react-icons/fa";

export const RenderStars = (value: number) =>
    Array.from({ length: 5 }, (_, index) => {
        const fill = Math.max(0, Math.min(1, value - index));
        const width = `${Math.round(fill * 100)}%`;

        return (
            <span key={index} className="relative inline-block text-gray-300">
                <FaStar className="h-4 w-4" />
                <span
                    className="absolute left-0 top-0 overflow-hidden text-yellow-500"
                    style={{ width }}
                >
                    <FaStar className="h-4 w-4" />
                </span>
            </span>
        );
    });