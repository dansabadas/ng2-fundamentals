import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { userRoutes } from './user.routes'
import { ProfileComponent } from './profile.component'

@NgModule({
  imports: [
    CommonModule,   // this CommonModule signals a feature (or lazy loadable) module not the main app module
    RouterModule.forChild(userRoutes)
  ],
  declarations: [
    ProfileComponent
  ],
  providers: [

  ]
})
export class UserModule { }