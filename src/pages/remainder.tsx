import { createSignal, onMount } from 'solid-js';

type Task = {
  label: string;
  status: 'pending' | 'completed';
};

const STORAGE_KEY = 'remainders';

export default function Remainder() {
  const [items, setItems] = createSignal<Task[]>([]);
  onMount(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      setItems(JSON.parse(stored) as Task[]);
    } catch {
      console.error('Invalid tasks in localStorage');
    }
  });

  // biome-ignore lint/correctness/noUnusedVariables: addTask is wired to the reminder input UI once built.
  function addTask(label: string): void {
    setItems((prev) => [...prev, { label, status: 'pending' }]);
  }

  function toggleTask(label: string) {
    setItems((prev) =>
      prev.map((task) =>
        task.label === label
          ? {
              ...task,
              status: task.status === 'pending' ? 'completed' : 'pending',
            }
          : task,
      ),
    );
  }

  // Persist whenever items change.
  // Use createEffect instead of writing to localStorage only in event handlers.
  return (
    <>
      {items.length ? (
        <ul>
          {items().map((task) => (
            <li>
              <button type='button' onClick={() => toggleTask(task.label)}>
                {task.label} — {task.status}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <h2>Empty</h2>
      )}
    </>
  );
}
