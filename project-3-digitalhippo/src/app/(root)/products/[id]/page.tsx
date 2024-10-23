export default function Page({searchParams}: {searchParams: {id: string}}) {

  const {id} = searchParams

  if (!id) return <></>

  return (
    <div></div>
  );
}