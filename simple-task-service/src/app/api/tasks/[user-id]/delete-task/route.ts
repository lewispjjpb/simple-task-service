import { NextRequest, NextResponse } from 'next/server';
import { MongoQueryClass } from '@/app/lib/MongoQueryClass';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { 'user-id': string } }
) {
  try {
    const body = await request.json();
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

    const taskId = body;
    if (!taskId) {
      return NextResponse.json(
        { message: 'taskId not found' },
        { status: 400 }
      );
    }

    const mongoQuery = new MongoQueryClass();
    const deletedTask = await mongoQuery.deleteTask(taskId);
    if (!deletedTask) {
      return NextResponse.json(
        { message: 'task not deleted' },
        { status: 500 }
      );
    }
    return NextResponse.json({ status: 204 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: 'error deleting task' },
      { status: 500 }
    );
  }
}
