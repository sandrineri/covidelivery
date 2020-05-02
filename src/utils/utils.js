import settings from '../config/settings';

const displayIfAuthenticated = (accessToken) => {
    // si on SAIT que l'utilisateur est connecté
    return accessToken ? 'display-flex' : 'display-none';
}
const hideIfAuthenticated = (accessToken, isAuthenticated) => {
    // si on ne sait pas encore si l'utilisateur est connecté
    // ou si l'utilisateur n'est pas connecté
    return (isAuthenticated === undefined || accessToken) ? 'display-none' : 'display-flex';
}
const displayIfNotOnPage = (pathname) => {
    return window.location.pathname !== pathname ? 'display-flex' : 'display-none';
}
const displayIfSeller = (user) => {
    if (user === undefined) return 'display-none';

    return (user.nickname === settings.sellerLogin) ? 'display-flex' : 'display-none';
}
const displayIfClient = (user) => {
    if (user === undefined) return 'display-none';

    return (user.nickname !== settings.sellerLogin) ? 'display-flex' : 'display-none';
}

const isSeller = (user) => {
    if (user && user.nickname === settings.sellerLogin) return true;

    return false;
}

export {
    displayIfAuthenticated,
    hideIfAuthenticated,
    displayIfNotOnPage,
    displayIfSeller,
    displayIfClient,
    isSeller
};