type User = {
    _id: string,
    name: string,
    provider: string, 
    googleID?: string,
    facebookID?: string,
    githubID?: string,
    email: string,
    picture: string,
    firstLogIn?: Date,
    lastLoggedIn?: Date,
    bookmarks?: Bookmark[];
} | null;

export default User;

export interface Bookmark {
    _id?: string,
    name: string,
    country: string,
    notes?: string,
    latitude: number,
    longitude: number
}