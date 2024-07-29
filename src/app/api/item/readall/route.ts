import { NextResponse } from 'next/server'
import connectDB from '@/app/utils/database';
import { ItemModel } from '@/app/utils/schemaModels';

interface Request {
    json: () => Promise<any>;
}

interface Item {
    message: string;
    allItems: any[];
}

export async function GET(): Promise<NextResponse> {
    try {

        await connectDB();
        const allItems = await ItemModel.find();
        return NextResponse.json<Item>({ message: 'Read all Items', allItems: allItems });
    } catch (err) {
        console.log(err);
        return NextResponse.json<Item>({
            message: 'Fail Read all Items',
            allItems: []
        });
    }
}


