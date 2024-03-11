import { GraphQLError } from "graphql";
import { getClosestColor } from "./colors.js";

const doctorsData = [
  {
    id: "1",
    name: 'Samia Mekame',
    speciality: 'OPHTALMOLOGIST',
  },
  {
    id: "2",
    name: 'Catherine Bedoy',
    speciality: 'PSYCHOLOGIST',
  },
  {
    id: "3",
    name: 'John Doe',
    speciality: 'PSYCHOLOGIST',
  },
];

export const resolvers = {
  Query: {
    doctors: (parent, args, context, info) => {
      const {specialities} = args
      return doctorsData.filter(doctor => specialities.includes(doctor.speciality))
    },
    doctor: (parent, args, context, info) => {
      const {id} = args
      return doctorsData.find(d => d.id === id)
    },
    divide: (parent, {number1, number2}, context, info) => {
      if (number2 === 0) {
        throw new GraphQLError('cannot divide by 0')
      }
      return number1 / number2
    },
    multiply: (parent, {number1, number2}, context, info) => number1 * number2,
    closestColor: (parent, {hexa}) => {
      if(!(hexa as string).match(/^#[0-9a-fA-F]{6}/)) {
        throw new GraphQLError(`${hexa} does not match a color pattern`)
      }
      return getClosestColor(hexa, ["#FF5733", "#33FF57", "#3357FF"])
    }
  },
  Doctor: {
    addresses: (parent, args, context, info) => {
      console.log(parent)
      return {streetName: `${parent.id} street`}
    }
  }
}