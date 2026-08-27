import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserClaims {
  sub: string;
  roles: string[];
  scope: string;
  iss: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private activeRole$ = new BehaviorSubject<string>('franchise');
  private claims$ = new BehaviorSubject<UserClaims | null>(null);

  constructor() {
    this.updateClaims('franchise');
  }

  setRole(role: string): void {
    this.activeRole$.next(role);
    this.updateClaims(role);
  }

  getRole(): Observable<string> {
    return this.activeRole$.asObservable();
  }

  getClaims(): Observable<UserClaims | null> {
    return this.claims$.asObservable();
  }

  private updateClaims(role: string): void {
    const claims: UserClaims = {
      iss: "https://auth.azure-iam.net/oauth2",
      sub: role === 'retailer' ? 'retailer_east' : role === 'franchise' ? 'franchise_east_01' : 'admin_01',
      roles: [role.toUpperCase()],
      scope: "read write orders:manage"
    };
    this.claims$.next(claims);
  }

  hasRole(role: string): boolean {
    const currentClaims = this.claims$.getValue();
    return currentClaims ? currentClaims.roles.includes(role.toUpperCase()) : false;
  }
}
