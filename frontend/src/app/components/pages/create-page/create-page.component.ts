import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { IFoodCreate } from 'src/app/shared/interfaces/IFoodCreate';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {

  createForm!:FormGroup;
  isSubmitted = false;

  returnUrl = '';
  constructor(
    private formBuilder: FormBuilder,
    private foodService: FoodService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required]],
      tags: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      origins: ['', [Validators.required]],
      cookTime: ['', [Validators.required]],
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.createForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.createForm.invalid) return;

    const fv = this.createForm.value;
    const food :IFoodCreate = {
      name: fv.name,
      price: fv.price,
      tags: fv.tags,
      imageUrl: fv.imageUrl,
      origins: fv.origins,
      cookTime: fv.cookTime
    };
    

    this.foodService.createFood(food).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    })
    
    
  }
  

}
