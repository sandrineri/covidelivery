import settings from '../config/settings';

// si on SAIT que l'utilisateur est connecté
const displayIfAuthenticated = (accessToken) => (accessToken ? 'display-flex' : 'display-none');

// si on ne sait pas encore si l'utilisateur est connecté
// ou si l'utilisateur n'est pas connecté
const hideIfAuthenticated = (accessToken, isAuthenticated) => ((isAuthenticated === undefined || accessToken) ? 'display-none' : 'display-flex');

const displayIfNotOnPage = (pathname) => ((window.location.pathname !== pathname) ? 'display-flex' : 'display-none');

const displayIfSeller = (user) => {
    if (user === undefined) return 'display-none';

    return (user.nickname === settings.sellerLogin) ? 'display-flex' : 'display-none';
};
const displayIfClient = (user) => {
    //console.log(user);
    if (user === undefined) return 'display-none';

    return (user.nickname !== settings.sellerLogin) ? 'display-flex' : 'display-none';
};

const isSeller = (user) => {
    //console.log(user);
    if (user && user.nickname === settings.sellerLogin) return true;

    return false;
};

export {
    displayIfAuthenticated,
    hideIfAuthenticated,
    displayIfNotOnPage,
    displayIfSeller,
    displayIfClient,
    isSeller
};
