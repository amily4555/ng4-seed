"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var tenant_serv_1 = require('./tenant.serv');
var const_1 = require('../common/const');
var name_pipe_1 = require('../common/pipe/name.pipe');
var global_1 = require('../common/global');
var TenantActivitiesCpt = (function () {
    function TenantActivitiesCpt(tenantServ, G, route, router) {
        this.tenantServ = tenantServ;
        this.G = G;
        this.route = route;
        this.router = router;
    }
    TenantActivitiesCpt.prototype.ngOnInit = function () {
        var _this = this;
        this.roots = mu.map(const_1.DICT.ROOT, function (v, k) {
            return {
                val: +k,
                title: v
            };
        }, []);
        var routeParams = this.router.routerState.parent(this.route).snapshot.params;
        this.tenantId = +routeParams.tenantId;
        this.sub = this.tenantServ.getTenantActivities({
            tenantId: this.tenantId
        }).subscribe(function (res) {
            _this.activities = res.data;
        });
    };
    TenantActivitiesCpt.prototype.changeUserStatus = function (activity, status) {
        activity.status = +status;
        activity.tenantId = this.tenantId;
        this.tenantServ.saveTenantActivity(activity).subscribe();
    };
    TenantActivitiesCpt.prototype.pending = function (activity) {
        this.changeUserStatus(activity, 3);
    };
    TenantActivitiesCpt.prototype.restore = function (activity) {
        this.changeUserStatus(activity, 2);
    };
    TenantActivitiesCpt.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    TenantActivitiesCpt = __decorate([
        core_1.Component({
            selector: 'inmain.tenant-activities',
            templateUrl: 'views/tenant/tenant-activities.html',
            pipes: [name_pipe_1.NamePipe]
        }), 
        __metadata('design:paramtypes', [tenant_serv_1.TenantServ, global_1.GLOBAL, router_1.ActivatedRoute, router_1.Router])
    ], TenantActivitiesCpt);
    return TenantActivitiesCpt;
}());
exports.TenantActivitiesCpt = TenantActivitiesCpt;
//# sourceMappingURL=tenant-activities.cpt.js.map