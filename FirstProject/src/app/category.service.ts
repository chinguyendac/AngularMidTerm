import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    return this.db.list('/categories',query => query.orderByChild('name')).snapshotChanges().pipe(map(items => {
      return items.map(a => {
        let product = a.payload.val()
        const key = a.payload.key;
        const name = product['name'];
        return {key, name}
      })
    }));
  }

}
