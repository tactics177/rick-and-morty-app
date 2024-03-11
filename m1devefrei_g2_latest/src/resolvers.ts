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
    getFilms: (_, __, { dataSources }) => dataSources.ghibliapi.getFilms(),
    getPeople: (_, __, { dataSources }) => dataSources.ghibliapi.getPeople(),
  },

  Track: {
    author: (parent, _, { dataSources }) => dataSources.trackAPI.getAuthorBy(parent.authorId)
  },

  Film: {
    people: (parent, _, { dataSources }) => dataSources.ghibliapi.getPeopleByUrls(parent.people)
  },
  People: {
    eyeColor: ({ eye_color }) => eye_color,
    films: ({ films }, _, { dataSources }) => dataSources.ghibliapi.getFilmByUrls(films)
  }
};
