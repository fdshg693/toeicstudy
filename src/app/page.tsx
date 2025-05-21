import Link from 'next/link';

export default function Home() {
  return (
    <nav>
      <Link href="/">Home</Link><br />
      <Link href="/describeImage">Describe Image</Link><br />
      <Link href="/admin/apiTester">API Tester</Link><br />
    </nav>
  );
}
