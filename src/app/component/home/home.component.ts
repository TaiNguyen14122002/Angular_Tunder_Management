import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  imageUrl: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8S2vOM4xEkwasOJG1Iah5wG78rLMDBmHcaA&s';

  ngOnInit() {
    // Giả sử bạn nhận URL hình ảnh từ một API
    this.imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8S2vOM4xEkwasOJG1Iah5wG78rLMDBmHcaA&s';
  }

  activeButton: string = '';

  setActive(buttonName: string) {
    this.activeButton = buttonName;
  }

}
