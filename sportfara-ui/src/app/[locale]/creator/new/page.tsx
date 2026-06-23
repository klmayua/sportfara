"use client";
import PageWrapper from "@/components/layout/PageWrapper";
import PageShell from "@/components/layout/PageShell";
import ContentPublisher from "@/components/creator/ContentPublisher";

export default function NewArticlePage({ params }: { params: { locale: string } }) {
  const L = params.locale as "en" | "fr";
  return (
    <PageWrapper>
      <PageShell>
        <div className="max-w-3xl space-y-6">
          <h1 className="text-2xl font-extrabold text-white">
            {L === "fr" ? "Nouvel article" : "New Article"}
          </h1>
          <ContentPublisher locale={L} />
        </div>
      </PageShell>
    </PageWrapper>
  );
}
