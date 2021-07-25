import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export const usersRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
})
export class UsersModule {}
