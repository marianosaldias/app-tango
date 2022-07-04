import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { UserService } from './user.service';

fdescribe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;    

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.get(UserService);
    httpTestingController = TestBed.get(HttpTestingController); 
  });

  fit('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  fit('should get data from UserService service', () => {
    // Arrange
    const expectData = [
      {
        _id: "5e4166d016e2493964aa78e3",
        firstName: "Nina",
        lastName: "Valley",
        nick: "Cathy",
        profile: "Commander",
        status: "Disabled",
        email: "catyvalley@gmail.com",
        phone: "(11) 4535 6854",
        password: "123456",
      },
      {
        _id: "5e41674116e2493964aa78e4",
        firstName: "Carla",
        lastName: "Brunni",
        nick: "Carla",
        profile: "Super",
        status: "Enabled",
        email: "carlabrunni@gmail.com",
        phone: "(11) 6632 7679",
        password: "111111",
      },
    ];
    let dataError, dataResponse;
    
    // Act
    service.getUsers()
    .subscribe((response) => {
      dataResponse = response;
    }, (error) => {
      dataError = error;
    });
    const req = httpTestingController.expectOne(`http://localhost:3000/api/users/`);
    req.flush(expectData);
    
    // Assert
    expect(dataResponse.length).toEqual(2);
    expect(req.request.method).toEqual('GET');
    expect(dataError).toBeUndefined();
  }); 

});