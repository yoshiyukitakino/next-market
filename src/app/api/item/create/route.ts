import { NextResponse } from 'next/server'
import connectDB from '@/app/utils/database';
import { ItemModel } from '@/app/utils/schemaModels';

interface Request {
    json: () => Promise<any>;
}

interface Item {
    message: string;
}

export async function POST(request: Request): Promise<NextResponse> {
    const reqBody = await request.json();
    try {

        await connectDB();
        await ItemModel.create(reqBody);
        return NextResponse.json<Item>({ message: 'Create Item' });
    } catch (err) {
        console.log(err);
        return NextResponse.json<Item>({ message: 'Fail Create Item' });
    }
}


