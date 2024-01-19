import { Injectable } from "@nestjs/common"
import * as moment from "moment"
import * as GoogleLocations from "google-locations"
import { IAppLocation } from "src/interfaces"

@Injectable()
export class GoogleLocationsService {

	locations: GoogleLocations

	constructor() {
		this.locations = new GoogleLocations("API_KEY")
	}

	getAllLocations = (): Promise<IAppLocation[]> => {
		const pins = [
			{
				"name": "Gateway of India",
				"latitude": 18.922,
				"longitude": 72.8347
			},
			{
				"name": "Chhatrapati Shivaji Terminus (CST)",
				"latitude": 18.94,
				"longitude": 72.8353
			},
			{
				"name": "Marine Drive",
				"latitude": 18.944,
				"longitude": 72.8238
			},
			{
				"name": "Bandra-Worli Sea Link",
				"latitude": 19.0407,
				"longitude": 72.8212
			},
			{
				"name": "Juhu Beach",
				"latitude": 19.0887,
				"longitude": 72.8273
			},
			{
				"name": "Elephanta Caves",
				"latitude": 18.9637,
				"longitude": 72.9311
			},
			{
				"name": "Siddhivinayak Temple",
				"latitude": 19.0076,
				"longitude": 72.8276
			},
			{
				"name": "Haji Ali Dargah",
				"latitude": 18.9822,
				"longitude": 72.809
			},
			{
				"name": "Sanjay Gandhi National Park",
				"latitude": 19.2147,
				"longitude": 72.9171
			},
			{
				"name": "Red Carpet Wax Museum",
				"latitude": 19.1083,
				"longitude": 72.8258
			},
			{
				"name": "Mumbai Zoo (Veermata Jijabai Udyan)",
				"latitude": 18.9777,
				"longitude": 72.8333
			},
			{
				"name": "ISKCON Temple",
				"latitude": 19.1108,
				"longitude": 72.8286
			},
			{
				"name": "Kanheri Caves",
				"latitude": 19.2094,
				"longitude": 72.9066
			},
			{
				"name": "Mahalaxmi Temple",
				"latitude": 18.9826,
				"longitude": 72.8098
			},
			{
				"name": "Mumbadevi Temple",
				"latitude": 18.9476,
				"longitude": 72.8326
			},
			{
				"name": "Film City",
				"latitude": 19.1638,
				"longitude": 72.8494
			},
			{
				"name": "Nehru Science Centre",
				"latitude": 18.9766,
				"longitude": 72.8102
			},
			{
				"name": "Taraporewala Aquarium",
				"latitude": 18.9506,
				"longitude": 72.8172
			},
			{
				"name": "Maharashtra Nature Park",
				"latitude": 19.0368,
				"longitude": 72.8407
			},
			{
				"name": "Aksa Beach",
				"latitude": 19.1755,
				"longitude": 72.7925
			},
			{
				"name": "Bandra Fort",
				"latitude": 19.0436,
				"longitude": 72.8201
			},
			{
				"name": "Hanging Gardens",
				"latitude": 18.9562,
				"longitude": 72.8053
			},
			{
				"name": "Colaba Causeway",
				"latitude": 18.9067,
				"longitude": 72.8155
			},
			{
				"name": "Mumbai High Court",
				"latitude": 18.9276,
				"longitude": 72.8323
			},
			{
				"name": "Flora Fountain",
				"latitude": 18.9336,
				"longitude": 72.8331
			},
			{
				"name": "Versova Beach",
				"latitude": 19.1314,
				"longitude": 72.8135
			},
			{
				"name": "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya",
				"latitude": 18.9269,
				"longitude": 72.8325
			},
			{
				"name": "Prithvi Theatre",
				"latitude": 19.1063,
				"longitude": 72.8257
			},
			{
				"name": "Global Vipassana Pagoda",
				"latitude": 19.2276,
				"longitude": 72.8759
			},
			{
				"name": "Dr. Bhau Daji Lad Museum",
				"latitude": 18.9793,
				"longitude": 72.8341
			}
		]
		return Promise.resolve(pins.map(pin => ({ ...pin, mapPin: null })))
	}

	search(query: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.locations.autocomplete({ input: query }, (err, response) => {
				if (err) {
					reject(err)
				}
				resolve(response.predictions)
			})
		})
	}

	getDetails(placeId: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.locations.details({ placeid: placeId }, (err, response) => {
				if (err) {
					reject(err)
				}
				resolve(response.result)
			})
		})
	}

	getPhoto(photoReference: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.locations.photo({ photoreference: photoReference, maxwidth: 400 }, (err, response) => {
				if (err) {
					reject(err)
				}
				resolve(response)
			})
		})
	}

	getNearbySearch(query: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.locations.search({ keyword: query, rankby: "distance" }, (err, response) => {
				if (err) {
					reject(err)
				}
				resolve(response.results)
			})
		})
	}

	getNearbySearchByType(query: string, type: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.locations.search({ keyword: query, type, rankby: "distance" }, (err, response) => {
				if (err) {
					reject(err)
				}
				resolve(response.results)
			})
		})
	}

	getNearbySearchByTypeAndRadius(query: string, type: string, radius: number): Promise<any> {
		return new Promise((resolve, reject) => {
			this.locations.search({ keyword: query, type, radius }, (err, response) => {
				if (err) {
					reject(err)
				}
				resolve(response.results)
			})
		})
	}

	getNearbySearchByTypeAndLocation(query: string, type: string, location: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.locations.search({ keyword: query, type, location }, (err, response) => {
				if (err) {
					reject(err)
				}
				resolve(response.results)
			})
		})
	}

	getNearbySearchByTypeAndLocationAndRadius(query: string, type: string, location: string, radius: number): Promise<any> {
		return new Promise((resolve, reject) => {
			this.locations.search({ keyword: query, type, location, radius }, (err, response) => {
				if (err) {
					reject(err)
				}
				resolve(response.results)
			})
		})
	}
}