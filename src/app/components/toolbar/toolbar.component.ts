import { Component, OnInit, EventEmitter, Output, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public title: string = 'Medical Appoiments App';
  @Output() public opened = new EventEmitter<void>();

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.onWindowResize();
  }

  isOpen() {
    this.opened.emit();
  }

  onWindowResize() {
    this.renderer.listen(window, 'resize', (ev) => {
      if (ev.target.innerWidth < 350) {
        this.title = 'Appoiments App';
      } else {
        this.title = 'Medical Appoiments App';
      }
    });
  }

}
