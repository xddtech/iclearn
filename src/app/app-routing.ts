import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import NeuronsViewComponent from './components/neurons/neurons-view';
import AppDebugComponent from './components/debug/debug';


const routes: Routes = [
  {path: '', component: NeuronsViewComponent},
  {path: 'debug', component: AppDebugComponent},
];

@NgModule({
  // pass { enableTracing: true } as forRoot second arg for debugging
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
