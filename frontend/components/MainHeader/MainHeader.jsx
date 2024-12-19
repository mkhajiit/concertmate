import React from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation/Navigation';

function MainHeader() {
  return (
    <header>
      <Link href='/'>Concert Mate</Link>
      <Navigation />
    </header>
  );
}

export default MainHeader;
