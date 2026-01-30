import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    productsImage = [
        { "ProductId": "p1", "ProductName": "Coca", "Price": 100, "Image": "https://cdn.tgdd.vn/Products/Images/2443/76451/bhx/nuoc-ngot-coca-cola-lon-320ml-202304131107525481.jpg" },
        { "ProductId": "p2", "ProductName": "Pepsi", "Price": 300, "Image": "https://cdn.tgdd.vn/Products/Images/2443/76467/bhx/nuoc-ngot-pepsi-cola-lon-320ml-202407131656260952.jpg" },
        { "ProductId": "p3", "ProductName": "Sting", "Price": 200, "Image": "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/3226/76519/bhx/nuoc-tang-luc-sting-dau-sleek-lon-330ml_202509291421449068.jpg" },
    ]
    constructor() { }
    getProductsWithImages() {
        return this.productsImage
    }
    getProductDetail(id: any) {
        return this.productsImage.find(x => x.ProductId == id)
    }
}
