import { createSignal, createMemo, onCleanup, onMount } from "solid-js";

type DateTimeParts = Partial<Record<Intl.DateTimeFormatPartTypes, string>>;

const formatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

export default function Home() {
  const [now, setNow] = createSignal(new Date());

  onMount(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    onCleanup(() => clearInterval(interval));
  });

  const parts = createMemo<DateTimeParts>(() =>
    Object.fromEntries(
      formatter.formatToParts(now()).map(({ type, value }) => [type, value])
    )
  );

  const leftTime = createMemo(() =>
    `${parts().hour}:${parts().minute}`
  );

  const rightTime = createMemo(() =>
    `${parts().second} ${parts().dayPeriod}`
  );

  const cal = createMemo(() =>
    `${parts().weekday} ${parts().day}/${parts().month}/${parts().year}`
  );

  return (
    <>
      <h1 class="text-5xl sm:text-7xl lg:text-9xl tracking-tight text-center">
        {leftTime()}
        {leftTime() && <span class="animate-[blink_1s_steps(1)_infinite]">:</span>}
        {rightTime()}
      </h1>
      <h2 class="text-3xl sm:text-5xl lg:text-6xl tracking-tight text-center">
        {cal()}
      </h2>
    </>
  );
}
