// app/page.tsx
"use client";

import { useState } from "react";
import { generateProblem, Problem } from "../utils/generateProblem";

export default function Home() {
  // 現在の問題
  const [problem, setProblem] = useState<Problem>(generateProblem());
  // ユーザー入力
  const [answer, setAnswer] = useState("");
  // フィードバック
  const [feedback, setFeedback] = useState<string | null>(null);

  // 回答をチェック
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = problem.a + problem.b;
    if (parseInt(answer) === correct) {
      setFeedback("🎉 正解です！");
    } else {
      setFeedback(`❌ 不正解… 正解は ${correct} です`);
    }
  };

  // 次の問題を作る
  const nextProblem = () => {
    setProblem(generateProblem());
    setAnswer("");
    setFeedback(null);
  };

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>ランダム計算ドリル</h1>
      <p>以下の問題を解いて、答えを入力してください。</p>
      <div style={{ fontSize: 32, margin: "16px 0" }}>
        {problem.a} + {problem.b} = ?
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="答えを入力"
          required
          style={{ fontSize: 24, padding: "4px 8px", width: 120 }}
        />
        <button type="submit" style={{ fontSize: 24, marginLeft: 8 }}>
          チェック
        </button>
      </form>

      {feedback && (
        <div style={{ marginTop: 16, fontSize: 20 }}>
          {feedback}
          <button
            onClick={nextProblem}
            style={{ marginLeft: 12, fontSize: 16 }}
          >
            次の問題
          </button>
        </div>
      )}
    </main>
  );
}
