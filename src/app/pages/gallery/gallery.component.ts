import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { GalleryService } from '../../shared/services/gallery.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit{  
  
  images?: string[];

  @Output() pageChange = new EventEmitter<number>();

  constructor(private galleryService: GalleryService, private afs: AngularFirestore, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    
    this.loadImages();
    console.log("images:", this.images);

  }

  loadImages(){
    /*this.images = of([
      'assets/images/image-1.jpg',
      'assets/images/image-2.jpg',
      'assets/images/image-3.jpg',
      'assets/images/image-4.jpg',
      'assets/images/image-5.jpg',
    ])*/
    
    this.galleryService.loadImagesFromFirestore().subscribe(images => {
      console.log(images);
      this.images = images; // Tárold az összes képet
    });
    

    /*this.images = this.galleryService.loadImagesFromFirestore() /*.subscribe(images => {
      console.log(images)
      this.images = images; // Itt tárolhatod az összes képet
    })*/
    
    
  }



  
}
