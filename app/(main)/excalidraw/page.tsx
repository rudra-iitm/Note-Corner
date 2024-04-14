import dynamic from "next/dynamic";

const ExcalidrawWrapper = dynamic(
  async () => (await import("../../excalidrawWrapper")).default,
  {
    ssr: false,
  },
);

export default function Page() {
  return (
    <ExcalidrawWrapper />      
  );
}