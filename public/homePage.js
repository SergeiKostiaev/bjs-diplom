//выход из ЛК

const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout(serverResponse => {
        if (serverResponse.success) {
            location.reload();
        }
    })
};

//инфо о пользователе 
ApiConnector.current(data => {
    if (data.success) {
        ProfileWidget.showProfile(data.data);
    }
});

//курсы валют
const ratesBoard = new RatesBoard();
function quotes() {
    ApiConnector.getStocks(data => {
        if (data.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(data.data);
        }
    })
}

quotes()
setInterval(quotes, 60000);


const moneyManager = new MoneyManager();

// Пополнить кошелёк
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Счёт успешно пополнен на ${data.amount} ${data.currency}');
        }
        else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}

// Обмен валюты
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Валюта успешно конвертирована');
        }
        else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

// Перевод средств
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Успешная транзакция!');
        }
        else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

const favoritesWidget = new FavoritesWidget();

const getFavorites = () => {
    ApiConnector.getFavorites(response => {
        if (response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    })
}

getFavorites();

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success === true) {
            getFavorites();
            favoritesWidget.setMessage(response.success, 'Пользователь добавлен в избранное!');

        }
        else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    })
}

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success === true) {
            getFavorites();
            favoritesWidget.setMessage(response.success, 'Пользователь  успешно удален!');
        }
        else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    })
}