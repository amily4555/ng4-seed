import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AgentServ} from './agent.serv';
import {Admin} from '../admin/admin.model';
import {GLOBAL} from '../common/global';
import {ResourcePool} from '../common/resource-pool';

declare var console: any;

@Component({
    selector: 'inmain.agent-member',
    templateUrl: 'views/agent/agent-members.html'
})

export class AgentMembersCpt {
    private sub: any;
    private members: Admin[];
    private agencyId: number;

    constructor(private agentServ: AgentServ,
                private G: GLOBAL,
                private $$: ResourcePool,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        // 获得上级router 参数多艰难呀`~~
        this.agencyId = +this.router.routerState.parent(this.route).snapshot.params['agencyId'];
        this.sub = this.$$.agencies_members.get({
            agencyId: this.agencyId
        }).subscribe((res) => {
            this.members = res.data;
        });
    }

    disabled(): void {
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
