import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { slugify } from "../lib/md";
import { DEMOS } from "./demos";

const text = (c) => (Array.isArray(c) ? c.map(text).join("") : typeof c === "object" && c ? text(c.props && c.props.children) : String(c ?? ""));

const Heading = (Tag) => function H({ children }) {
  const id = slugify(text(children));
  return <Tag id={id}><a href={"#" + id}>{children}</a></Tag>;
};

function Code({ lang, code }) {
  const [done, setDone] = useState(false);
  const copy = () => {
    const ok = () => { setDone(true); setTimeout(() => setDone(false), 1500); };
    try { navigator.clipboard.writeText(code).then(ok, () => {}); } catch (e) {}
  };
  return (
    <div className="code">
      <div className="bar2"><span>{lang || "code"}</span><button type="button" onClick={copy}>{done ? "Copied" : "Copy"}</button></div>
      <pre><code>{code}</code></pre>
    </div>
  );
}

export default function Markdown({ children, playbackRate }) {
  return (
    <div className="md">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        components={{
          h2: Heading("h2"),
          h3: Heading("h3"),
          pre: ({ node, children: ch }) => {
            const el = Array.isArray(ch) ? ch[0] : ch;
            const cls = (el && el.props && el.props.className) || "";
            const lang = (/language-([\w-]+)/.exec(cls) || [])[1];
            const raw = text(el && el.props && el.props.children).replace(/\n$/, "");
            if (lang === "demo") {
              const meta = node && node.children && node.children[0] && node.children[0].data && node.children[0].data.meta;
              const D = DEMOS[(meta || raw).trim()];
              return D ? <D /> : null;
            }
            return <Code lang={lang} code={raw} />;
          },
          video: ({ node, ...p }) => (
            <video {...p} controls onLoadedMetadata={playbackRate ? (e) => { e.target.playbackRate = playbackRate; } : undefined} />
          ),
          table: ({ children: ch }) => <div className="tablewrap"><table>{ch}</table></div>,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
