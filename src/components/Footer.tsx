import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <nav className='max-w-3xl mx-auto flex flex-wrap justify-between gap-3 px-3 py-4'>
        <Link href='/privacy'>Privacy</Link>
      </nav>
    </footer>
  );
}
