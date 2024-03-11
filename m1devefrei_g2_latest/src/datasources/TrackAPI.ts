import { RESTDataSource } from "@apollo/datasource-rest";
import { AuthorModel, TrackModel } from "../models.js";
import { FilmModel, PeopleModel } from "../models.js";

export class TrackAPI extends RESTDataSource {
  baseURL = "https://ghibliapi.dev/";

  // Tracks
  async getTracks() {
    return this.get<TrackModel[]>('tracks');
  }

  // Authors
  async getAuthorBy(id: string) {
    return this.get<AuthorModel>(`author/${id}`);
  }

  // Films
  async getFilms() {
    const data = await this.get<FilmModel[]>('films');
    const films = await Promise.all(data.map(film => this.getFilmById(film.id)));
    return films;
  }

  async getFilmById(id: string) {
    const data = await this.get<FilmModel>(`films/${id}`);
    if (data.people.length === 1 && data.people[0].endsWith("/people/")) {
      data.people = [];
    }
    return data;
  }

  async getFilmPeoples(uri_list: string[]) {
    return Promise.all(uri_list.map(uri => this.getFilmPeopleById(uri)));
  }

  async getFilmPeopleById(uri: string) {
    const people = await this.get<PeopleModel>(uri);
    people.eyeColor = people.eyeColor; // Assuming eye_color needs to be converted to eyeColor
    return people;
  }

  // People
  async getPeoples() {
    const data = await this.get<PeopleModel[]>('people');
    const peoples = await Promise.all(data.map(person => this.getPeopleById(person.id)));
    return peoples;
  }

  async getPeopleById(id: string) {
    const data = await this.get<PeopleModel>(`people/${id}`);
    if (data.films.length === 1 && data.films[0].endsWith("/films/")) {
      data.films = [];
    }
    data.eyeColor = data.eyeColor; // Assuming eye_color needs to be converted to eyeColor
    return data;
  }

  async getPeopleFilms(uri_list: string[]) {
    return Promise.all(uri_list.map(uri => this.getPeopleFilmById(uri)));
  }

  async getPeopleFilmById(uri: string) {
    return this.get<FilmModel>(uri);
  }
}
