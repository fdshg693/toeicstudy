import RandomImage from "../components/RandomImage";
import path from "path";
import fs from "fs";

export default function Page() {
  // public/images フォルダまでの絶対パスを組み立て
  const imagesDir = path.join(process.cwd(), "public", "images");
  // 対象拡張子のみ取得
  const files = fs.readdirSync(imagesDir)
    .filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
    // 絶対パスではなく、ブラウザからアクセス可能なURLに変換
    .map((f) => `/images/${f}`);

  return (
    <main className="flex items-center justify-center min-h-screen">
      <RandomImage images={files} />
    </main>
  );
}
