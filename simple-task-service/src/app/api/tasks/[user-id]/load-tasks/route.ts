import { MongoQueryClass } from '@/app/lib/MongoQueryClass';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ 'user-id': string }> }
) {
  try {
    //this await is necessary to get the params
    const resolvedParams = await params;
    const userId = resolvedParams['user-id'];
    //check valid request, userId sent in url
    if (!userId) {
      return NextResponse.json(
        { message: 'userId not found' },
        { status: 400 }
      );
    }

    //get tasks from mongo
    const mongoQuery = new MongoQueryClass();
    const tasks = await mongoQuery.getTasks(userId);
    return NextResponse.json(tasks);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: 'error loading tasks' },
      { status: 500 }
    );
  }
}
