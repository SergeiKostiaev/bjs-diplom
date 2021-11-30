//выход из ЛК

const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout(callback => {
        if (callback.success) {
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
function api() {
    ApiConnector.getStocks(data => {
        if (data.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(data.data);
        }
    })
}

api()
setInterval(api, 60000);