/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
    if (options) {
        const xhr = new XMLHttpRequest();
        let formData = new FormData();
        let sendURL = options.url;
        if (options.method !== 'GET') {
            Object.entries(options.data).forEach(([key, value]) => formData.append(key, value));
        } else {
            formData = '';
            if (options.data) {
                sendURL += '?';
                let data = options.data;
                for (let key in data) {
                    sendURL += key + '=' + data[key] + '&';
                    sendURL = sendURL.slice(0, -1);
                }
            }
        }

        try {
            xhr.open(options.method, sendURL);
            xhr.send(formData);
        } catch (err) {
            options.callback(err, null);
        }
        xhr.responseType = 'json';
        xhr.onreadystatechange = () => {
            if (xhr.status === 200 && xhr.readyState === xhr.DONE) {
                options.callback(null, xhr.response);
            }
        }
    }
};
