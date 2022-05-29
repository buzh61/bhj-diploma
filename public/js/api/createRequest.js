/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.responseType = 'json';

    if (options.method === 'GET') {
        let url = options.url;
        if (options.data) {
            let data = options.data;
            let arr = [];
            for (let key in data) {
                arr.push(key + '=' + data[key])
            }
            url = '?' + arr.join('&');
        }

        try {
            if (url) {
                xhr.open(options.method, url, true);
                xhr.send();
            }
        } catch (e) {
            options.callback(e);
        }

    } else {
        let formData = new FormData();

        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }

        try {
            xhr.open(options.method, options.url, true);
            xhr.send(formData);
        } catch (e) {
            options.callback(e);
        }

    }
    xhr.onreadystatechange = () => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            let err = null;
            let response = xhr.response;
            options.callback(err, response);
        }
    };

    return xhr;
};
