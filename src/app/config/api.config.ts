export class ApiConfig {
    private _url: string;
    private _token: string;
    private _endpoints: any;

    constructor(){
        this._url = 'http://localhost:3000';
        this._endpoints = {
            login: '/auth_user',
            eventos: '/eventos',
            convidados: '/convidados'
        };
    }

    set token(token: string) {
        this._token = token;
    }
    get url(): string {
        return this._url;
    }
    get endpoints(): any {
        return this._endpoints;
    }
    get token(): string {
        return this._token;
    }

}
