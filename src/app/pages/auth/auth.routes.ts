import { Routes } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";

export const AUTH_ROUTES: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];