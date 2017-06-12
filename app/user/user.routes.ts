import { ProfileComponent } from './profile.component'
import { LoginComponent} from './login.component';

export const userRoutes = [
  { path: 'profile', component: ProfileComponent },  // this path will be relative to the parent route 'user' !
  { path: 'login', component: LoginComponent } 
]