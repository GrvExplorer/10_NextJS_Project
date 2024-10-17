export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <section className="max-w-6xl mx-auto w-full my-8 px-4">
      {children}
    </section>
  );
}