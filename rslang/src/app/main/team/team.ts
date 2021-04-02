import { Component } from '@angular/core';
import { Contributer } from './../../shared/models/contributor.model';
@Component({
  selector: 'app-team',
  templateUrl: './team.html',
  styleUrls: ['./team.scss'],
})
export class Team {
  contributors: Contributer[] = [
    {
      name: 'Rudolph',
      position: 'team leader',
      contribution: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Dolor risus sed cras enim aliquam pulvinar dui augue.
      Adipiscing viverra eu tellus felis urna diam platea dignissim morbi.`,
      github: 'https://github.com/whattablackhole',
    },
    {
      name: 'Anna Tolstova',
      position: 'team leader',
      contribution: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Dolor risus sed cras enim aliquam pulvinar dui augue.
      Adipiscing viverra eu tellus felis urna diam platea dignissim morbi.`,
      github: 'https://github.com/Anntol',
    },
    {
      name: 'Tatsiana Kastrubai',
      position: 'team leader',
      contribution: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Dolor risus sed cras enim aliquam pulvinar dui augue.
      Adipiscing viverra eu tellus felis urna diam platea dignissim morbi.`,
      github: 'https://github.com/kastrubait',
    },
    {
      name: 'Natali Tverdokhlibova',
      position: 'team leader',
      contribution: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Dolor risus sed cras enim aliquam pulvinar dui augue.
      Adipiscing viverra eu tellus felis urna diam platea dignissim morbi.`,
      github: 'https://github.com/coriander31415',
    },
    {
      name: 'Alena Budnik',
      position: 'team leader',
      contribution: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Dolor risus sed cras enim aliquam pulvinar dui augue.
      Adipiscing viverra eu tellus felis urna diam platea dignissim morbi.`,
      github: 'https://github.com/superpuper777',
    },
    {
      name: 'Khan Maliká',
      position: 'team leader',
      contribution: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Dolor risus sed cras enim aliquam pulvinar dui augue.
      Adipiscing viverra eu tellus felis urna diam platea dignissim morbi.`,
      github: 'https://github.com/EvilKami7',
    },
    {
      name: 'Andrew Zubkov',
      position: 'team leader',
      contribution: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Dolor risus sed cras enim aliquam pulvinar dui augue.
      Adipiscing viverra eu tellus felis urna diam platea dignissim morbi.`,
      github: 'https://github.com/nofishtou',
    },
  ];
}
