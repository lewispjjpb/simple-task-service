import { MongoQueryClass } from '@/app/lib/MongoQueryClass';
import { NextRequest, NextResponse } from 'next/server';
import { ITask } from '@/types/tasks';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ 'user-id': string }> }
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
    const tasksToSave: ITask = { ...body, userId: userId };
    //save tasks to mongo
    const mongoQuery = new MongoQueryClass();
    const savedTasks = await mongoQuery.saveTasks(tasksToSave, userId);
    if (savedTasks) {
      return NextResponse.json(
        { message: 'tasks saved successfully' },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ message: 'no task saved' }, { status: 500 });
    }

    //return success indicator
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: 'error saving tasks' },
      { status: 500 }
    );
  }
}
