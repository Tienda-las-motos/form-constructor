import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { InputTypes } from './components/inputs-adder/input models/inputTypes.model';
import { Observable, of, Subject } from 'rxjs';
import { InputModel } from './components/inputs-adder/input models/input.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormModel, iFormResult } from './models/form.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class FormConstructorService {

  complete = new Subject<any>()
  // mediaWidth: string

  @ViewChild('gdevForm') gdevForm!: ElementRef

  constructor(
    private fs: AngularFirestore,
    private _snack: MatSnackBar
  ) {
   }

  async callFormByName( collection: string, formName: string ): Promise<iFormResult> {
    // console.log( collection, formName )
    const collRef = this.fs.collection<FormModel>(collection).ref
    const docRef = collRef.where('nombre', '==', formName)

    const formsDocs = await docRef.get()
    const formDoc = formsDocs.docs[0]?.data()
    const formId = formsDocs.docs[0]?.id
    const formRef = collRef.doc(formId)

    const inputsArray = await formRef.collection('inputs').orderBy('index').get()
    var inputs: any[] = []
    inputsArray.forEach( async input => { await inputs.push( input.data() ) } )
    // console.log( inputs, inputsArray )

    return <iFormResult> { form: formDoc, inputs: inputs }
  }

  async callFormById(collection: string, id: string) {
    const collRef = this.fs.collection(collection).ref
    const formRef = collRef.doc(id)
    const formDoc = await (await collRef.doc(id).get()).data()
    const inputsArray = await formRef.collection('inputs').orderBy('index').get()
    var inputs: any[] = []
    inputsArray.forEach(async input => { await inputs.push(input.data()) })
    return { form: formDoc, inputs: inputs }
  }


  async saveForm( form: FormModel, inputs: InputModel[] ) {

    const inputsRef = form.inputs
    console.log( form )
    var formId: string
    const collRef = this.fs.collection(form.collection).ref

    let formCreated = await
      (await collRef.where('nombre', '==', form.nombre)
        .get()).docs[0];



    if ( !formCreated?.exists ) {
      const newColl = await collRef.add({...form})

      formId = newColl.id
      await collRef.doc( formId ).update( { id: formId } )
      await this._saveInputs( inputs, formId, form.collection )

    } else {
      formId = formCreated.id
      await collRef.doc( formId ).update( {...form} )
      await this._saveInputs( inputs, formId, form.collection )
    }

    this._snack.open('Formulario guardado', 'Ok')
    this.complete.next(true)

    return
  }


  private async _saveInputs( inputs: any[], fid: string, collection: string ) {

    const inputsColRef = this.fs
      .collection( `${ collection }/${ fid }/inputs` ).ref

    inputs.forEach(async (input: any, inputIndex: number) => {
      input.index = inputIndex + 1
      await inputsColRef.doc(input.ID).set(input, {merge: true})
    })
  }


  get mediaWidth(): string {
    if (this.gdevForm) {
      var containerWidth = this.gdevForm.nativeElement.width()

      if (containerWidth > 1200) {
        return's4'
      } else if (containerWidth < 1200 && containerWidth > 900) {
        return's6'
      } else if (containerWidth < 900 ) {
        return's12'
      } else {
        return 's12'
      }
    } else {
      return 's12'
    }
  }

}
