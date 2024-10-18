import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Task {
        id: ID!
        name: String!
        description: String
        completed: Boolean!
    }

    type TaskNotFound {
        message: String!
    }

    union TaskResult = Task | TaskNotFound

    type TaskData {
        length: Int!,
        tasks: [Task!]!
    }

    type Query {
        getAllTasks: TaskData!
        getTaskById(id: ID!): TaskResult!
    }

    type Mutation {
        createTask( name: String!, description: String, completed: Boolean!): Task
        updateTask( id: ID!, name: String, description: String, completed: Boolean ): TaskResult!
        deleteTask(id: ID!): TaskResult!
    }

`

export default typeDefs