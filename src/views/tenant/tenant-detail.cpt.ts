import {Component, OnInit, OnDestroy} from '@angular/core';
import {TenantServ} from './tenant.serv';
import {Tenant} from './tenant.model';
import {ActivatedRoute} from '@angular/router';
import {GLOBAL} from '../common/global';

@Component({
    selector: 'page.detail',
    templateUrl: 'views/tenant/tenant-detail.html',
    providers: [TenantServ]
})

export class TenantDetailCpt implements OnInit, OnDestroy {

    tenant: Tenant;
    sub: any;


    constructor(private tenantServ: TenantServ,
                private G: GLOBAL,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            let tenantId: number = +params['tenantId'];
            this.tenantServ.getTenant(tenantId).subscribe((res)=> {
                this.tenant = res.data;
            });

        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }


}