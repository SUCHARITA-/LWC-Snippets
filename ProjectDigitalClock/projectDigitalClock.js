/**
 * Description : Digit Clock
 * Author : Sucharita Mondal
 * Created Date : Jan 5, 2022
 */
import { LightningElement, track } from 'lwc';

export default class ProjectDigitalClock extends LightningElement {
    timeString = '';

    /**
    * connectedCallback() : lifecycle hook fires when a component is inserted into the DOM.
    */
    connectedCallback(){
        this.calculateTime();
    }


    /**
    * Display digital clock
    */
    calculateTime(){
        const time = new Date();
        let hrs = time.getHours();
        let mins = time.getMinutes();
        let sec = time.getSeconds();

        let period = this.getPeriod(hrs);
        
        hrs = hrs > 9 ? hrs : '0'+hrs;
        mins = mins > 9 ? mins : '0'+mins;
        sec = sec > 9 ? sec : '0'+sec;

        this.timeString = `${hrs} : ${mins} : ${sec}  ${period}`;

        setInterval(()=>{
            this.calculateTime();
        },1000);
    }

    getPeriod(hrs){
        let period = "AM";
        if (hrs == 0) {
            hrs = 12;
        } else if (hrs >= 12) {
            hrs = hrs - 12;
            period = "PM";
        }
        return period;
    }
}