type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: Props) {
  return (
    <section className="on-media relative overflow-hidden bg-[linear-gradient(135deg,#2f2a7a_0%,#23205e_55%,#15132f_100%)]">
      <div className="pointer-events-none absolute inset-0 classroom-grid opacity-30" aria-hidden />
      <div className="container-site relative py-16 md:py-20">
        {eyebrow ? (
          <p className="font-hand text-gold text-xl font-semibold md:text-2xl">{eyebrow}</p>
        ) : null}
        <h1 className="heading-display mt-2 text-4xl font-bold md:text-5xl">{title}</h1>
        {description ? (
          <p className="text-soft mt-4 max-w-2xl text-base font-medium leading-7 md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
