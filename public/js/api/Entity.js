/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
    static URL = '';

    /**
     * Запрашивает с сервера список данных.
     * Это могут быть счета или доходы/расходы
     * (в зависимости от того, что наследуется от Entity)
     * */
    static list(data, callback) {
        return createRequest({
            data,
            method: 'GET',
            url: this.URL,
            responseType: 'json',
            callback
        });
    }

    /**
     * Создаёт счёт или доход/расход с помощью запроса
     * на сервер. (в зависимости от того,
     * что наследуется от Entity)
     * */
    static create(data, callback) {
        let modifiedData = Object.assign({
            method: 'PUT'
            },
            data
        );
        return createRequest({
            data: modifiedData,
            method: 'POST',
            url: this.URL,
            responseType: 'json',
            callback
        });
    }

    /**
     * Удаляет информацию о счёте или доходе/расходе
     * (в зависимости от того, что наследуется от Entity)
     * */
    static remove(data, callback) {
        let modifiedData = Object.assign({
                method: 'DELETE',
                id: id
            },
            data);
        return createRequest({
            data: modifiedData,
            method: 'POST',
            url: this.URL + '/?id=' + id,
            responseType: 'json',
            callback
        });
    }
}
