import { Types } from 'mongoose';
import Task from '../models/taskModel';
import { GraphQLError } from 'graphql';

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

        throw new GraphQLError(e.message || 'Failed to fetch tasks'); 

      }
    },

    // get single task
    getTaskById: async (_: any, { id }  : { id: string }) => {
      try {

        if (!Types.ObjectId.isValid(id)) {
          return {
            __typename: 'TaskNotFound',
            message: `Invalid ID format.`
          };
        }

        const task = await Task.findById(id)

        if (!task) {
          return {
            __typename: 'TaskNotFound',
            message: `Task with id: ${id} not found`
          };
        }

        return {
          __typename: 'Task',
          ...task.toObject()
        };

      } catch (e: any) {

        throw new GraphQLError(e.message || `Failed to fetch task with ID: `);

      }
    },
  },

  Mutation: {

    createTask: async (_: any, { name, description, completed = false }: { name: string, description?: string, completed: boolean }) => {

      try {

        const existingTask = await Task.findOne({ name });

        if (existingTask) {

          throw new GraphQLError(`Task with the name "${name}" already exists. `);

        }

        const newTask = new Task({
          name,
          description,
          completed: false

        });

        
        const savedTask = await newTask.save();

        return savedTask

      } catch (e) {

        throw new GraphQLError(e.message || `Failed to fetch task with ID: `);

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

        if (!updateTask) { 
          
          return {
            __typename: 'TaskNotFound',
            message: `Task with id: ${id} not found`

          }
        }

        return {
          __typename: 'Task',
          ...updateTask.toObject()

        }

      } catch (e) {

        throw new GraphQLError(e.message || `Failed to fetch task with ID: `);

      }

    },

    deleteTask: async (_: any, { id }: { id: string }) => {
      try {

        const deletedtask = await Task.findByIdAndDelete(id)

        if (!deletedtask) { 
          return {
            __typename: 'TaskNotFound',
            message: `Task with id: ${id} not found`
          }
        }

        return {
          __typename: 'Task',
          ...deletedtask.toObject()

        }

      } catch (e) {

        throw new Error(` Failed to delete task: ${e.message} `)

      }

    },
  }
};

export default resolvers;
