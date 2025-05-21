"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
    images: string[];
};

export default function RandomImage({ images }: Props) {
    const [current, setCurrent] = useState<number>(
        Math.floor(Math.random() * images.length)
    );

    const handleNext = () => {
        let next = Math.floor(Math.random() * images.length);
        // 前回と同じ画像が出ないように
        if (images.length > 1) {
            while (next === current) {
                next = Math.floor(Math.random() * images.length);
            }
        }
        setCurrent(next);
    };

    return (
        <div className="text-center">
            <div className="mb-4">
                <Image
                    src={images[current]}
                    width={600}
                    height={400}
                    alt={`Random ${current}`}
                    className="rounded-xl shadow-lg"
                />
            </div>
            <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                次の画像
            </button>
        </div>
    );
}
