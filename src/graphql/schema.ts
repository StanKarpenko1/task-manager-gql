import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Task {
        id: ID!
        name: String!
        description: String
        completed: Boolean!
    }

    type TaskData {
        length: Int!,
        tasks: [Task!]!
    }

    type Query {
        getAllTasks: TaskData!
        getTaskById(id: ID!): Task
    }

    type Mutation {
        createTask( name: String!, description: String, completed: Boolean!): Task
        updateTask( id: ID!, name: String, description: String, completed: Boolean ): Task
        deleteTask(id: ID!): Task
    }

`

export default typeDefs