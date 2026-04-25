export default function BiologicalVoyageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen overflow-hidden" style={{ background: '#000810' }}>
      {children}
    </div>
  );
}
