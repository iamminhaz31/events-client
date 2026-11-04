import PrivateRoute from "@/components/PrivateRoute";

// Private pages depend on the logged-in session, so the instant navigation
// check does not apply to them
export const instant = false;

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PrivateRoute>{children}</PrivateRoute>;
}