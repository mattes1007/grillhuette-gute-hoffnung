type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  text?: string;
};

export function SectionHeading({ eyebrow, title, text }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black uppercase tracking-[0.28em] text-amber-300">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">{title}</h2>
      {text ? <p className="mt-5 text-lg leading-8 text-stone-300">{text}</p> : null}
    </div>
  );
}
