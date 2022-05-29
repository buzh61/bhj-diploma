/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
    /**
     * Запускает initAuthLinks и initToggleButton
     * */
    static init() {
        this.initAuthLinks();
        this.initToggleButton();
    }

    /**
     * Отвечает за скрытие/показа боковой колонки:
     * переключает два класса для body: sidebar-open и sidebar-collapse
     * при нажатии на кнопку .sidebar-toggle
     * */
    static initToggleButton() {
        let sidebarMini = document.querySelector('.sidebar-mini');
        let sidebarToggle = document.querySelector('.sidebar-toggle');
        sidebarToggle.onclick = (event) => {
            event.preventDefault();
            sidebarMini.classList.toggle('sidebar-open');
            sidebarMini.classList.toggle('sidebar-collapse');
        }
    }

    /**
     * При нажатии на кнопку входа, показывает окно входа
     * (через найденное в App.getModal)
     * При нажатии на кнопку регастрации показывает окно регистрации
     * При нажатии на кнопку выхода вызывает User.logout и по успешному
     * выходу устанавливает App.setState( 'init' )
     * */
    static initAuthLinks() {
        let registerBtn = document.querySelector('.menu-item_register a');
        let loginBtn = document.querySelector('.menu-item_login a');
        let logoutBtn = document.querySelector('.menu-item_logout a');
        let registerModal = App.getModal('register');
        let loginModal = App.getModal('login');

        registerBtn.onclick = (e) => {
            e.preventDefault();
            registerModal.open();
        }

        loginBtn.onclick = (e) => {
            e.preventDefault();
            loginModal.open();
        };

        logoutBtn.onclick = (e) => {
            e.preventDefault();
            User.logout({}, (err, response) => {
                    if (response && response.success) {
                        App.setState('init');
                    }
                });
        }
    }
}