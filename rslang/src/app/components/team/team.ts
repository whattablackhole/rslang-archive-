import { Component } from '@angular/core';
import { Contributer } from '../models/contributor.model';
@Component({
  selector: 'app-team',
  templateUrl: './team.html',
  styleUrls: ['./team.scss'],
})
export class Team {
  contributors: Contributer[] = [
    {
      name: 'Rudolf Hrytsenyak',
      position: 'team leader',
      contribution: 'Lorem ipsum dolor sit amet',
      github: 'https://github.com/whattablackhole',
      url: '../../../assets/images/team/Rudolf.jpg',
    },
    {
      name: 'Anna Tolstova',
      position: 'team leader',
      contribution: 'Lorem ipsum dolor sit amet',
      github: 'https://github.com/Anntol',
      url: '../../../assets/images/team/person_pic.jpeg',
    },
    {
      name: 'Tatsiana Kastrubai',
      position: 'team leader',
      contribution: 'Lorem ipsum dolor sit amet',
      github: 'https://github.com/kastrubait',
      url: '../../../assets/images/team/person_pic.jpeg',
    },
    {
      name: 'Natali Tverdokhlibova',
      position: 'team leader',
      contribution: 'Lorem ipsum dolor sit amet',
      github: 'https://github.com/coriander31415',
      url: '../../../assets/images/team/person_pic.jpeg',
    },
    {
      name: 'Alena Budnik',
      position: 'team leader',
      contribution: 'Lorem ipsum dolor sit amet',
      github: 'https://github.com/superpuper777',
      url: '../../../assets/images/team/person_pic.jpeg',
    },
    {
      name: 'Khan Maliká',
      position: 'team leader',
      contribution: 'Lorem ipsum dolor sit amet',
      github: 'https://github.com/EvilKami7',
      url: '../../../assets/images/team/person_pic.jpeg',
    },
    {
      name: 'Andrew Zubkov',
      position: 'team leader',
      contribution: 'Lorem ipsum dolor sit amet',
      github: 'https://github.com/nofishtou',
      url: '../../../assets/images/team/person_pic.jpeg',
    },
  ];
}
