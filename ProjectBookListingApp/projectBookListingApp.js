/**
 * Description : It's a book listing app. Based on search key value ; books are showing
 * Author : Sucharita Mondal
 * Created Date : Jan 10, 2022
 */
import { LightningElement } from 'lwc';
//Note: make sure to add the base url to CSP in Salesforce.
const BOOK_URL = 'https://www.googleapis.com/books/v1/volumes?q='; //endpoint
export default class ProjectBookListingApp extends LightningElement {
    query = 'Man';
    books;
    timer;
    /**
    * Using lifecycle hooks so that it shows component onload.
    */
    connectedCallback(){
        this.fetchBookData();
    }
    /**
    * Making api callout with fetch(), here manipulation is being made on client-side
    */
    fetchBookData(){
        fetch(BOOK_URL+this.query)
        .then(response=> response.json())
        .then(data=>{
            ///console.log(data);
            this.books = data;
        })
        .catch(error=>console.log(error))
    }
    /**
    * on 'onchange' event this function is called. Note: here we are using debouncing technique i.e. 
    * instead of calling on every letter of search key, we're adding some delay. In this way we are preventing
    * from making API call on every letter.
    * @param : event is passed
    */
    fetchBooksHandler(event){
        this.query = event.target.value;
        window.clearTimeout(this.timer); //debouncing
        this.timer = setTimeout(()=> {
            this.fetchBookData()
        },1000)
    }
}