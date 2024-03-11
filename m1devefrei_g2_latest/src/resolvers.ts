import { GraphQLError } from "graphql";
import { getClosestColor } from "./colors.js";
import { Resolvers } from "./types.js";

export const resolvers: Resolvers = {
  Query: {
    divide: (_, { number1, number2 }) => {
      if (number2 === 0) {
        throw new GraphQLError('Cannot divide by zero');
      }
      return number1 / number2;
    },
    multiply: (_, { number1, number2 }) => number1 * number2,
    closestColor: (_, { hexa }) => {
      if (!hexa.match(/^#[0-9a-fA-F]{6}/)) {
        throw new GraphQLError(`${hexa} does not match the color pattern`);
      }
      return getClosestColor(hexa, ["#FF5733", "#33FF57", "#3357FF"]);
    },
    getTracks: (_, __, { dataSources }) => dataSources.trackAPI.getTracks(),
    getFilm: (_, { id }, { dataSources }) => dataSources.trackAPI.getFilmById(id),
    getFilms: (_, __, { dataSources }) => dataSources.trackAPI.getFilms(),
    getPeople: (_, { id }, { dataSources }) => dataSources.trackAPI.getPeopleById(id),
    getPeoples: (_, __, { dataSources }) => dataSources.trackAPI.getPeoples()
  },
  Track: {
    author: (parent, _, { dataSources }) => dataSources.trackAPI.getAuthorBy(parent.authorId)
  },
  Film: {
    people: async (parent, _, { dataSources }) => {
      const peopleData = await dataSources.trackAPI.getFilmPeoples(parent.people);
      return peopleData;
    }
  },
  People: {
    films: async (parent, _, { dataSources }) => {
      const filmsData = await dataSources.trackAPI.getPeopleFilms(parent.films);
      return filmsData;
    }
  }
};
