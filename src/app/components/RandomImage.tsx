"use client";

import { useState } from "react";
import Image from "next/image";
import { QuizData } from "../types/quizData";

type Props = {
    quizData: QuizData[];
};

export default function RandomImage({ quizData }: Props) {
    const [current, setCurrent] = useState<number>(
        Math.floor(Math.random() * quizData.length)
    );
    const [answer, setAnswer] = useState<string>("");
    const [result, setResult] = useState<string>("");

    const handleNext = () => {
        let next = Math.floor(Math.random() * quizData.length);
        // 前回と同じ画像が出ないように
        if (quizData.length > 1) {
            while (next === current) {
                next = Math.floor(Math.random() * quizData.length);
            }
        }
        setCurrent(next);
        setAnswer("");
        setResult("");
    };

    const evaluateAnswer = async () => {
        const res = await fetch('/api/openai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input: "what is 1+1?" }),
        });
        const data = await res.json();
        console.log(data);
        setResult(data.result.output[0].content[0].text);
    };

    return (
        <div className="text-center">
            <div className="mb-4">
                <Image
                    src={quizData[current].imagePath}
                    width={600}
                    height={400}
                    alt={`Random ${current}`}
                    className="rounded-xl shadow-lg"
                />
            </div>
            <div>
                {quizData[current].description}
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="画像の説明を入力してください"
                    className="border border-gray-300 rounded px-4 py-2"
                />
            </div>
            <div className="mb-4">
                <button
                    onClick={evaluateAnswer}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    回答をチェック
                </button>
            </div>
            <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                次の画像
            </button>
            {result && (
                <div className="mt-4 text-lg text-green-600">
                    {result}
                </div>
            )}
        </div>
    );
}
