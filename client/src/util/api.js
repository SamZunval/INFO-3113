const API_IP = 'http://localhost';
const API_PORT = 9000;

const headers = {
    // https://www.rfc-editor.org/rfc/rfc7231#section-5.3.2
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept
    'Accept': '*/*',
    // https://www.rfc-editor.org/rfc/rfc7231#section-3.1.1.5
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
    'Content-Type': 'application/json'
}

const serverRoute = (route) => `${API_IP}:${API_PORT}/${route}`;

const alerts = {
    getSearchData: async () => {
        let response = await fetch(serverRoute("alerts"), {
            headers,
            method: 'GET'
        });
        let data = await response.json();
        return data;
    },
    getCountryData: async (country_code) => {
        let response = await fetch(serverRoute("alerts/"+country_code), {
            headers,
            method: 'GET'
        });
        let data = await response.json();
        return data[0];
    }
}

const util = {
    refreshDatabase: async () => {
        let response = await fetch(serverRoute("db/refresh"), {
            headers,
            method: 'POST'
        });
        return response;
    },
    postBookmark: async (country) => {
        let response = await fetch(serverRoute("db/bookmark"), {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: 'POST',
            json: true, 
            body: JSON.stringify(country),
        });
        return response;
    },
    removeBookmark: async (country) => {
        let response = await fetch(serverRoute("db/removebookmark"), {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: 'POST',
            json: true, 
            body: JSON.stringify(country),
        });
        return response;
    },
    getBookmarks: async () => {
        let response = await fetch(serverRoute("bookmarks"), {
            headers,
            method: 'GET'
        });
        let data = await response.json();
        return data;
    },
    getBookmark: async (country_code) => {
        let response = await fetch(serverRoute("bookmarks/"+country_code), {
            headers,
            method: 'GET'
        });
        let data = await response.json();
        return data[0];
    }
}

export {
    util,
    alerts,
}