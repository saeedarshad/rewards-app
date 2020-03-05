import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/pages/user-home',
    component: FolderPage
  },
  {
    path: 'user-home',
    loadChildren: () => import('./pages/user-home/user-home.module').then( m => m.UserHomePageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./pages/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'qrcode-scan',
    loadChildren: () => import('./pages/qrcode-scan/qrcode-scan.module').then( m => m.QrcodeScanPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
