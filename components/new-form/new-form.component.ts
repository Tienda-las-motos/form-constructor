import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { InputModel } from '../inputs-adder/input models/input.model';
import { InputAdderService } from '../inputs-adder/input-adder.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormConstructorService } from '../../form-constructor.service';
import { Location } from '@angular/common';
import { FormModel } from '../../models/form.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';



@Component({
  selector: 'Gdev-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.scss'],
})
export class NewFormComponent implements OnInit {

  public waitFor = (ms: number) => new Promise(r => setTimeout(r, ms))
  public Inputs: InputModel[]
  public inputsInDB: any

  inputToadd: any
  @Input() collection: string = 'formularios'
  @Input() formName: string = ''
  @Input() customAtributes: any
  @Input() inputTypes: string[] = []
  @Input() idForm: string = ''
  @Input() autoDisableButton: boolean = true
  newFormName: string = ''
  droped: boolean = false
  inputSelected?: InputModel

  @Output() submited: EventEmitter<any> = new EventEmitter()

  constructor(
    private _inputAdder: InputAdderService,
    public  _formConst: FormConstructorService,
    private fs: AngularFirestore,
    private location: Location
  ) {
    this.Inputs = []
  }

  async ngOnInit() {
    this.callForm()
    this.catchInputs()
  }



  async catchInputs() {
    this._inputAdder.catchNewInput.subscribe(input => {

      if (!input.tipo) input.tipo = 'text';
      var anInput = this.Inputs.findIndex(inpt => inpt.ID === input.ID)

      if ( anInput >= 0 ) {
        this.Inputs[anInput] = input
      } else {
        input[ 'index' ] = this.Inputs.length ? 1 : this.Inputs.length + 1
        this.Inputs.push( input)
      }

      this.autoDisableButton = false
      // !anInput ? this.Inputs.push(input) :
      //   (
      //     console.warn(`Ya existe el ID ${input.ID}, Debes elegir otro Identificador para el atributo`),
      //     alert(`Ya existe el ID ${input.ID}, Debes elegir otro Identificador para el atributo`)
      //   )
    })
  }

  async callForm() {
    var response: any

    if (this.formName) {
      response = await this._formConst.callFormByName(this.collection, this.formName)
    } else if (this.idForm) {
      response = await this._formConst.callFormById(this.collection, this.idForm)
    }

    // console.log( response )

    if (response) {

      this.Inputs = response.inputs
      this.inputsInDB = response.inputs.length
      this.idForm = response.form.id
      this.formName = response.form.nombre

    }

  }


  get changes(): boolean {
    var anyChange
    if ( this.Inputs.length !== this.inputsInDB ) {
      // console.log( this.Inputs.length !== this.inputsInDB )
      return true
    } else if ( this.droped ) {
      // console.log( this.droped )
      return true
    } else if ( this.Inputs.length == 0 ) {
      // console.log( this.Inputs.length == 0 )
      return false
    } else {
      // console.log( this.autoDisableButton )
      return !this.autoDisableButton
    }
    // return anyChange
  }


  async delInput(idInput: string) {

    // Delete in local Array
    var inputAtDel = this.Inputs.findIndex(inpt => inpt.ID === idInput)
    this.Inputs.splice(inputAtDel, 1)


    // Search and delete in firestore
    if (this.idForm) {

      const collRef = this.fs.collection(this.collection).ref
      const formRef = collRef.doc(this.idForm)
      const inputsForm = await formRef.collection('inputs')
                              .where('ID', '==', idInput).get()

      if (inputsForm.size > 0) {
        var inputToDel = inputsForm.docs[0].id
        formRef.collection('inputs').doc(inputToDel).delete()
      }

    }


  }

  drop(event:CdkDragDrop<any>) {
    moveItemInArray(this.Inputs, event.previousIndex, event.currentIndex);
    this.droped = true
    // $('.grabber').removeClass('grabbed')
  }

  grabEffect() {
    // $('.grabber').addClass('grabbed')
  }



  async saveForm() {
    if (this.newFormName) this.formName = this.newFormName

    var form: FormModel = {
      collection: this.collection,
      nombre: this.formName,
      inputs: this.Inputs,
    }

    if (this.customAtributes) form['atributes'] = this.customAtributes

    await this._formConst.saveForm( form )

    this.submited.emit(form)
  }

}
