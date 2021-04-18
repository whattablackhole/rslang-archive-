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
      position: 'Team Leader',
      contribution: 'Sprint , Audiocall, Header, Footer, Base services',
      github: 'https://github.com/whattablackhole',
      img: 'assets/images/rudolph.jpg',
    },
    {
      name: 'Anna Tolstova',
      position: 'Database Guru',
      contribution: 'Authorization, MongoDB, interaction with the backend, Deployment',
      github: 'https://github.com/Anntol',
      img: 'https://avatars.githubusercontent.com/u/10944996?v=4',
    },
    {
      name: 'Tatsiana Kastrubai',
      position: 'Team Communicator',
      // eslint-disable-next-line @typescript-eslint/quotes
      contribution: `Ebook, Dictionary, Settings, Linter rules`,
      github: 'https://github.com/kastrubait',
      img: 'assets/images/tatsiana.jpg',
    },
    {
      name: 'Natali Tverdokhlibova',
      position: 'Justice of the peace',
      contribution: 'Figma design, Match Pair Game',
      github: 'https://github.com/coriander31415',
      img: 'assets/images/nata_lee.jpg',
    },
    {
      name: 'Alena Budnik',
      position: 'Idea\'s Generator',
      contribution: 'Main, About, Not Found pages, part of Savannah',
      github: 'https://github.com/superpuper777',
      img: 'https://avatars.githubusercontent.com/u/31541313?v=4',
    },
    {
      name: 'Khan Maliká',
      position: 'Statistics Guru',
      contribution: 'Statisctic, Module structure',
      github: 'https://github.com/EvilKami7',
      img: 'assets/images/malika.jpg',
    },
    {
      name: 'Andrew Zubkov',
      position: 'Team Mascot',
      contribution: 'Routing structure, Savannah',
      github: 'https://github.com/nofishtou',
      img: 'https://avatars.githubusercontent.com/u/36769971?v=4',
    },
  ];
}
