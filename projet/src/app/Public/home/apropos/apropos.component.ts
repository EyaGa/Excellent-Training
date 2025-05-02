import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-apropos',
  templateUrl: './apropos.component.html',
  styleUrl: './apropos.component.css'
})
export class AproposComponent {
  constructor(public router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
}
