import Task from '../models/taskModel';

const resolvers = {
  
  // ensure id is string
  Task: {
    id: (task: any) => task._id.toString() 
  },

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

        throw new Error(e.message || `Failed to fetch the tasks`)
      }
    },

    // get single task

    getTaskById: async (_: any, { id }: { id: string }) => {
      try {

        const task = await Task.findById(id)

        if (!task) { throw new Error(`task with id: ${id} not found`) }

        return task;

      } catch (e) {

        throw new Error(e.message || `Failed to fetch the task id: ${id}`)

      }
    },
  },
  Mutation: {

    createTask: async (_: any, { name, description, completed = false }: { name: string, description?: string, completed: boolean }) => {

      try {

        const newTask = new Task({
          name,
          description,
          completed: false

        });

        const savedTask = await newTask.save();

        return savedTask

      } catch (e) {

        throw new Error(`Failed to save task`);

      }
    },

    updateTask: async (
      _: any,
      { id, name, description, completed }:
        { id: string, name?: string, description?: string, completed?: boolean }) => {

      try {

        const updateTask = await Task.findByIdAndUpdate(
          id,
          {
            $set: {
              name,
              description,
              completed
            }
          },
          { new: true, runValidators: true }
        );

        if (!updateTask) { throw new Error(`Task with id: ${id} not found`) }

        return {
         
          ...updateTask.toObject()
          
        }

      } catch (e) {

        throw new Error(`Failed to update task: ${e.message}`)

      }

    },

    deleteTask: async (_: any, { id }: { id: string }) => {
      try {

        const deletedtask = await Task.findByIdAndDelete(id)

        if (!deletedtask){ throw new Error(` Task with id: ${id} not found `)}

        return deletedtask

      } catch (e) {

        throw new Error(` Failed to delete task: ${e.message} `)

      }

    },
  }
};

export default resolvers;
