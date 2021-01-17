import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import {A11yModule} from '@angular/cdk/a11y';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { BannerComponent } from './components/banner/banner.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {EncryptService} from './service/encrypt.service';
import {UserService} from './service/user.service';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from './service/auth.service';
import {AuthGuardService} from './service/auth-guard.service';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import {ImageService} from './service/image.service';
import { ImagePreviewComponent } from './components/image-preview/image-preview.component';
import {AuthAdminService} from './service/auth-admin.service';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {CommentService} from './service/comment.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {NotificationService} from './service/notification.service';

const appRoutes: Routes = [
  {path: '',   redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LandingPageComponent},
  {path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuardService, AuthAdminService]},
  {path: 'dashboard/:id', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404'}
  ];

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    BannerComponent,
    LoginComponent,
    RegistrationComponent,
    MessageDialogComponent,
    DashboardComponent,
    AdminDashboardComponent,
    PageNotFoundComponent,
    GalleryComponent,
    ImagePreviewComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    A11yModule,
    MatTabsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSliderModule,
    MatCardModule,
    MatProgressBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [EncryptService, UserService, AuthService, AuthAdminService, AuthGuardService, ImageService, CommentService, NotificationService],
  bootstrap: [AppComponent]
})

export class AppModule { }
