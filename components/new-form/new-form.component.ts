import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { InputModel } from '../inputs-adder/input models/input.model';
import { InputAdderService } from '../inputs-adder/input-adder.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormConstructorService } from '../../form-constructor.service';

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
  idForm: string

  constructor(
    private _inputAdder: InputAdderService,
    private _formConst: FormConstructorService,
    private fs: AngularFirestore
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

  callForm() {
    if (this.formName) {
      this._formConst.callForm(this.collection, this.formName)
        .then(res => {
          this.Inputs = res.inputs
          this.inputsInDB = res.inputs.length
          this.idForm = res.form.id
        })
    }
  }


  get changes():boolean {
    return this.Inputs.length === this.inputsInDB ? false : true
  }


  async delInput(idInput) {
    
    // Delete in local Array
    var inputAtDel = this.Inputs.findIndex(inpt => inpt.ID === idInput)
    this.Inputs.splice(inputAtDel, 1)


    // Search and delete in firestore
    const collRef = this.fs.collection(this.collection).ref
    const formRef = collRef.doc(this.idForm)
    const inputsForm = await formRef.collection('inputs')
                            .where('ID', '==', idInput).get()
                            
    if (inputsForm.size > 0) {
      var inputToDel = inputsForm.docs[0].id
      formRef.collection('inputs').doc(inputToDel).delete()
    } 


  }

  async saveForm() {

    this._formConst.saveForm(this.collection, this.formName, this.Inputs)

  }

}
