import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contactForm: FormGroup;
  contactList = [];
  action = "add";
  index;
  submitted = false;
  modalRef: BsModalRef;
  
  constructor(private router: Router, private formBuilder: FormBuilder, private modalService: BsModalService) { }

  ngOnInit() {
    this.contactForm  =  this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      number: ['', [Validators.required, Validators.minLength(11)]]
  });
    this.getContacts();
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getContacts(){
    this.contactList = JSON.parse(localStorage.getItem('contactList')) == null ? []: JSON.parse(localStorage.getItem('contactList'));
  }

  addContact(){
    if(this.action == "update"){
      for (let i = 0; i < this.contactList.length; i++){
        if(this.contactList[i].id == this.contactForm.value['id']){
          this.contactList[i].name = this.contactForm.value['name']
          this.contactList[i].number = this.contactForm.value['number']
        }
      }
      this.action = "add";
    }else {
      this.contactForm.value['id'] = this.guid();
      this.contactList.push(this.contactForm.value);
    }
    localStorage.setItem('contactList', JSON.stringify(this.contactList));
    this.contactForm.reset();
    this.modalRef.hide()
  }

  editContact(contact,i){
    this.action = "update";
    this.index = i;
    this.contactForm.patchValue(contact);
  }

  deleteContact(i){
    this.contactList.splice(i, 1);
    localStorage.setItem('contactList', JSON.stringify(this.contactList));
  }

  logout(){
    this.router.navigate(['']);
    localStorage.clear();
  }

  get form() { return this.contactForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.contactForm.invalid) {
            return;
        }
        this.addContact();
    }

    closeModal(){
      this.modalRef.hide();
      this.submitted = false;
      this.action = "add";
      this.contactForm.reset();
    }
}
