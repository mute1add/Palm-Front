import {Component, OnInit} from '@angular/core';
import {Amenity} from '../../../../../shared/models/amenity';
import {RoomDescription} from '../../../../../shared/models/room-description';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Room} from '../../../../../shared/models/room';
import {AmenityService} from '../../../../../shared/service/amenity.service';
import {RoomService} from '../../../../../shared/service/room.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [AmenityService, RoomService]
})
export class RoomComponent implements OnInit {

  defaultFormValue = {
    descriptions: [
      {language: 'EN', languageO: 'English', description: ''},
      {language: 'UK', languageO: 'Ukrainian', description: ''},
      {language: 'PL', languageO: 'Polish', description: ''},
      {language: 'RU', languageO: 'Russian', description: ''}
    ],
    kidsPlaces: 0,
    adultPlaces: 1,
    square: 20,
    amount: 1,
    amenities: [],
    type: 'NONE',
    multipartFiles: null,
  };

  room: Room = new Room();
  amenity: Amenity[];
  roomDescriptions: RoomDescription[] = [];
  image: string[] = [];
  roomForm: FormGroup;
  roomDescriptionForm: FormArray;
  appear: boolean = true;
  type: string;

  constructor(private _amenityService: AmenityService, private _roomService: RoomService) {
    this.room.amenities = [];
    this._amenityService.findAll().subscribe(next => {
      this.amenity = next;
      // console.log('amenity : ', next);
    });
    this.roomDescriptions = [new RoomDescription(), new RoomDescription(), new RoomDescription(), new RoomDescription()];
    this.type = 'none';
  }

  ngOnInit() {
    this.createRoomForm();
  }

  readUrl(event: any) {
    if (event.target.files) {
      this.image = [];
      for (let i = 0; i < event.target.files.length; i++) {
        if (event.target.files[i]) {
          let reader = new FileReader();
          reader.onload = (event: any) => {
            this.image.push(event.target.result);
          };
          reader.readAsDataURL(event.target.files[i]);
        }
      }
    }
  }

  toggle() {
    this.appear = false;
  }

  isNull(object: any): Boolean {
    if (Array.isArray(object)) {
      return !isNullOrUndefined(object[0]);
    } else {
      return !isNullOrUndefined(object);
    }
  }

  addRoom(form: HTMLFormElement) {
    this._roomService.save(this.room, form).subscribe(next => {
        // console.log(next);
        this.roomForm.reset(this.defaultFormValue);
        this.createFormArray();
        this.image = [];
        alert("Кімнату добавлено")
      },
      error => {
        console.log(error);
      });
  }

  addAmenity(amenity: Amenity) {
    let amenities = (<Room>this.roomForm.getRawValue()).amenities;
    if (amenities.find(value => value.id == amenity.id)) {
      amenities = amenities.filter(value => value.id != amenity.id);
    } else {
      amenities.push(amenity);
    }
    this.roomForm.patchValue({amenities: amenities});
  }

  validateImages(c: FormControl): { [key: string]: any } {
    return c.value == null || c.value.length == 0 ? {"required": true} : null;
  }

  validateType(c: FormControl): { [key: string]: any } {
    return c.value == 'NONE' || c.value == '' ? {"required": true} : null;
  }

  private createRoomForm() {
    this.createFormArray();
    this.roomForm = new FormGroup({
      kidsPlaces: new FormControl(0, [Validators.min(0), Validators.max(9), Validators.required]),
      adultPlaces: new FormControl(1, [Validators.min(1), Validators.max(9), Validators.required]),
      square: new FormControl(20, [Validators.min(10), Validators.max(150), Validators.required]),
      amount: new FormControl(1, [Validators.min(1), Validators.max(100), Validators.required]),
      amenities: new FormControl([]),
      type: new FormControl('NONE', [Validators.required, this.validateType]),
      multipartFiles: new FormControl(null, [this.validateImages]),
      descriptions: this.roomDescriptionForm
    });
    this.roomForm.valueChanges.subscribe(value => {
      this.room = value;
      // console.log('room : ', this.room);
    });
  }

  private createFormArray() {
    this.roomDescriptionForm = new FormArray([
      new FormGroup({
        language: new FormControl('EN'),
        languageO: new FormControl('Англійська'),
        description: new FormControl('', [Validators.minLength(3), Validators.required])
      }),
      new FormGroup({
        language: new FormControl('UK'),
        languageO: new FormControl('Українська'),
        description: new FormControl('', [Validators.minLength(3), Validators.required])
      }),
      new FormGroup({
        language: new FormControl('PL'),
        languageO: new FormControl('Польська'),
        description: new FormControl('', [Validators.minLength(3), Validators.required])
      }),
      new FormGroup({
        language: new FormControl('RU'),
        languageO: new FormControl('Російська'),
        description: new FormControl('', [Validators.minLength(3), Validators.required])
      }),
    ]);
  }
}
