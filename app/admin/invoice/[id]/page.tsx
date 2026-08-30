import { notFound } from "next/navigation";
import InvoicePrint from "@/components/admin/InvoicePrint";

interface InvoicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function InvoicePage({
  params,
}: InvoicePageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-4xl">
        <InvoicePrint invoiceId={id} />
      </div>
    </main>
  );
}