import Link from 'next/link';

export default function Navbar() {
  return (
    <header className='sticky top-0 bg-background'>
      <div className='max-w-3xl mx-auto flex flex-wrap justify-between gap-3 px-3 py-4'>
        <nav className='space-x-4 font-medium'>
          <Link href='/'>home</Link>
          <Link href='/about'>about me</Link>
          <Link href='/social'>social media</Link>
        </nav>
      </div>
    </header>
  );
}