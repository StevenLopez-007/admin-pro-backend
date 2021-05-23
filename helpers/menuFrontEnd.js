const getMenuFrontEnd = (role = 'USER_ROLE') => {
    const menu = [
        {
            title: 'Dashboard',
            icon: 'mdi mdi-gauge',
            submenu: [
                { title: 'Dashboard', url: '/dashboard' },
                { title: 'ProgressBar', url: 'progress' },
                { title: 'Grafica', url: 'grafica1' },
                { title: 'Promesas', url: 'promesas' },
                { title: 'Rxjs', url: 'rxjs' }
            ]
        },
        {
            title: 'Mantenimiento',
            icon: 'mdi mdi-folder-lock-open',
            submenu: [
                // { title: 'Usuarios', url: 'usuarios' },
                { title: 'Hospitales', url: 'hospitales' },
                { title: 'Medicos', url: 'medicos' }
            ]
        }

    ];

    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ title: 'Usuarios', url: 'usuarios' })
    }

    return menu;
}

module.exports = {
    getMenuFrontEnd
}