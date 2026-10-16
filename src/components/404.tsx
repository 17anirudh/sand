import '@/styles/index.css';
import { A } from '@solidjs/router';

export default function NotFound() {
  return (
    <main class='inset-0 z-40 absolute h-screen w-screen bg-background flex flex-col center text-3xl'>
      <h1>Page not found ;(</h1>
      <A href='/'>Go Back</A>
    </main>
  );
}
