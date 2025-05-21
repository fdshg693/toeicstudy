import RandomImage from "../components/RandomImage";
import questionsDataRaw from "../data/questions.json";
import { QuizData } from "../types/quizData";

export default function Page() {
    // JSONファイルが{}としてimportされている場合、型アサーションで配列として扱う
    const raw = questionsDataRaw as unknown as Array<{ image: string; description: string }>;
    const quizData: QuizData[] = raw.map((item) => ({
        imagePath: item.image,
        description: item.description,
    }));

    return (
        <main className="flex items-center justify-center min-h-screen">
            <RandomImage quizData={quizData} />
        </main>
    );
}
