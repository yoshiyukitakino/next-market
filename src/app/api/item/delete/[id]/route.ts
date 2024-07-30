import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/app/utils/database';
import { ItemModel } from '@/app/utils/schemaModels';

interface Item {
    message: string;
}

export async function DELETE(request: NextRequest, context: any): Promise<NextResponse> {
    try {
        const id = context.params.id;
        const reqBody = await request.json()

        await connectDB();

        const singleItem = await ItemModel.findById(context.params.id)
        if (singleItem.email !== reqBody.email) {
            return NextResponse.json({ message: "他の人が作成したアイテムです" })
        }

        await ItemModel.deleteOne({ _id: id });
        return NextResponse.json<Item>({ message: 'Delete Item' });
    } catch (err) {
        console.log(err);
        return NextResponse.json<Item>({ message: 'Fail Delete Item' });
    }
}


