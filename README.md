# StoreContinue

# Hello, welcome to the store Kassinha varieties.

This project is the result of all the learning that I have been studying constantly.
So StoreContinue is a page of a product sales store. My intention is to put all the functionality that a trade can offer to the customer and all control to the store owner.

To begin with, we have the HOME page, where it includes all the visualization of the store's products, the customer's loggin menu, where he can be redirected to the login page or, if he has not yet registered, to the registration page. So, after the user is logged in, he will have all purchase functionalities released, he will be able to add the products of his choice in the shopping cart, where the selected products will be shown and their price with their respective payment methods, being able to calculate the total result of the your purchase. And so, at the end, you can place your order after choosing the payment method to be made by him, being the following: by pix, where he will receive the pix information from the store, having to make the payment and after loading the print or photo proof of the same, thus finalizing the purchase; or you can choose to pay in person at the store, where the order will be placed on the spot, waiting for the customer.
Still a few things:
 add direct purchase: the customer has selected only one product.
 separate products by sections: eg toys, household items, stationery etc.
 add the likes feature for the offer: the customer can mark possible likes for future offers and thus purchases.
 search functionality: search for a product that you are currently interested in.
 etc


Second we have the admin page, where the owner can have control of his page whenever he wants. This has the functionality of creating Cards for the product to be offered with your information, in these cards we have the functionality of editing the card and deleting it, it also has the functionality of listing orders made by customers up to that moment.
It lacks some features:
 creation of product types section.
 attention from the owner.
 completed or declined sale check.
 register the sales made.
 delete orders from the current order page.




sites:

 site icons => https://icon-icons.com/pt/

 site para codar expressões => https://regex101.com/


 
 # Comand
  * cd Backend
  * npm install
  * --> create a folder > tmp, inside it a folder  > uploads
  * --> register on the mongodb website > https://www.mongodb.com/ 
  * -->create a new project, then a database,
      go to connect > connect in your application,
      copy the connection string replacing the values of your username and password,
      create a .env document, create a variable MONGOOSE_URL_CONECTION2 = (paste the database connection string)

# to initialize:
  * npm run dev

# in another terminal
  * cd ..
  * cd FontendVite
  * npm install

 # to initialize:
  * npm run dev