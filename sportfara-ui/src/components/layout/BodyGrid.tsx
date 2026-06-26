import { type ReactNode } from "react";

interface BodyGridProps {
  left: ReactNode;
  centre: ReactNode;
  right: ReactNode;
}

export default function BodyGrid({ left, centre, right }: BodyGridProps) {
  return (
    <>
      <style>{`
        .sf-body-grid {
          display: grid;
          grid-template-columns: 170px 1fr 240px;
          min-height: calc(100vh - 140px);
          align-items: start;
        }
        .sf-body-left { border-right: 0.5px solid #374151; }
        .sf-body-centre { border-right: 0.5px solid #374151; min-width: 0; }
        .sf-body-right { min-width: 0; }
        @media (max-width: 1023px) {
          .sf-body-grid { grid-template-columns: 1fr 220px; }
          .sf-body-left { display: none; }
        }
        @media (max-width: 767px) {
          .sf-body-grid { grid-template-columns: 1fr; }
          .sf-body-right { display: none; }
        }
      `}</style>
      <div className="sf-body-grid">
        <div className="sf-body-left">{left}</div>
        <div className="sf-body-centre">{centre}</div>
        <div className="sf-body-right">{right}</div>
      </div>
    </>
  );
}
