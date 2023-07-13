export class Product {
    id: number;
    title: string;
    category: string;
    description: string;
    price: number;
    image: string;
    categoryClass: string; 

    constructor(id: number, title: string,category: string, categoryClass: string,description: string, price: number, image: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.price = price;
        this.image = image;
        this.categoryClass = categoryClass;
      }
  }