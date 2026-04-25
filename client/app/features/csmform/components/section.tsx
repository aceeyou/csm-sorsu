export default function Section({
  sectionName,
  children,
}: {
  sectionName?: string
  children: any
}) {
  return (
    <section className="my-1 w-full">
      <h2 className="font-medium">{sectionName}</h2>
      {children}
    </section>
  )
}
