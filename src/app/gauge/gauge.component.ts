import { Component, inject, OnInit } from '@angular/core';
import { Database, ref, onValue, getDatabase, set } from '@angular/fire/database';


@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent implements OnInit{
  moisture: number = 0;
  waterLevel: number = 0;
  userNotified: boolean = true;
  temperature: number = 0;
  gas: number = 0;
  turnOnPump: boolean = true;

  private database: Database = inject(Database);

  ngOnInit(): void {
    const db = getDatabase();
    const waterRefVal = ref(db, 'waterLevel');
    const moistRefVal = ref(db, 'moisture');
    const temperatureRefVal = ref(db, 'temperature');
    const gasRefVal = ref(db, 'gasValue');

    onValue(waterRefVal, (snapshot) => {
      const data = snapshot.val();
      const maxSensorVal = 1024;
      this.waterLevel = Math.round(((maxSensorVal - data)/maxSensorVal)*100);
    })
    onValue(moistRefVal, (snapshot) => {
      const data = snapshot.val();
      this.moisture = data;
    })
    onValue(temperatureRefVal, (snapshot) => {
      const data = snapshot.val();
      this.temperature = data;
    })
    onValue(gasRefVal, (snapshot) => {
      const data = snapshot.val();
      this.gas = data;
    })
  }

  toggleUserNotification() {
    // Update the 'userNotified' value in the database
    const db = getDatabase();
    const userNotifiedRef = ref(db, 'userNotified');
    
    // Convert boolean to 0 or 1
    const valueToSend = this.userNotified ? 1 : 0;

    // Update the value in the database
    set(userNotifiedRef, valueToSend);
  }

  speak(label: string, value: number): void {
    this.speak(`${label} is `, value);
  }

  toggleWaterPump(){
    const db = getDatabase();
    const turnOnRef = ref(db, 'turnOnPump');

    const valueToSend = this.turnOnPump ? 1 : 0;

    set(turnOnRef, valueToSend);
  }
}
