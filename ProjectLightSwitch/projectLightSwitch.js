/**
 * Description :  ProjectLightSwitch
 * Author : Sucharita Mondal
 * Created Date : Jan 04, 2022
 */

import { LightningElement } from 'lwc';
import LIGHT_OFF from '@salesforce/resourceUrl/lightoff';
import LIGHT_ON from '@salesforce/resourceUrl/lighton';
export default class ProjectLightSwitch extends LightningElement {

    /**
    * Variable decaration
    */
    lightOff = LIGHT_OFF ;
    lightOn = LIGHT_ON;
    flag = false;
    TURN_ON = 'Turn On';
    TURN_OFF = 'Turn Off';

    /**
    * Calls on button click
    */
    handleClick(){
        this.flag ? this.bulbOff(): this.bulbOn();
    }
    /**
    * Turns bulb Off
    */
    bulbOff(){
        
        this.template.querySelector('img').src = this.lightOff; // changing image on div
        this.template.querySelector('.btn').label = this.TURN_ON; // changing button label
        this.flag = false;

    }
    /**
    * Turns bulb on
    */
    bulbOn(){
        
        this.template.querySelector('img').src = this.lightOn;
        this.template.querySelector('.btn').label = this.TURN_OFF;
        this.flag = true;
    }
}