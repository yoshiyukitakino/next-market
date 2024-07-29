import Image from "next/image";
import Link from "next/link";

const READONE_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/item/readone`;
const getReadOne = async (id: string) => {
    const response = await fetch(`${READONE_API_URL}/${id}`, { cache: "no-store" })
    const jsonData = await response.json()
    console.log(jsonData);
    const item = jsonData.item
    return item
}


const ReadOnePage = async (context) => {
    const id = context.params.id;
    const item = await getReadOne(id);
    return (
        <div className="grid-container-si">
            <Image src={item?.image} width={750} height={500} alt="item-image" priority />
            <div key={item._id}>
                <h2>¥{item.price}</h2>
                <h3>{item.title}</h3>
                <p>{item.description.substring(0, 80)}...</p>
                <Link href={'/item/update/' + item._id}>変更</Link>
                <Link href={'/item/delete/' + item._id}>削除</Link>
            </div>
        </div>
    );
}

export default ReadOnePage;