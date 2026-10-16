import { A } from '@solidjs/router';
import { For } from 'solid-js';

const items: Record<string, string> = {
  calender: '/calender',
  clock: '/',
  remainder: '/remainder',
};

export default function Navbar() {
  return (
    <footer class='w-full bottom-0 left-0 right-0 flex center fixed bg-background border-t h-10'>
      <nav class='w-full flex gap-10 center'>
        <For each={Object.entries(items)}>
          {([label, path]) => (
            <A
              href={path}
              activeClass='text-primary'
              class='text-lg'
              inactiveClass='text-inherit'
            >
              {label}
            </A>
          )}
        </For>
      </nav>
    </footer>
  );
}
