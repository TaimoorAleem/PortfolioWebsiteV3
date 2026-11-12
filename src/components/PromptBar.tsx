export interface Prompt {
  k: string;
  label: string;
  onClick?: () => void;
}

/** Desktop key-prompt strip (↵ Select, Esc Back...). */
export function PromptBar({ prompts }: { prompts: Prompt[] }) {
  return (
    <div className="prompt-bar">
      {prompts.map((p) => (
        <button key={p.k + p.label} type="button" className="btn-reset prompt" onClick={p.onClick}>
          <span className="prompt__key">{p.k}</span>{p.label}
        </button>
      ))}
    </div>
  );
}

/** Mobile bottom bar: a Back control on inner screens, or the © line on the home screen. */
export function MobilePromptBar({ onBack }: { onBack?: () => void }) {
  return (
    <footer className="m-footer">
      {onBack ? (
        <button type="button" className="btn-reset m-footer__back" onClick={onBack}>
          <span className="prompt__chev" aria-hidden />Back
        </button>
      ) : (
        <span className="m-footer__copy">© 2026</span>
      )}
    </footer>
  );
}
