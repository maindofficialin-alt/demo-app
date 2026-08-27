import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="analytics-container" *ngIf="authService.hasRole('ADMIN'); else accessDenied">
      <div class="header-card">
        <h2>System KPI Metrics Dashboard</h2>
        <span class="badge">Scope: Admin Gated</span>
      </div>

      <div class="kpi-grid">
        <div class="kpi-card">
          <span class="label">Kafka Queue Status</span>
          <span class="value text-emerald">Healthy</span>
        </div>
        <div class="kpi-card">
          <span class="label">Spring Boot CPU Load</span>
          <span class="value text-purple">12%</span>
        </div>
        <div class="kpi-card">
          <span class="label">Azure DB Connections</span>
          <span class="value text-indigo">Active (3)</span>
        </div>
        <div class="kpi-card">
          <span class="label">CRM Synced Volume</span>
          <span class="value">99.8%</span>
        </div>
      </div>
    </div>

    <ng-template #accessDenied>
      <div class="denied-box">
        <h3>403 - Forbidden</h3>
        <p>RBAC constraints active. Admin role required to access system telemetry metrics.</p>
      </div>
    </ng-template>
  `,
  styles: [`
    .analytics-container { padding: 16px; background: rgba(17, 24, 39, 0.4); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); }
    .header-card { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .kpi-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .kpi-card { background: #0b0f19; border: 1px solid rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; display: flex; flex-direction: column; }
    .label { font-size: 11px; color: #9ca3af; }
    .value { font-size: 18px; font-weight: 700; margin-top: 4px; }
    .text-emerald { color: #10b981; }
    .text-purple { color: #8b5cf6; }
    .text-indigo { color: #6366f1; }
    .denied-box { text-align: center; padding: 32px 16px; border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 12px; background: rgba(239, 68, 68, 0.05); color: #ef4444; }
  `]
})
export class AnalyticsComponent implements OnInit {
  constructor(public authService: AuthService) {}
  ngOnInit(): void {}
}
