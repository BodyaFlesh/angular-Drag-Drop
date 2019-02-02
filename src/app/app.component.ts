import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  private message:any       = {
    name  : '',
    name2 : ''
  };

  private progress:any   = {
    loaded: false
  };
  private content:boolean   = false;
  private modal:boolean     = false;
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
    { title:  'Verbinden tussen jou en collega’s van andere scholen', description: 'Verbinden van mede-initiatiefnemers van scholen onderling' },
    { title:  'Verbinden van partijen buiten de school', description: 'Verbinden van mensen vanuit overheden, bedrijfsleven en maatschappelijke partijen' },
    { title:  'Verbinden van collega’s in school', description: 'Verbinden van docenten, teamleiders en CvB' },
    { title:  'Korte lijntjes aanleggen', description: 'Zorgdragen voor aanleg en onderhoud van makkelijk toegankelijke contacten' },
    { title:  'Acquireren ', description: 'Werven van vraagstukken in de regio' },
    { title:  'Vragen articuleren', description: 'Realiteitsgehalte van projecten inschatten irt beoogde betrokkenen ' },
    { title:  'Mentaliteitsverandering realiseren', description: 'Mentaliteitsverandering bij medewerkers binnen je onderwijsinstelling realiseren ' },
    { title:  'Organiseren van activiteiten', description: 'Actieve betrokkenheid bij de organisatie (in detail) van activiteiten en de PR daarvoor. Afspraken helpen vastleggen en draaiboeken (helpen) maken' },
    { title:  'Reality checks uitvoeren', description: 'Reality checks uitvoeren' },
    { title:  'Aansturen van individuen', description: 'Aansturen van individuen met verschillende achtergronden en belangen' },
    { title:  'Aansturen van groepen ', description: 'Aansturen van diverse groepen' },
    { title:  'Stimuleren van individuen', description: 'Stimuleren van individuen met verschillende achtergronden en belangen' },
    { title:  'Stimuleren van groepen', description: 'Stimuleren van groepen met verschillende achtergronden en belangen' },
    { title:  'Informatie delen', description: 'Continu actief informatie delen' },
    { title:  'Uitleggen', description: 'Continu goed uitleggen waarom bepaalde informatie voor iemand van belang is' },
    { title:  'Verwachtingsmanagement voeren', description: 'Verwachtingsmanagement voeren tussen betrokken interne en externe partijen' },
    { title:  'Benoemen van resultaat', description: 'Benoemen van positieve resultaten en slagkracht van anderen' },
    { title:  'Zichtbaarheid organiseren', description: 'PR organiseren over good practices (zichtbaar maken) ' },
    { title:  'Vervolgacties expliciteren', description: 'Vervolgacties continu expliciteren ' },
    { title:  'Vervolgacties concretiseren', description: 'Vervolgacties (helpen) concretiseren' },
    { title:  'Breed communiceren ', description: 'Helder het doel en belang van een activiteit communiceren naar alle betrokkenen' },
    { title:  'Prikkelen', description: 'Prikkelen van nieuwsgierigheid' },
    { title:  'Aanjagen van eigenaarschap', description: 'Aanjagen van eigenaarschap' },
    { title:  'Aanjagen van persoonlijk leiderschap', description: 'Aanjagen van persoonlijk leiderschap' },
    { title:  'Begeleiden van studenten terwijl in contact met  externen', description: 'Directe betrokkenheid bij zowel de begeleiding van studenten als contacten met externen' },
    { title:  'Directe betrokkenheid bij zowel de begeleiding van studenten als contacten met externen', description: 'Coachen van studenten in het licht van externe relaties ' },
    { title:  'Netwerk visualiseren', description: 'In beeld brengen van relevante netwerken' },
    { title:  'Contacteren opdrachtgevers', description: 'Actief contacten leggen met opdrachtgevers en klanten' },
    { title:  'Relatiebeheer voeren', description: 'Actief contacten onderhouden met interne en externe betrokkenen' },
    { title:  'Beinvloeden onderwijsorganisatie', description: 'Invloed uitoefenen op het (flexibiliseren van) de onderwijsorganisatie' },
    { title:  'Participeren in projecten', description: 'Actieve participatie in werkgroepen en projecten' },
    { title:  'Organiseren van reflectie', description: 'Organiseren van reflectie op projectinhoud en –proces met betrokken partijen ' },
    { title:  'Faciliteren van reflectie', description: 'Faciliteren van reflectie op projectinhoud en –proces met betrokken partijen ' }
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
    { title:  'Alternatieven kunnen bieden voor afspraken (Zie ik je op de 9e? Zo niet dan bel ik je om een nieuwe afspraak te maken)', description: '' },
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
    { title:  'Prikkelend', description: '' },
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

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  onSubmit() {
    if(this.message.name.length > 1){
      this.content = true;
    }
  }

  createPdf(images){
    console.log(images);

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
    
    doc.setFontSize(20);
    doc.text(this.message.name, props.pageInLeft, props.pageInTop, { align: 'left'});
    if(this.message.name2){
      doc.text(this.message.name2, 205, props.pageInTop, { align: 'right', });
    }
    doc.setFontSize(24);
    props.pageInTop = 25;

    //Taken
    doc.text('Taken', props.pageInLeft, props.pageInTop, { align: 'left'});

    props.pageInTop += 5;

    images['tag1'].forEach(el => {
      doc.addImage(el, 'PNG', props.pageInLeft, props.pageInTop, props.widthImg, props.heighImg, '', 'SLOW');

      props.pageInLeft += props.widthImg;

      if(props.pageInLeft > 165){
        props.pageInLeft = 5;
        props.pageInTop += props.heighImg;
      }
    });

    if(images['tag1'] != 8){
      props.pageInTop += props.heighImg;
    }

    //Taakgerichte competenties
    props.pageInTop += 10;
    props.pageInLeft = 5;
    doc.text('Taakgerichte competenties', props.pageInLeft, props.pageInTop, { align: 'left'});
    props.pageInTop += 5;
    images['tag2'].forEach(el => {
      doc.addImage(el, 'PNG', props.pageInLeft, props.pageInTop, props.widthImg, props.heighImg, '', 'SLOW');

      props.pageInLeft += props.widthImg;

      if(props.pageInLeft > 165){
        props.pageInLeft = 5;
        props.pageInTop += props.heighImg;
      }
      if(props.pageInTop > 250){
        doc.addPage(props.page);
        props.pageInLeft = 5;
        props.pageInTop = 10;
      }
    });

    if(images['tag2'] != 8){
      props.pageInTop += props.heighImg;
    }

    //Taakgerichte competenties
    props.pageInTop += 10;
    props.pageInLeft = 5;
    doc.text('Persoonskenmerken', props.pageInLeft, props.pageInTop, { align: 'left'});
    props.pageInTop += 5;
    images['tag3'].forEach(el => {
      doc.addImage(el, 'PNG', props.pageInLeft, props.pageInTop, props.widthImg, props.heighImg, '', 'SLOW');

      props.pageInLeft += props.widthImg;

      if(props.pageInLeft > 165){
        props.pageInLeft = 5;
        props.pageInTop += props.heighImg;
      }
      if(props.pageInTop > 250){
        doc.addPage(props.page);
        props.pageInLeft = 5;
        props.pageInTop = 10;
      }
    });

    if(images['tag3'] != 8){
      props.pageInTop += props.heighImg;
    }
    
    doc.save('pdf.pdf');
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
      scale: 5
    };

    document.querySelectorAll('.taken-light-section app-card').forEach(el => {
      promiseArr['tag1'].push(html2canvas(el, imageOption));
    });
    document.querySelectorAll('.competensies-light-section app-card').forEach(el => {
      promiseArr['tag2'].push(html2canvas(el, imageOption));
    });
    document.querySelectorAll('.kenmerken-light-section app-card').forEach(el => {
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

  ngOnInit() {

  }
}
