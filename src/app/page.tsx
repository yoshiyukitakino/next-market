import Image from "next/image";
import Link from "next/link";

const READALL_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/item/readall`;
const getAllItems = async () => {
  const response = await fetch(READALL_API_URL, { cache: "no-store" })
  const jsonData = await response.json()
  const allItems = jsonData.allItems
  //  console.log(allItems);
  return allItems
}

const ReadAllItems = async () => {
  console.log();
  const allItems = await getAllItems();

  return (
    <div className="grid-container-in">

      {allItems.map((item: any) =>
        <Link href={`/item/readOne/${item._id}`} key={item._id}>
          <Image src={item?.image} width={750} height={500} alt="item-image" priority />

          <div key={item._id}>
            <h2>¥{item.price}</h2>
            <h3>{item.title}</h3>
            <p>{item.description.substring(0, 80)}...</p>
          </div>
        </Link>
      )}
    </div>

  );
}

export default ReadAllItems;