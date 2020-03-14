import { Injectable } from '@angular/core';
import { InputTypes } from './components/inputs-adder/input models/inputTypes.model';
import { Observable, of, Subject } from 'rxjs';
import { InputModel } from './components/inputs-adder/input models/input.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FormConstructorService {

  complete = new Subject<any>()

  

  constructor(
    private fs: AngularFirestore
  ) {
   }

  async callForm(collection: string, formName: string) {
    const collRef = this.fs.collection(collection).ref
    const docRef = collRef.where('nombre', '==', formName)

    const formsDocs = await docRef.get()
    const formDoc = await formsDocs.docs[0].data()
    const formId = await formsDocs.docs[0].id
    const formRef = collRef.doc(formId)

    const inputsArray = await formRef.collection('inputs').get()
    var inputs = []
    inputsArray.forEach(async input => { await inputs.push(input.data()) })
    
    return { form: formDoc, inputs: inputs }
  }


  async saveForm(collection, formName, inputs) {
      
    var collId: string
    const collRef = this.fs.collection(collection).ref

    const formCreated = await
      (await collRef.where('nombre', '==', formName)
        .get()).docs[0];
    
    
    
    if (!formCreated.exists) {

      const newColl = await collRef.add({nombre: formName})
      collId = newColl.id
      await collRef.doc(collId).update({ id: collId })

    } else {

      collId = formCreated.id

    }

    
    inputs.forEach(async input => {
      await collRef.doc(collId).collection('inputs').doc(input.ID).set(input)
    })

    this.complete.next(true)

  }
  
}
