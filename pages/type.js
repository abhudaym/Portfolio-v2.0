import { useRef, useState } from "react";
import Head from "next/head";
import { SITE } from "../lib/site";
import { track } from "../lib/track";

// The one toy on the site: type the sentence, compare with my best.
export default function Type() {
  const target = SITE.typingChallenge;
  const [typed, setTyped] = useState("");
  const [wpm, setWpm] = useState(null);
  const start = useRef(null);
  const input = useRef(null);

  const onChange = (e) => {
    if (wpm !== null) return;
    const v = e.target.value.slice(0, target.length);
    if (!start.current && v.length) start.current = performance.now();
    setTyped(v);
    if (v === target) {
      const minutes = (performance.now() - start.current) / 60000;
      const result = Math.round(target.length / 5 / minutes);
      setWpm(result);
      track("typing_done", { wpm: result });
    }
  };
  const reset = () => { start.current = null; setTyped(""); setWpm(null); if (input.current) input.current.focus(); };
  const errors = [...typed].filter((c, i) => c !== target[i]).length;

  return (
    <>
      <Head><title>Typing test - Abhuday Mishra</title></Head>
      <div className="tw">
        <p><b className="accent">TYPING TEST</b><br />My best is {SITE.bestWpm} words a minute. Click the sentence, type it exactly, and see where you land.</p>
        <div className="sheet">
          <p className="txt" aria-hidden="true">
            {[...target].map((c, i) => (
              <span key={i} className={i < typed.length ? (typed[i] === c ? "ok" : "bad") : i === typed.length && wpm === null ? "cur" : undefined}>{c}</span>
            ))}
          </p>
          <input ref={input} value={typed} onChange={onChange} disabled={wpm !== null} aria-label={"Type this sentence: " + target} autoCapitalize="off" autoCorrect="off" autoComplete="off" spellCheck={false} />
        </div>
        <p aria-live="polite">
          {wpm === null
            ? typed.length === 0 ? "The clock starts on your first key." : errors > 0 ? "There is a mistake back there. Backspace and fix it." : "Keep going."
            : wpm >= SITE.bestWpm
              ? "You: " + wpm + " WPM. Me: " + SITE.bestWpm + ". You win. Email me, I want a rematch."
              : "You: " + wpm + " WPM. Me: " + SITE.bestWpm + ". Close, but the record stands."}
        </p>
        {wpm !== null && <button type="button" onClick={reset}>Try again</button>}
      </div>
    </>
  );
}
