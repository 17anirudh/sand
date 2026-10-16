import { type Component, Suspense } from 'solid-js';
import Navbar from '@/components/navbar';

export const App: Component<Child> = (props) => {
  return (
    <>
      <main class='w-full min-h-screen flex flex-col center gap-4'>
        <Suspense>{props.children}</Suspense>
      </main>
      <Navbar />
    </>
  );
};
