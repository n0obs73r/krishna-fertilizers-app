export interface Product {
        id : number,
        p_name: string ,
        p_brand: string ,
        type: string,
        price: number ,
        description: string ,
        img_url: string ,
        sale: string ,
        s_price: number ,
        season: string
  }
  
  
export const products = [
    {
        "id": 1,
        "type": "seed",
        "p_brand": "syngenta",
        "p_name": "radish",
        "price": 501,
        "description": "description",
        "season": "winter",
        "img_url": "https://dummyurl",
        "sale": true,
        "sale_price": 451
      },{
        "id": 3,
        "type": "seed",
        "p_brand": "syngenta",
        "p_name": "tomato",
        "price": 502,
        "description": "description",
        "season": "winter",
        "img_url": "https://dummyurl",
        "sale": true,
        "sale_price": 452
      }
]