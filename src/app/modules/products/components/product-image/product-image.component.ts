import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.css']
})
export class ProductImageComponent implements OnInit, AfterViewInit {

  @Input() src:string;
  @ViewChild('image') image:ElementRef;
  isImageLoading: boolean;

  constructor(private renderer: Renderer2) {
    this.isImageLoading = true;
   }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.addListenLoadOnImage();
  }

  private addListenLoadOnImage() {
    this.renderer.listen(this.image.nativeElement, 'load', () => {
      this.isImageLoading = false;
    })
  }
}
