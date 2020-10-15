import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SenatorsService } from 'src/app/services/senators.service';

import { SenatorResponse } from 'src/app/models/senator-response.model';
import { Senator } from 'src/app/models/senator.model';

@Component({
  selector: 'app-senators',
  templateUrl: './senators.component.html',
  styleUrls: ['./senators.component.css'],
})
export class SenatorsComponent implements OnInit {
  senators: Senator[];

  constructor(
    private senatorsService: SenatorsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.senatorsService.getSenators().subscribe((senators) => {
      this.senators = senators.map((senator) => this.getSenator(senator));
    });
  }

  getSenator(senatorResponse: SenatorResponse): Senator {
    let senator = new Senator();
    senator.name = senatorResponse.nomeSenador;
    senator.id = senatorResponse.id;
    return senator;
  }

  onRowClicked(id: string): void {
    this.router.navigate(['/senators', id]);
  }
}
