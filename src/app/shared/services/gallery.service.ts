import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Image } from '../models/Image';
import { Observable, switchMap, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  collectionName = 'Images';

  //HTTP
  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
    ) { }

  /*loadImageMeta(metaUrl: string):Observable<Array<Image>>{
    //return this.http.get(environment.hostUrl + '/assets/' + metaUrl) as Observable<Array<Image>>;
    
    //valueChanges - összes kiolvasása - observable-t ad vissza
    //realtime- különböző adatváltozásoról fog értesíteni
    return this.afs.collection<Image>(this.collectionName).valueChanges();

  }*/

  loadImageUrl(imageUrl: string){
    //File-t adunk vissza - blob
    //return this.http.get(environment.hostUrl + '/assets/' + imageUrl, {responseType: 'blob'})
    
    //ref- útvonal alapján hivatkozunk, melyiket húzzuk be
    //getDownloadURL - tokennel és lejérati dátummal ellátott url-t kapunk vissza
    return this.storage.ref(imageUrl).getDownloadURL();
  }

  loadImagesFromFirestore(): Observable<string[]> {
    return this.afs.collection(this.collectionName).valueChanges().pipe(
      //pipe operátor segítségével láncolhatunk össze különböző operátorokat.

      switchMap((images: any[]) => {
        //switchMap operátor olyan transzformációt hajt végre, amely az eredeti megfigyelhetőt lecseréli egy másikra, 
        //és az új megfigyelhetőből származó eredményeket továbbítja. Ha az eredeti megfigyelhető új eseményt bocsát ki, 
        //a switchMap megsemmisíti az előzőleg megfigyelhetőt, és az újat használja.
        const downloadUrlObservables: Observable<string>[] = [];
        images.forEach(image => {
          const ref = this.storage.ref(image.image_url);
          downloadUrlObservables.push(ref.getDownloadURL());
        });
        return forkJoin(downloadUrlObservables);
        //operátor egyesíti az összes megfigyelhetőt egyetlen megfigyelhetővé, és az összes forrásból származó utolsó értéket adja vissza, 
        //amikor mindegyik befejeződött. Tehát amikor minden egyes megfigyelhető befejeződik, az forkJoin visszaad egy tömböt az összes utolsó értékből.
      })
    );
  };

  
  


}
