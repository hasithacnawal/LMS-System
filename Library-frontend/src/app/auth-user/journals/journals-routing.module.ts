import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllJournalComponent } from './all-journal/all-journal.component';
import { MyJournalComponent } from './my-journal/my-journal.component';
import { PublishComponent } from './publish/publish.component';

const routes: Routes = [
  {
    path: 'all',
    component: AllJournalComponent,
  },
  {
    path: 'my',
    component: MyJournalComponent,
  },
  {
    path: 'publish',
    component: PublishComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JournalsRoutingModule {}
