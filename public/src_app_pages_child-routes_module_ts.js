(self["webpackChunkadminpro"] = self["webpackChunkadminpro"] || []).push([["src_app_pages_child-routes_module_ts"],{

/***/ 1896:
/*!***************************************!*\
  !*** ./src/app/guards/admin.guard.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminGuard": () => (/* binding */ AdminGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _services_usuario_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/usuario.service */ 5763);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 9895);



class AdminGuard {
    constructor(usuarioService, router) {
        this.usuarioService = usuarioService;
        this.router = router;
    }
    canActivate() {
        if (this.usuarioService.role === 'ADMIN_ROLE') {
            return true;
        }
        this.router.navigateByUrl('/dashboard');
        return false;
    }
}
AdminGuard.ɵfac = function AdminGuard_Factory(t) { return new (t || AdminGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_services_usuario_service__WEBPACK_IMPORTED_MODULE_0__.UsuarioService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router)); };
AdminGuard.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: AdminGuard, factory: AdminGuard.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 599:
/*!**********************************************!*\
  !*** ./src/app/pages/child-routes.module.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChildRoutesModule": () => (/* binding */ ChildRoutesModule)
/* harmony export */ });
/* harmony import */ var _pages_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pages/dashboard/dashboard.component */ 4789);
/* harmony import */ var _pages_progress_progress_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pages/progress/progress.component */ 3205);
/* harmony import */ var _pages_grafica1_grafica1_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pages/grafica1/grafica1.component */ 5906);
/* harmony import */ var _account_settings_account_settings_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./account-settings/account-settings.component */ 4411);
/* harmony import */ var _promesas_promesas_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./promesas/promesas.component */ 3414);
/* harmony import */ var _rxjs_rxjs_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rxjs/rxjs.component */ 9174);
/* harmony import */ var _perfil_perfil_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./perfil/perfil.component */ 2390);
/* harmony import */ var _mantenimientos_usuarios_usuarios_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mantenimientos/usuarios/usuarios.component */ 6987);
/* harmony import */ var _mantenimientos_hospitales_hospitales_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mantenimientos/hospitales/hospitales.component */ 5144);
/* harmony import */ var _mantenimientos_medicos_medicos_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mantenimientos/medicos/medicos.component */ 7649);
/* harmony import */ var _mantenimientos_medicos_medico_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mantenimientos/medicos/medico.component */ 4763);
/* harmony import */ var _busquedas_busquedas_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./busquedas/busquedas.component */ 7428);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _guards_admin_guard__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../guards/admin.guard */ 1896);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 7716);







// Mantenimientos









const routes = [
    {
        path: '',
        component: _pages_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_0__.DashboardComponent,
        data: {
            title: 'Dashboard'
        }
    },
    {
        path: 'progress',
        component: _pages_progress_progress_component__WEBPACK_IMPORTED_MODULE_1__.ProgressComponent,
        data: {
            title: 'Progress'
        }
    },
    {
        path: 'grafica1',
        component: _pages_grafica1_grafica1_component__WEBPACK_IMPORTED_MODULE_2__.Grafica1Component,
        data: {
            title: 'Grafica #1'
        }
    },
    {
        path: 'account-settings',
        component: _account_settings_account_settings_component__WEBPACK_IMPORTED_MODULE_3__.AccountSettingsComponent,
        data: {
            title: 'Account-settings'
        }
    },
    {
        path: 'promesas',
        component: _promesas_promesas_component__WEBPACK_IMPORTED_MODULE_4__.PromesasComponent,
        data: {
            title: 'Promesas'
        }
    },
    {
        path: 'rxjs',
        component: _rxjs_rxjs_component__WEBPACK_IMPORTED_MODULE_5__.RxjsComponent,
        data: {
            title: 'Rxjs'
        }
    },
    {
        path: 'perfil',
        component: _perfil_perfil_component__WEBPACK_IMPORTED_MODULE_6__.PerfilComponent,
        data: {
            title: 'Perfil'
        }
    },
    {
        path: 'buscar/:termino',
        component: _busquedas_busquedas_component__WEBPACK_IMPORTED_MODULE_11__.BusquedasComponent,
        data: {
            title: 'Busquedas'
        }
    },
    // Mantenimentos
    {
        path: 'usuarios',
        component: _mantenimientos_usuarios_usuarios_component__WEBPACK_IMPORTED_MODULE_7__.UsuariosComponent,
        canActivate: [_guards_admin_guard__WEBPACK_IMPORTED_MODULE_12__.AdminGuard],
        data: {
            title: 'Usuarios de la aplicacion'
        }
    },
    {
        path: 'hospitales',
        component: _mantenimientos_hospitales_hospitales_component__WEBPACK_IMPORTED_MODULE_8__.HospitalesComponent,
        data: {
            title: 'Hospitales de la aplicacion'
        }
    },
    {
        path: 'medicos',
        component: _mantenimientos_medicos_medicos_component__WEBPACK_IMPORTED_MODULE_9__.MedicosComponent,
        data: {
            title: 'Medicos de la aplicacion'
        }
    },
    {
        path: 'medico/:id',
        component: _mantenimientos_medicos_medico_component__WEBPACK_IMPORTED_MODULE_10__.MedicoComponent,
        data: {
            title: 'Perfil médico'
        }
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];
class ChildRoutesModule {
}
ChildRoutesModule.ɵfac = function ChildRoutesModule_Factory(t) { return new (t || ChildRoutesModule)(); };
ChildRoutesModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineNgModule"]({ type: ChildRoutesModule });
ChildRoutesModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterModule.forChild(routes)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsetNgModuleScope"](ChildRoutesModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterModule] }); })();


/***/ })

}]);
//# sourceMappingURL=src_app_pages_child-routes_module_ts.js.map