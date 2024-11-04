




interface Images{
    url : string
}

export interface IArtist {
    id : string,
    name : string
    images : Images[]
}

interface Album {
    images : Images[]
}

export interface IProfile {
    display_name : string,
    images : Images[]
}
export interface ITrack {
    id : string
    name : string
    artists : IArtist[]
    album : Album
}