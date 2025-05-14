export default function Show({
  when,
  children,
}: {
  when: boolean;
  children: React.ReactNode;
}) {
  return when ? children : null;
}
