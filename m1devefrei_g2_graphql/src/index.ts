import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLError } from "graphql";
import {gql} from 'graphql-tag'
import { resolvers } from "./resolvers.js";

const typeDefs = gql`
type Doctor {
  id: String
  name: String
  speciality: Speciality
  addresses: Address
}

type Address {
  streetName: String
}

enum Speciality {
  PSYCHOLOGIST
  OPHTALMOLOGIST
}

type Query {
  doctors(specialities: [Speciality!]): [Doctor]
  doctor(id: ID!): Doctor
  divide(number1: Int!, number2: Int!): Float
  multiply(number1: Int!, number2: Int!): Float
  closestColor(hexa: String!): String
}
`

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const {url} = await startStandaloneServer(server, {
  listen: {port: 4000}
})

console.log(`🚀  Server ready at: ${url}`)