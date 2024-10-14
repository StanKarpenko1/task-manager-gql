import Task from '../models/taskModel';

const resolvers = {
    Query: {
        // get all tasks
      getAllTasks: async () => {
        try {
            const tasks = await Task.find({})
            
            return { 
                length: tasks.length,   
                tasks: tasks,
            }

        } catch (e) {

            throw new Error (e.message || `Failed to fetch the tasks`)
        }
      },

        // get single task

      getTaskById: async (_: any, { id }: { id: string }) => {
        try {

            const task = await Task.findById(id)

            if (!task){ throw new Error (`task with id: ${id} not found`) }

            return task ;

        } catch (e) {
           
            throw new Error (e.message || `Failed to fetch the task id: ${id}`)

        }
      },
    },
    Mutation: {

      createTask: async (_: any, { name, description, completed = false}: { name: string, description?: string, completed: boolean }) => {
        
        try {

            const newTask = new Task ({
                name,
                description,
                completed: false

            });

            const savedTask = await newTask.save();

            return savedTask

        } catch (e) {

            throw new Error (`Failed to save task`);

        }
      },

      updateTask: async (_: any, { id, name, description, completed }: { id: string, name?: string, description?: string, completed?: boolean }) => {
        // Logic to update a task
      },
      deleteTask: async (_: any, { id }: { id: string }) => {
        

      },
    }
  };
  
  export default resolvers;
  