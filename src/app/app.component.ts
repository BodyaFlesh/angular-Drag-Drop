import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf'
import * as moment from 'moment';

import { ModalComponent } from './components/modal/modal.component';
import { SmallModalComponent } from './components/small-modal/small-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  private message:any = {
    date: false
  };
  private customField:string = '';
  private form:boolean = false;
  private progress:any   = {
    loaded: false
  };
  // private content:boolean   = false;
  // private modal:boolean     = false;
  private load:boolean      = true;
  private img:string = '';

  shuffleArray(arr) {
    let array = arr;
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  tag1 = this.shuffleArray([
    { rotate: false, title:  'Verbinden van mede-initiatiefnemers van scholen onderling', description: 'Verbinden van mede-initiatiefnemers van scholen onderling' },
    { rotate: false, title:  'Verbinden van mensen vanuit overheden, bedrijfsleven en maatschappelijke partijen', description: 'Verbinden van mensen vanuit overheden, bedrijfsleven en maatschappelijke partijen' },
    { rotate: false, title:  'Verbinden van collega’s in school', description: 'Verbinden van docenten, teamleiders en CvB' },
    { rotate: false, title:  'Zorgdragen voor aanleg en onderhoud van makkelijk toegankelijke contacten', description: 'Zorgdragen voor aanleg en onderhoud van makkelijk toegankelijke contacten' },
    { rotate: false, title:  'Werven van vraagstukken in de regio ', description: 'Werven van vraagstukken in de regio' },
    { rotate: false, title:  'Realiteitsgehalte van projecten inschatten irt beoogde betrokkenen ', description: 'Realiteitsgehalte van projecten inschatten irt beoogde betrokkenen ' },
    { rotate: false, title:  'Mentaliteitsverandering bij medewerkers binnen je onderwijsinstelling realiseren ', description: 'Mentaliteitsverandering bij medewerkers binnen je onderwijsinstelling realiseren ' },
    { rotate: false, title:  'Actieve betrokkenheid bij de organisatie (in detail) van activiteiten en de PR daarvoor. Afspraken helpen vastleggen en draaiboeken (helpen) maken', description: 'Actieve betrokkenheid bij de organisatie (in detail) van activiteiten en de PR daarvoor. Afspraken helpen vastleggen en draaiboeken (helpen) maken' },
    { rotate: false, title:  'Reality checks uitvoeren op programma’s van activiteiten', description: 'Reality checks uitvoeren op programma’s van activiteiten' },
    { rotate: false, title:  'Aansturen van individuen met verschillende achtergronden en belangen', description: 'Aansturen van individuen met verschillende achtergronden en belangen met verschillende achtergronden en belangen' },
    { rotate: false, title:  'Aansturen van diverse groepen', description: 'Aansturen van diverse groepen' },
    { rotate: false, title:  'Stimuleren van individuen met verschillende achtergronden en belangen', description: 'Stimuleren van individuen met verschillende achtergronden en belangen met verschillende achtergronden en belangen' },
    { rotate: false, title:  'Stimuleren van groepen met verschillende achtergronden en belangen', description: 'Stimuleren van groepen met verschillende achtergronden en belangen met verschillende achtergronden en belangen' },
    { rotate: false, title:  'Continu actief informatie delen ', description: 'Continu actief informatie delen' },
    { rotate: false, title:  'Continu goed uitleggen waarom bepaalde informatie voor iemand van belang is', description: 'Continu goed Continu goed uitleggen waarom bepaalde informatie voor iemand van belang is waarom bepaalde informatie voor iemand van belang is' },
    { rotate: false, title:  'Verwachtingsmanagement voeren tussen betrokken interne en externe partijen', description: 'Verwachtingsmanagement voeren tussen betrokken interne en externe partijen tussen betrokken interne en externe partijen' },
    { rotate: false, title:  'Benoemen van positieve resultaten en slagkracht van anderen', description: 'Benoemen van positieve resultaten en slagkracht van anderen' },
    { rotate: false, title:  'PR organiseren over good practices (zichtbaar maken van resultaten) ', description: 'PR organiseren over good practices (zichtbaar maken) ' },
    { rotate: false, title:  'Vervolgacties continu expliciteren ', description: 'Vervolgacties continu expliciteren ' },
    { rotate: false, title:  'Vervolgacties (helpen) concretiseren', description: 'Vervolgacties (helpen) concretiseren' },
    { rotate: false, title:  'Helder het doel en belang van een activiteit te communiceren naar alle betrokkenen ', description: 'Helder het doel en belang van een activiteit communiceren naar alle betrokkenen' },
    { rotate: false, title:  'Prikkelen van nieuwsgierigheid', description: 'Prikkelen van nieuwsgierigheid van nieuwsgierigheid' },
    { rotate: false, title:  'Aanjagen van eigenaarschap', description: 'Aanjagen van eigenaarschap' },
    { rotate: false, title:  'Aanjagen van persoonlijk leiderschap', description: 'Aanjagen van persoonlijk leiderschap' },
    { rotate: false, title:  'Begeleiden van studenten terwijl in contact met  externen', description: 'Directe betrokkenheid bij zowel de begeleiding van studenten als contacten met externen' },
    { rotate: false, title:  'Directe betrokkenheid bij zowel de begeleiding van studenten als contacten met externen', description: 'Coachen van studenten in het licht van externe relaties ' },
    { rotate: false, title:  'In beeld brengen van relevante netwerken ', description: 'In beeld brengen van relevante netwerken' },
    { rotate: false, title:  'Actief contacten leggen met opdrachtgevers en klanten', description: 'Actief contacten leggen met opdrachtgevers en klanten' },
    { rotate: false, title:  'Actief contacten onderhouden met interne en externe betrokkenen', description: 'Actief contacten onderhouden met interne en externe betrokkenen' },
    { rotate: false, title:  'Invloed uitoefenen op het (flexibiliseren van) de onderwijsorganisatie', description: 'Invloed uitoefenen op het (flexibiliseren van) de onderwijsorganisatie' },
    { rotate: false, title:  'Actieve participatie in werkgroepen en projecten', description: 'Actieve participatie in werkgroepen en projecten' },
    { rotate: false, title:  'Organiseren van reflectie op projectinhoud en –proces met betrokken partijen ', description: 'Organiseren van reflectie op projectinhoud en –proces met betrokken partijen  op projectinhoud en –proces met betrokken partijen ' },
    { rotate: false, title:  'Faciliteren van reflectie op projectinhoud en –proces met betrokken partijen ', description: 'Faciliteren van reflectie op projectinhoud en –proces met betrokken partijen  op projectinhoud en –proces met betrokken partijen ' }
  ]);

  tag2 = this.shuffleArray([
    { title:  'Kunnen schakelen tussen verschillende snelheden in onderwijs en praktijk', description: '' },
    { title:  'Continu actief mensen willen bijpraten', description: '' },
    { title:  'Potentiele betrokkenen aan boord willen krijgen', description: '' },
    { title:  'In een vroeg stadium mensen aan je idee willen binden', description: '' },
    { title:  'In een vroeg stadium mensen aan je idee willen binden', description: '' },
    { title:  'Meerwaarde van samenwerking kunnen verwoorden', description: '' },
    { title:  'Mensen, jou meer of minder bekend, op sleeptouw kunnen nemen ', description: '' },
    { title:  'Mensen, jou meer of minder bekend, warm kunnen maken', description: '' },
    { title:  'Organisatorisch inzicht', description: '' },
    { title:  'Gericht op het maken van duidelijke afspraken', description: '' },
    { title:  'Alternatieven kunnen bieden voor afspraken', description: '' },
    { title:  'Financieel inzicht', description: '' },
    { title:  'Technisch voorzitterschap kunnen voeren ', description: '' },
    { title:  'Het gezicht zijn van de onderwijsinstelling ', description: '' },
    { title:  'Gastheerschap', description: '' },
    { title:  'Genieten van het bij elkaar brengen van partijen ', description: '' },
    { title:  'Achterover kunnen hangen en luisteren (alvorens tot actie over te gaan) ', description: '' },
    { title:  'Respect tonen voor andermans opinie en zoektocht ', description: '' },
    { title:  'Mensen op hun gemak kunnen stellen ', description: '' },
    { title:  'Blijvende steun kunnen geven', description: '' },
    { title:  'Lange termijn betrokkenheid tonen', description: '' },
    { title:  'Kunnen delegeren ', description: '' },
    { title:  'Kunnen onderhandelen', description: '' },
    { title:  'Mandaat bij anderen kunnen leggen', description: '' },
    { title:  'Jouw credits aan anderen kunnen toebedelen', description: '' },
    { title:  'Onvoorwaardelijk geloof hebben in regionale samenwerking ', description: '' },
    { title:  'Jouw doel kunnen verbinden aan de potentie van anderen ', description: '' },
    { title:  'Kunnen aanhaken bij het ontwikkelproces van de mensen met wie je wilt werken', description: '' },
    { title:  'Altijd in vervolgacties denken ', description: '' },
    { title:  'In kansen kunnen en durven denken', description: '' },
    { title:  'Verder kijken dan je eigen instelling lang is ', description: '' },
    { title:  'Aanhaken bij precies dat wat mensen in beweging krijgt (bijv. financieel voordeel; plezier; voldoening; risicospreiding)', description: '' },
    { title:  'Je kunnen inleven in een groot scala aan belangen en persoonlijkheden', description: '' },
    { title:  'Kunnen beheersen van groepsdynamica', description: '' },
    { title:  'Uitmuntend kunnen samenwerken', description: '' },
    { title:  'Organisatie-breed denken ', description: '' },
    { title:  'Om kunnen gaan met onzekerheid', description: '' },
    { title:  'Om kunnen gaan met een onduidelijke positie', description: '' }
  ]);

  tag3 = this.shuffleArray([
    { title:  'Gestructureerd', description: '' },
    { title:  'Zorgvuldig', description: '' },
    { title:  'Respectvol', description: '' },
    { title:  'Realiteitsgezind', description: '' },
    { title:  'Daadkrachtig', description: '' },
    { title:  'Vriendelijk', description: '' },
    { title:  'Gastvrij', description: '' },
    { title:  'Associatief', description: '' },
    { title:  'Extern gericht', description: '' },
    { title:  'Breed geïnteresseerd', description: '' },
    { title:  'Belangstellend', description: '' },
    { title:  'Empathisch', description: '' },
    { title:  'Charmant', description: '' },
    { title:  'Ego-loos', description: '' },
    { title:  'Geloofwaardig', description: '' },
    { title:  'Enthousiast', description: '' },
    { title:  'Enthousiast', description: '' },
    { title:  'Luisterend oor ', description: '' },
    { title:  'Overtuigend ', description: '' },
    { title:  'Geduldig', description: '' },
    { title:  'Volhoudend ', description: '' },
    { title:  'Bescheiden ', description: '' },
    { title:  'Verbindend', description: '' },
    { title:  'Opbouwend', description: '' },
    { title:  'Onvoorwaardelijk', description: '' },
    { title:  'Prikkelen van nieuwsgierigheidd', description: '' },
    { title:  'Nieuwsgierig ', description: '' },
    { title:  'Helder', description: '' },
    { title:  'Communicatief', description: '' },
    { title:  'Kans-omarmend', description: '' },
    { title:  'Visionair ', description: '' },
    { title:  'Toekomstgericht', description: '' },
    { title:  'Proactief', description: '' },
    { title:  'Systeem- en/of keten-denkend ', description: '' },
    { title:  'Netwerkgericht ', description: '' },
    { title:  'Divergent denkend ', description: '' },
    { title:  'Samenwerkend ', description: '' },
    { title:  'Flexibel', description: '' },
    { title:  'Ambitieus', description: '' },
    { title:  'Denkend in verbindingen ', description: '' },
    { title:  'Interdisciplinair', description: '' },
    { title:  'Coachend', description: '' },
    { title:  'Progressief', description: '' },
    { title:  'Betrouwbaar', description: '' },
    { title:  'Open', description: '' },
    { title:  'Niet bang voor fouten ', description: '' },
    { title:  'Transparant', description: '' },
    { title:  'Faciliterend', description: '' },
    { title:  'Weerbaar', description: '' },
  ]);

  selected1 = [];
  selected2 = [];
  selected3 = [];

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '55vw',
    });
    dialogRef.afterClosed().subscribe();
  }

  openSmallDialog(content) {
    const dialogRef = this.dialog.open(SmallModalComponent, { data: content });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  checkCount(){
    if(this.selected1.length > 7){
      this.openSmallDialog('Het maximum is 7 kaarten');
    }else if(this.selected2.length > 10){
      this.openSmallDialog('Het maximum is 10 kaarten');
    }else if(this.selected3.length > 10){
      this.openSmallDialog('Het maximum is 10 kaarten');
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.checkCount();
  }

  addCustomCard(list){
    list.push(
      { rotate: false, title: this.customField, description: '' },
    );
    this.customField = '';
  }

  onSubmit() {
    if(this.message.name && this.message.name.length > 1){
      this.form = true;
    }
  }

  createPdf(images){
    let col = {
      left: 1,
      right: 0
    }
    let props:any = {
      widthImg: 50,
      heighImg: 45,
      pageInTop: 10,
      pageInLeft: 5,
      page: {
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      }
    };

    let doc = new jsPDF(props.page);
    doc.setFont("times");
    doc.setFontSize(12);
    if(this.message.date){
      doc.text(moment().format('DD.MM.YYYY'), props.pageInLeft, props.pageInTop, { align: 'left'});
      props.pageInTop += 5;
    }
    doc.text(this.message.name, props.pageInLeft, props.pageInTop, { align: 'left'});
    props.pageInTop += 5;
    if(this.message.organization){
      doc.text(this.message.organization, props.pageInLeft, props.pageInTop, { align: 'left'});
      props.pageInTop += 5;
      col.left++;
    }
    if(this.message.rol){
      doc.text(this.message.rol, props.pageInLeft, props.pageInTop, { align: 'left'});
      props.pageInTop += 5;
      col.left++;
    }
    //other persone
    if(this.message.collega_name || this.message.collega_organization || this.message.collega_rol){
      this.message.date ? props.pageInTop = 15 : props.pageInTop = 10;
      props.pageInLeft = 100;

      if(this.message.collega_name){
        doc.text(this.message.collega_name, props.pageInLeft, props.pageInTop, { align: 'left'});
        props.pageInTop += 5;
        col.right++;
      }
      if(this.message.collega_organization){
        doc.text(this.message.collega_organization, props.pageInLeft, props.pageInTop, { align: 'left'});
        props.pageInTop += 5;
        col.right++;
      }
      if(this.message.collega_rol){
        doc.text(this.message.collega_rol, props.pageInLeft, props.pageInTop, { align: 'left'});
        props.pageInTop += 5;
        col.right++;
      }

      props.pageInLeft = 5;
    }
    let heightStep = col.right > col.left ? col.right : col.left;
    props.pageInTop = heightStep * 5 + 10;
    if(this.message.date){
      props.pageInTop += 5;
    }

    if(this.message.project){
      doc.text(this.message.project, props.pageInLeft, props.pageInTop, { align: 'left'});
    }

    doc.setFontSize(22);
    props.pageInTop+= 15;

    //Taken
    doc.text('Taken', props.pageInLeft, props.pageInTop, { align: 'left'});

    props.pageInTop += 5;

    images['tag1'].forEach(el => {
      if(props.pageInTop > 240){
        doc.addPage(props.page);
        props.pageInLeft = 5;
        props.pageInTop = 10;
      }
      if(props.pageInLeft > 165){
        props.pageInLeft = 5;
        props.pageInTop += props.heighImg;
      }
      doc.addImage(el, 'PNG', props.pageInLeft, props.pageInTop, props.widthImg, props.heighImg, '', 'SLOW');

      props.pageInLeft += props.widthImg;

      
    });

    if(images['tag1'] != 8){
      props.pageInTop += props.heighImg;
    }

    //Сompetenties
    props.pageInTop += 10;
    props.pageInLeft = 5;
    if(props.pageInTop > 225){
      doc.addPage(props.page);
      props.pageInLeft = 5;
      props.pageInTop = 10;
    }
    doc.text('Сompetenties', props.pageInLeft, props.pageInTop, { align: 'left'});
    props.pageInTop += 5;
    images['tag2'].forEach(el => {
      if(props.pageInTop > 240){
        doc.addPage(props.page);
        props.pageInLeft = 5;
        props.pageInTop = 10;
      }
      if(props.pageInLeft > 165){
        props.pageInLeft = 5;
        props.pageInTop += props.heighImg;
      }
      doc.addImage(el, 'PNG', props.pageInLeft, props.pageInTop, props.widthImg, props.heighImg, '', 'SLOW');

      props.pageInLeft += props.widthImg;
    });

    if(images['tag2'] != 8){
      props.pageInTop += props.heighImg;
    }

    //Сompetenties
    props.pageInTop += 10;
    props.pageInLeft = 5;
    if(props.pageInTop > 225){
      doc.addPage(props.page);
      props.pageInLeft = 5;
      props.pageInTop = 10;
    }
    doc.text('Persoonlijke Kwaliteiten', props.pageInLeft, props.pageInTop, { align: 'left'});
    props.pageInTop += 5;
    images['tag3'].forEach(el => {
      if(props.pageInTop > 240){
        doc.addPage(props.page);
        props.pageInLeft = 5;
        props.pageInTop = 10;
      }
      if(props.pageInLeft > 165){
        props.pageInLeft = 5;
        props.pageInTop += props.heighImg;
      }
      doc.addImage(el, 'PNG', props.pageInLeft, props.pageInTop, props.widthImg, props.heighImg, '', 'SLOW');

      props.pageInLeft += props.widthImg;
    });

    if(images['tag3'] != 8){
      props.pageInTop += props.heighImg;
    }

    // var string = doc.output('datauristring');
    // var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
    // var x = window.open();
    // x.document.open();
    // x.document.write(iframe);
    // x.document.close();
    doc.save(this.message.name+'.pdf');
  }

  formatedPDF(){
    this.progress.loaded = true;
    let promiseArr:any = {
      tag1: [],
      tag2: [],
      tag3: []
    };
    let images:any = {
      tag1: [],
      tag2: [],
      tag3: [],
    };

    let imageOption:any = {
      scale: 5,
      
    };

    document.querySelectorAll('#taken app-card').forEach(el => {
      promiseArr['tag1'].push(html2canvas(el, imageOption));
    });
    document.querySelectorAll('#competenties app-card').forEach(el => {
      promiseArr['tag2'].push(html2canvas(el, imageOption));
    });
    document.querySelectorAll('#Persoonlijke Kwaliteiten app-card').forEach(el => {
      promiseArr['tag3'].push(html2canvas(el, imageOption));
    });

    this.progress.element = promiseArr['tag3'].length + promiseArr['tag2'].length + promiseArr['tag1'].length;

    Promise.all(promiseArr['tag1']).then((values) => {
      values.forEach((el:any) => {
        images['tag1'].push(el.toDataURL())
      })
      Promise.all(promiseArr['tag2']).then((values) => {
        values.forEach((el:any) => {
          images['tag2'].push(el.toDataURL())
        })
        Promise.all(promiseArr['tag3']).then((values) => {
          values.forEach((el:any) => {
            images['tag3'].push(el.toDataURL())
          });
          this.createPdf(images);
        });
      });
    });
  }

  condition(){
    return this.message.name &&
      this.message.name.length > 1 &&
      this.selected1.length > 0 && 
      this.selected1.length < 8 && 
      this.selected2.length > 0 && 
      this.selected2.length < 11 && 
      this.selected3.length > 0 && 
      this.selected3.length < 11;
  }

  ngOnInit() {
  }
}
