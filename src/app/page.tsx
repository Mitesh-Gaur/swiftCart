"use client";

import { Category } from "./components/category";

export default function Home() {
  return (
    <main>
      <div className='max-w-[1260px] mx-auto'>
        <Category />
      </div>
    </main>
  );
}
