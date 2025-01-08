import { TodoData } from '../types/todo'

export const getTodoList = async () => {
  try {
    // Todo: improve to db
    let todo: TodoData[] = [
      {
        id: 'c4167d79-f894-4132-8335-f7f2f1429a79',
        title: 'test',
        isCompleted: false,
        createdTime: '2025-01-04T06:47:35.842Z',
        updatedTime: '2025-01-04T06:47:35.842Z',
      },
      {
        id: 'd4cb94bb-0219-4336-95b3-00672d679c01',
        title: 'test1',
        isCompleted: false,
        createdTime: '2025-01-04T06:47:38.580Z',
        updatedTime: '2025-01-04T06:47:35.842Z',
      },
      {
        id: 'db076f56-c37e-4e0a-ae1f-a6845d349439',
        title: 'test2',
        isCompleted: false,
        createdTime: '2025-01-04T06:47:40.815Z',
        updatedTime: '2025-01-04T06:47:35.842Z',
      },
    ]

    return todo
  } catch (e) {
    console.log(e)
  }
}
