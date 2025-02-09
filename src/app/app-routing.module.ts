import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberComponent } from './member/member.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { ToolsComponent } from './tools/tools.component';
import { ArticlesComponent } from './articles/articles.component';
import { LoginComponent } from './login/login.component';
import { ToolsFormComponent } from './tools-form/tools-form.component';
import { ArticlesFormComponent } from './articles-form/articles-form.component';
import { CreateEtudiantComponent } from './create-etudiant/create-etudiant.component';
import { FormEtdComponent } from './form-etd/form-etd.component';
import { HomeComponent } from './home/home.component';
import { PublicationComponent } from './publication/publication.component';
import { MembresVisitComponent } from './membres-visit/membres-visit.component';
import { EventVisitComponent } from './event-visit/event-visit.component';

const routes: Routes = [
  { 
    path: 'tools/new', 
    component: ToolsFormComponent
  },
  { 
    path: 'tools/edit/:id',
    component: ToolsFormComponent 
  },
  { path: 'eventvisit', component: EventVisitComponent},
  { path: 'membervisit', component: MembresVisitComponent },
  { path: 'publications', component: PublicationComponent },
  { path: 'create-etudiant', component: FormEtdComponent},
  {
    path:'dashboard',
    pathMatch:"full",
    component:DashboardComponent
  },
  {
    path:'member',
    pathMatch:"full",
    component:MemberComponent
  },
  {
    path:'events',
    pathMatch:"full",
    component:EventsComponent
  },
  {
    path:'tools',
    pathMatch:"full",
    component:ToolsComponent
  },
  {
    path:'articles',
    pathMatch:"full",
    component:ArticlesComponent
  },
  {
    path:'create',
    pathMatch:"full",
    component:MemberFormComponent
  },
  { path: 'etudiants/:id/edit', component: FormEtdComponent },
  { path: 'enseignants/:id/edit', component: MemberFormComponent },
 
  {
    path : 'create_tool',
    pathMatch : 'full',
    component:ToolsFormComponent
  },
  {
    path : 'create_article',
    pathMatch : 'full',
    component:ArticlesFormComponent
  },
  {
    path:'login',
    pathMatch:"full",
    component:LoginComponent
  },

  {
    path:'',
    pathMatch:"full",
    component:HomeComponent
  },

  
{
  path : ':id/edit_tool',
  pathMatch : 'full',
  component:ToolsFormComponent
},
{
  path : ':id/edit_article',
  pathMatch : 'full',
  component:ArticlesFormComponent
},

  {
    path:'**',
    component:MemberComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
