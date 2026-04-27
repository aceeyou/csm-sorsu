export default function Section({
  sectionName,
  children,
}: {
  sectionName?: string
  children: any
}) {
  return (
    <section className="mt-8 mb-2 w-full md:mt-4">
      <h2 className="font-medium">{sectionName}</h2>
      {children}
    </section>
  )
}
