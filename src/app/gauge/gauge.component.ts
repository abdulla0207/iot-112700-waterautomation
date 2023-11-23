import { Component, inject, OnInit } from '@angular/core';
import { Database, ref, onValue, getDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent implements OnInit{
  temperature: number = 0;
  waterLevel: number = 0;

  private database: Database = inject(Database);

  ngOnInit(): void {
    const db = getDatabase();
    const waterRefVal = ref(db, 'waterLevel');

    onValue(waterRefVal, (snapshot) => {
      const data = snapshot.val();
      this.waterLevel = data;
    })
  }
}
