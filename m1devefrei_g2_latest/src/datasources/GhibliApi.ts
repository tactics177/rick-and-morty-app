import { RESTDataSource } from "@apollo/datasource-rest";
import { FilmModel, PeopleModel } from "../models";

export class GhibliApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://ghibliapi.dev";
    }

    getFilms() {
        return this.get<FilmModel[]>("films");
    }

    getPeople() {
        return this.get<PeopleModel[]>("people");
    }

    getPeopleByUrls(urls: string[]) {
        return urls
            .filter(url => url !== `${this.baseURL}people/`)
            .map((url) => this.get<PeopleModel>(url));
    }

    getFilmByUrls(urls: string[]) {
        return urls.map((url) => this.get<FilmModel>(url));
    }
}