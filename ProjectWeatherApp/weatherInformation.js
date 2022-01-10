/**
 * Description :  This is child component in the project
 * Author : Sucharita Mondal
 * Created Date : Jan 10, 2022
 */
import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import BLINK from '@salesforce/resourceUrl/blink';
export default class WeatherInformation extends LightningElement {
    /**
    * Variable decaration
    */
    API_URL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
    API_KEY = '12345'; //put valid API Key here
    ICON_BASE = 'http://openweathermap.org/img/wn/';
    address;
    weatherInfo;
    cityName;
    temp;
    description;
    icon;
    @track flag = false;

    /**
    * This called from Parent component and making callout to mention endpoints
    * @param : address passed from parent component
    */
    @api async handleFetch(address) {
        try{
          this.address = address;
          let endPoint = `${this.API_URL}${this.address}&appid=${this.API_KEY}`;
            
          const response = await fetch(endPoint);
          const weatherInfo = await response.json();;
          if(weatherInfo && typeof weatherInfo !=='undefined') {
            this.setDetails(weatherInfo);
          }else{
            this.showToast();
          }
        }catch(err){
          this.showToast();
        }
      }
    /**
    * This called once we received the JSON in response
    * @param : passing the JSON response and parsing it for getting values
    */
      setDetails(weatherInfo){
        this.weatherInfo = weatherInfo;
        this.cityName = this.weatherInfo.name + ','+this.weatherInfo.sys.country;
        this.humidity = this.weatherInfo.humidity +'%';
        this.temp = Math.round(this.weatherInfo.main.temp -273.15)+'\u00B0'+'C';
        this.description = 'Feels like '+this.temp +' ( '+ this.weatherInfo.weather[0].description +' )';
        this.icon = this.ICON_BASE+this.weatherInfo.weather[0].icon+'@2x.png';
        this.flag = true;
      }
    /**
    * Shows error toast
    */
      showToast() {
        const event = new ShowToastEvent({
            title: 'Error',
            message: 'Error while fetching request',
            variant: 'Error',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }
}