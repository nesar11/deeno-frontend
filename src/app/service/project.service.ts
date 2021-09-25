import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  // uri = 'http://localhost:4001/projects';
  uri = environment.apiUrl

  constructor( private http: HttpClient) { }
  addProject(projectName, story, duration, startTime, endTime, status){
    const obj = {
      projectName,
      story,
      duration,
      startTime,
      endTime,
      status
    };
    console.log(obj);
    this.http.post(`${this.uri}/projects/add`, obj)
    .subscribe(res => console.log('project add success'))
  }

  getProjects(){
    return this.http.get(`${this.uri}/projects`);

  }
  editProject(id){
    return this.http.get(`${this.uri}/projects/edit/${id}`);

  }

  updateProject(projectName, story, duration, startTime, endTime, status, id){
    const obj = {
      projectName,
      story,
      duration,
      startTime,
      endTime,
      status
    };
    this.http.post(`${this.uri}/projects/update/${id}`, obj)
    .subscribe(res=> console.log(' project updated'))

  }

  deleteProject(id){
    return this.http.get(`${this.uri}/projects/delete/${id}`);
  }
}
