const GLOBALS = {
    // Key for various item stored in local storage
    localStorage: {
        userToken: 'userToken',
        rememberMe: 'rememberMe',
    },

    roles: {
        user: 'ROLE_USER',
        admin: 'ROLE_ADMIN',
    },

    routes: {
        // ==== AUTH PAGES ====
        login: () => 'login',
        register: () => 'register',
        passwordForgotten: () => 'password-recovery',

        // ==== WITHOUT REQUIRED LOGIN ====
        home: () => '/',
        estate: (id: number) => `estates/${id}`,

        // ---- HEADER ----
        search: () => 'search',
        sell: () => 'sell',
        about: () => 'about',

        // ==== WITH REQUIRED LOGIN ====
    },

    apiRootPath: process.env.REACT_APP_API_ROOT,

    // All routes that we can call
    apiRoutes: {},
};

export default GLOBALS;
