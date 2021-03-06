export default function initLocalStorage(username: any, type: any = '') {
    if (localStorage.getItem('@pogu : username') === null) {
        const arrSaveUser = ['trick2g', 'xQcOW', 'athnessa'];
        const saveUsername = localStorage.setItem(
            '@pogu : username',
            JSON.stringify(arrSaveUser),
        );
    }

    let localArrSavedUser: any = localStorage.getItem('@pogu : username');
    let ArrSavedUser: Array<any> = JSON.parse(localArrSavedUser);
    if (type === 'delete') {
        console.log('delete')
    } else {
        if (ArrSavedUser.includes(username)) {
            return
        }
        let newArrSavedUser = [...ArrSavedUser, username];
        localStorage.setItem(
            '@pogu : username',
            JSON.stringify(newArrSavedUser),
        );
    }

}

export function getLocalStorage() {
    let localArrSavedUser: any = localStorage.getItem('@pogu : username');
    let ArrSavedUser: Array<any> = JSON.parse(localArrSavedUser);
    return ArrSavedUser;
}
export function setLocalStorage(name: any, value: any) {
    if (localStorage.getItem(name) !== null) {
        return
    }
    localStorage.setItem(name, JSON.stringify(value))

}
export function deleteItem(username: any) {
    let localArrSavedUser: any = localStorage.getItem('@pogu : username');
    let ArrSavedUser: Array<any> = JSON.parse(localArrSavedUser);
    var index = ArrSavedUser.indexOf(username);
    if (index > -1) {
        ArrSavedUser.splice(index, 1);
        localStorage.setItem(
            '@pogu : username',
            JSON.stringify(ArrSavedUser),
        );
    }
}