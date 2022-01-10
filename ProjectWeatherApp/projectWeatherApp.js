/**
 * Description :  ProjectWeatherApp (Shows weather conditon based on the inputs). 
 *                This component is Parent component
 * Author : Sucharita Mondal
 * Created Date : Jan 10, 2022
 */
import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class ProjectWeatherApp extends LightningElement {
    /**
    * Variable decaration
    */

    @track zipcode ;
    @track code ;
    address = `${this.zipcode},${this.code}`;
    
    /**
    * Calls on the button click from Parent Component
    */

    handleClick(){
        this.zipcode = this.template.querySelector('.zip').value;
        this.code = this.template.querySelector('.ccode').value;
        this.address = `${this.zipcode},${this.code}`;
        const childCmp = this.template.querySelector('c-weather-information');
        if(this.address && typeof this.address !=='undefined'){
            childCmp.handleFetch(this.address); // calling child component method once inputs are received
        }else{
            this.showToast(); // show toast otherwise
        }
    }
    /**
    * Shows error toast
    */
    showToast() {
        const event = new ShowToastEvent({
            title: 'Error',
            message: 'Please provide Zipcode and Country Code',
            variant: 'Error',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }
}