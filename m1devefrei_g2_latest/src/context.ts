import { TrackAPI } from "./datasources/TrackAPI"
import { GhibliApi } from "./datasources/GhibliApi"

export type DataSourceContext = {
  dataSources: {
    trackAPI: TrackAPI
    ghibliapi: GhibliApi
  }
}