import { Identifiable } from "../shared/identifiable.model";

export interface Conference extends Identifiable {
    location: Location;
    speakers: Speaker[];
    logoURL?:string;
    topic: string;
    name: string;
    details: string;

}

export interface Speaker {
    name: string;
    bio?: string;
    company?:string;
}

export interface Location {
    city: string;
    country: string;
    place: string;
    gps?: GPSLocation;
}

export interface GPSLocation {
    latitude: number;
    longitude: number;
}