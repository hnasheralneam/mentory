import UI from "./ui";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <UI id={parseInt(id)} />
  )
}
