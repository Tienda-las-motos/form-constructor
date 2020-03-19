import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { InputModel } from '../inputs-adder/input models/input.model';
import { InputAdderService } from '../inputs-adder/input-adder.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormConstructorService } from '../../form-constructor.service';
import { Location } from '@angular/common';
import { FormModel } from '../../models/form.model';



@Component({
  selector: 'Gdev-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewFormComponent implements OnInit {

  public waitFor = (ms: number) => new Promise(r => setTimeout(r, ms))
  public Inputs: InputModel[]
  public inputsInDB

  inputToadd: any
  @Input() collection: string
  @Input() formName: string
  @Input() customAtributes: {}
  @Input() inputTypes: []
  @Input() idForm: string
  newFormName: string

  constructor(
    private _inputAdder: InputAdderService,
    private _formConst: FormConstructorService,
    private fs: AngularFirestore,
    private location: Location
  ) {
    this.Inputs = []
    if (!this.collection) this.collection = 'formularios'
    
  }
  
  async ngOnInit() {
    this.callForm()
    this.catchInputs()
  }

  

  async catchInputs() {
    this._inputAdder.catchNewInput.subscribe(input => {

      if (!input.tipo) input.tipo = 'text';
      var anInput = this.Inputs.find(inpt => inpt.ID === input.ID)
      
      !anInput ? this.Inputs.push(input) :
        (
          console.warn(`Ya existe el ID ${input.ID}, Debes elegir otro Identificador para el atributo`),
          alert(`Ya existe el ID ${input.ID}, Debes elegir otro Identificador para el atributo`)
        )
    })
  }

  async callForm() {
    var response

    if (this.formName) {
      response = await this._formConst.callFormByName(this.collection, this.formName)
    } else if (this.idForm) {
      response = await this._formConst.callFormById(this.collection, this.idForm)
    }

      this.Inputs = response.inputs
      this.inputsInDB = response.inputs.length
    this.idForm = response.form.id
  }


  get changes():boolean {
    return this.Inputs.length === this.inputsInDB ? false : true
  }


  async delInput(idInput) {
    
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

  async saveForm() {
    if (this.newFormName) this.formName = this.newFormName

    var form: FormModel = {
      collection: this.collection,
      nombre: this.formName,
      inputs: this.Inputs,
    }

    if (this.customAtributes) form['atributes'] = this.customAtributes
      
    this._formConst.saveForm(form)
    this._formConst.complete.subscribe(end => { if (end) this.location.back() })
  }

}
