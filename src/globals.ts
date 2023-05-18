const GLOBALS = {
    // Key for various item stored in local storage
    localStorage: {
        userToken: 'userToken',
        rememberMe: 'rememberMe',
    },

    // The roles that a user can have, useful when knowing what to display
    roles: {
        user: 'ROLE_USER',
        admin: 'ROLE_ADMIN',
    },

    // The possible urls that user can access (they are mapped to specific pages)
    routes: {
        // ==== AUTH PAGES ====
        login: () => '/login',
        register: () => '/register',
        passwordForgotten: () => '/password-recovery',

        // ==== WITHOUT REQUIRED LOGIN ====
        home: () => '/',
        estate: (id: string) => `/estates/${id}`,
        error404: () => '/error404',

        // ---- HEADER ----
        search: () => '/search',
        sell: () => '/sell',
        about: () => '/about',

        // ==== WITH REQUIRED LOGIN ====
        userProfile: (id: string) => `/users/${id}`,
        // ---- ADMIN PART ----
        adminDashboard: () => '/admin-dashboard',
    },

    // The root url of all api calls, for example : 'http://localhost:8080'
    apiRootPath: process.env.REACT_APP_API_ROOT,

    // All routes that we can call
    apiRoutes: {
        // ==== AUTH ====
        auth: () => `${GLOBALS.apiRootPath}/auth`,
        users: () => `${GLOBALS.apiRootPath}/users`,
    },

    // The local storage keys
    storageKeys: {
        token: 'token',
        tokenExpiration: 'expiration',
        rememberMe: 'rememberMe',
    },
};

export default GLOBALS;
