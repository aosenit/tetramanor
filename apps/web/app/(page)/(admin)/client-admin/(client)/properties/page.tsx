import { PageHeader } from "./components/PageHeader";
import { PropertyGrid } from "./components/PropertyGrid";

export default function Home() {
  return (
    <main className="min-h-screen p-6 md:p-8">
      <PageHeader
        title="Properties"
        description="Manage all your owned or rented properties in one place."
      />
      <PropertyGrid />
    </main>
  );
}
