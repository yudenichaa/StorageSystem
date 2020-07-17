import simpleRestProvider from 'ra-data-simple-rest';
import config from "../config";

const apiUrl = `http://${config.ip}:${config.serverPort}/api`;
const restProvider = simpleRestProvider(apiUrl);

const dataProvider = {
    ...restProvider,
    create: (resource, params) => {
        const formData = new FormData();
        for (const key in params.data) {
            if (key == 'creationDate') {
                let date = new Date(params.data[key]);
                date.setHours(0, 0, 0, 0);
                formData.append(key, date.toDateString());
            }
            else if (key == 'file') formData.append(key, params.data[key].rawFile, params.data[key].rawFile.name);
            else if (key == 'authors') formData.append(key, JSON.stringify(params.data[key]));
            else if (key == 'subdivisions') formData.append(key, JSON.stringify(params.data[key]));
            else formData.append(key, params.data[key]);
        }
        return fetch(`${apiUrl}/${resource}`,
            {
                method: 'POST',
                body: formData
            })
            .then(({ json }) => ({
                data: { ...params.data, id: json.id },
            }));
    },
    update: (resource, params) => {
        const formData = new FormData();
        for (const key in params.data) {
            if (key == 'creationDate') {
                let date = new Date(params.data[key]);
                date.setHours(0, 0, 0, 0);
                formData.append(key, date.toDateString());
            }
            else if (key == 'file') formData.append(key, params.data[key].url);
            else if (key == 'newfile' && params.data[key]) formData.append(key, params.data[key].rawFile, params.data[key].rawFile.name);
            else if (key == 'authors') formData.append(key, JSON.stringify(params.data[key]));
            else if (key == 'subdivisions') formData.append(key, JSON.stringify(params.data[key]));
            else formData.append(key, params.data[key]);
        }
        return fetch(`${apiUrl}/${resource}/${params.id}`,
            {
                method: 'PUT',
                body: formData
            })
            .then(({ json }) => ({
                data: json
            }));
    },
    getMany: (resource, params) => {
        const formData = new FormData();
        formData.append('ids', JSON.stringify(params.ids));
        const path = `${apiUrl}/${resource}/many`;
        return fetch(path, {
            method: 'POST',
            body: formData
        })
            .then(data => data.json())
            .then(json => ({ data: json }));
    },
};

export default dataProvider;