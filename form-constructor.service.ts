import { Injectable } from '@angular/core';
import { InputTypes } from './components/inputs-adder/input models/inputTypes.model';
import { Observable, of, Subject } from 'rxjs';
import { InputModel } from './components/inputs-adder/input models/input.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormModel } from './models/form.model';

@Injectable({
  providedIn: 'root'
})
export class FormConstructorService {

  complete = new Subject<any>()

  

  constructor(
    private fs: AngularFirestore
  ) {
   }

  async callFormByName(collection: string, formName: string) {
    const collRef = this.fs.collection(collection).ref
    const docRef = collRef.where('nombre', '==', formName)

    const formsDocs = await docRef.get()
    const formDoc = await formsDocs.docs[0].data()
    const formId = await formsDocs.docs[0].id
    const formRef = collRef.doc(formId)

    const inputsArray = await formRef.collection('inputs').orderBy('index').get()
    var inputs = []
    inputsArray.forEach(async input => { await inputs.push(input.data()) })
    
    return { form: formDoc, inputs: inputs }
  }

  async callFormById(collection: string, id: string) {
    const collRef = this.fs.collection(collection).ref
    const formRef = collRef.doc(id)
    const formDoc = await (await collRef.doc(id).get()).data()
    const inputsArray = await formRef.collection('inputs').orderBy('index').get()
    var inputs = []
    inputsArray.forEach(async input => { await inputs.push(input.data()) })
    return { form: formDoc, inputs: inputs }
  }


  async saveForm(form: FormModel) {
      
    var collId: string
    const collRef = this.fs.collection(form.collection).ref

    const formCreated = await
      (await collRef.where('nombre', '==', form.nombre)
        .get()).docs[0];
    
    
    
    if (!formCreated) {
      form.atributes['nombre'] = form.nombre
      const newColl = await collRef.add(form.atributes)
      collId = newColl.id
      await collRef.doc(collId).update({ id: collId })

    } else {

      collId = formCreated.id

    }

    
    form.inputs.forEach(async (input, inputIndex) => {
      input.index = inputIndex + 1
      await collRef.doc(collId).collection('inputs').doc(input.ID).set(input, {merge: true})
    })

    this.complete.next(true)

  }
  
}
