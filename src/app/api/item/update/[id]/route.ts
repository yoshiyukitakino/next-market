import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/utils/database';
import { ItemModel } from '@/app/utils/schemaModels';

interface Request {
    json: () => Promise<any>;
}

interface Item {
    message: string;
}

export async function PUT(request: NextRequest, context: any): Promise<NextResponse> {
    const reqBody = await request.json();
    try {
        const id = context.params.id;
        console.log("######PUT######");
        console.log(id);
        await connectDB();

        const singleItem = await ItemModel.findById(id)
        if (singleItem.email !== reqBody.email) {
            return NextResponse.json({ message: "他の人が作成したアイテムです" })
        }

        await ItemModel.updateOne({ _id: id }, reqBody);
        return NextResponse.json<Item>({ message: 'Update Item' });
    } catch (err) {
        console.log(err);
        return NextResponse.json<Item>({ message: 'Fail Update Item' });
    }
}


