import NextLink from "next/link";

// Card whose glow follows the pointer. Pass `href` for a link, otherwise renders a div.
export const track = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px");
  e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px");
};

export default function Spot({ href, className = "spot", children, ...rest }) {
  if (href) {
    return (
      <NextLink href={href} className={className} onPointerMove={track} {...rest}>
        {children}
      </NextLink>
    );
  }
  return <div className={className} onPointerMove={track} {...rest}>{children}</div>;
}
