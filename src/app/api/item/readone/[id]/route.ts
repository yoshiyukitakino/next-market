import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/app/utils/database';
import { ItemModel } from '@/app/utils/schemaModels';

export async function GET(request: NextRequest, context: any) {
    try {
        const id = context.params.id;
        console.log(id)
        await connectDB();
        const item = await ItemModel.findById(id);
        return NextResponse.json({ message: 'Read one Item', item: item });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            message: 'Fail Read one Item'
        });
    }
}


