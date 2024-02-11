import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from 'src/app/primeng.module';

import { ClubComponent } from './club/club.component';
import { NccNssComponent } from './ncc-nss/ncc-nss.component';
import { NptelComponent } from './nptel/nptel.component';
import { PaperComponent } from './paper/paper.component';
import { PlacementComponent } from './placement/placement.component';
import { ProjectPaperComponent } from './project-paper/project-paper.component';
import { ProjectComponent } from './project/project.component';
import { SportsComponent } from './sports/sports.component';
import { TechnoManagerialComponent } from './techno-managerial/techno-managerial.component';
import { VoluntaryComponent } from './voluntary/voluntary.component';
import { EntrepreneurshipComponent } from './entrepreneurship/entrepreneurship.component';
import { ActivityComponent } from './activity.component';
import { VacComponent } from './vac/vac.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivityRoutingModule } from './activity-routing.module';
import { GovtExamComponent } from './govt-exam/govt-exam.component';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    ActivityComponent,
    PaperComponent,
    ProjectComponent,
    ClubComponent,
    EntrepreneurshipComponent,
    TechnoManagerialComponent,
    SportsComponent,
    ProjectPaperComponent,
    NptelComponent,
    PlacementComponent,
    NccNssComponent,
    VoluntaryComponent,
    VacComponent,
    GovtExamComponent,
  ],
  imports: [
    CommonModule,
    PrimengModule,
    ActivityRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [MessageService]
})
export class ActivityModule {}
