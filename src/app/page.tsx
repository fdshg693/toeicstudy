import Link from 'next/link';

export default function Home() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/describeImage">Describe Image</Link>
    </nav>
  );
}
