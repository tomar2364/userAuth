/* eslint-disable prettier/prettier */
describe('Testing API Endpoints Using Cypress', () => {
  let authToken = '';
  let userId = '';
  const randomNumber = Math.floor(Math.random() * 10000 + 1);
  
  it('signup with existing user in database', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/auth/signup',
      body: {
        UserName: 'Mintu1',
        password: 'Min1234567',
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
      expect(res.body.message).to.eq(
        'User with UserName => "Mintu1"already exisit',
      );
    });
  });
  it('signup with non existing user in database', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/auth/signup',
      body: {
        UserName: 'MintuK' + randomNumber,
        password: 'Min1234567',
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(201);
    });
  });
  it('signup with weak password', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/auth/signup',
      body: {
        UserName: 'MintuK' + randomNumber,
        password: '123456789',
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.message).to.include('password too weak');
    });
  });
  it('signup with too long password', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/auth/signup',
      body: {
        UserName: 'MintuK' + randomNumber,
        password: '1234567896151684984984189494984849',
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.message).to.include('password too weak');
      expect(res.body.message).to.include(
        'password must be shorter than or equal to 20 characters',
      );
    });
  });
  it('signup with too short password', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/auth/signup',
      body: {
        UserName: 'MintuK' + randomNumber,
        password: '12345',
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.message).to.include('password too weak');
      expect(res.body.message).to.include(
        'password must be longer than or equal to 8 characters',
      );
    });
  });
  it('signup without username and password', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/auth/signup',
      body: {
        UserName: '',
        password: '',
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.message).to.include('UserName should not be empty');
      expect(res.body.message).to.include(
        'UserName must be longer than or equal to 5 characters',
      );
      expect(res.body.message).to.include('password too weak');
      expect(res.body.message).to.include(
        'password must be longer than or equal to 8 characters',
      );
    });
  });
  it('Get authToken from users database', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/auth/signin',
      body: {
        UserName: 'Mintu1',
        password: 'Min1234567',
      },
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property('accessToken');
      authToken = res.body.accessToken;
    });
  });
  it('Signin with wrong username and password', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/auth/signin',
      body: {
        UserName: 'Mint132',
        password: 'Min1234567',
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body.message).to.eq('Invalid Credentials');
    });
  });
  it('Signin without username', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/auth/signin',
      body: {
        UserName: '',
        password: 'Min1234567',
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.message).to.include('UserName should not be empty');
      expect(res.body.message).to.include(
        'UserName must be longer than or equal to 5 characters',
      );
    });
  });
  it('Signin without password', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/auth/signin',
      body: {
        UserName: 'Mintu1',
        password: '',
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.message).to.include('password too weak');
      expect(res.body.message).to.include(
        'password must be longer than or equal to 8 characters',
      );
    });
  });
  it('Signin with too long username', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/auth/signin',
      body: {
        UserName: 'Mintujnacnadbfjamfklnakjckjnaksc',
        password: 'Min1234567',
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.message).to.include(
        'UserName must be shorter than or equal to 20 characters',
      );
    });
  });
  //GET .......

  it('Test GET Request', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/users',
      headers: {
        authorization: 'Bearer ' + authToken,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body[0]).to.have.all.keys('name', 'id');
    });
  });
  it('Test GET Request without authtoken', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/users/',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.eq('Unauthorized');
    });
  });
  //post....
  it('Test POST Request', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/users',
      body: {
        Name: 'Mintu',
      },
      headers: {
        authorization: 'Bearer ' +authToken,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.be.a('string');
      userId = response.body;
    });
  });
  it('Test POST Request without Name', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/users',
        body: {
          Name: '',
        },
        headers: {
          authorization: 'Bearer ' +authToken,
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.include('Name should not be empty');
      });
    });

  it('Test POST Request without authtoken', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/users',
      body: {
        Name: 'Mintu',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.eq('Unauthorized');
    });
  });

  it('Test Get Request with id', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/users/' + userId,
      headers: {
        authorization: 'Bearer ' + authToken,
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.all.keys('name', 'ownerId', '_id', '__v');
      expect(res.body).to.be.a('object');
      expect(res.body._id).to.eq(userId);
    });
  });
  it('Test Get Request with id wrong userid', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/users/61a86adfda190c59b6d66c73',
      headers: {
        authorization: 'Bearer ' + authToken,
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
      expect(res.body).to.be.a('object');
      expect(res.body.message).to.eq(
        'User with ID "61a86adfda190c59b6d66c73" not found',
      );
    });
  });
  it('Test Get Request with id and without authtoken', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/users/61a86adfda190c59b6d66c73',
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body.message).to.eq('Unauthorized');
    });
  });
  // Patch request .........

  it('Test PATCH Request', () => {
    cy.request({
      method: 'PATCH',
      url: 'http://localhost:3000/users/' + userId,
      body: {
        Name: 'Aahoo!!',
      },
      headers: {
        authorization: 'Bearer ' + authToken,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.all.keys('name', 'ownerId', '_id', '__v');
      expect(response.body.name).to.eq('Aahoo!!');
    });
  });
  it('Test PATCH Request without Name', () => {
    cy.request({
      method: 'PATCH',
      url: 'http://localhost:3000/users/' + userId,
      body: {
        Name: '',
      },
      headers: {
        authorization: 'Bearer ' + authToken,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.be.a('object');
      expect(response.body.message).to.include('Name should not be empty');
    });
  });
  it('Test PATCH Request without userid', () => {
    cy.request({
      method: 'PATCH',
      url: 'http://localhost:3000/users/',
      body: {
        Name: 'Aahoo!!',
      },
      headers: {
        authorization: 'Bearer ' + authToken,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.be.a('object');
      expect(response.body.message).to.eq('Cannot PATCH /users/');
    });
  });
  it('Test PATCH Request with wrong userid', () => {
    cy.request({
      method: 'PATCH',
      url: 'http://localhost:3000/users/61a86adfda190c59b6d76c03',
      body: {
        Name: 'Aahoo!!',
      },
      headers: {
        authorization: 'Bearer ' + authToken,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.be.a('object');
      expect(response.body.message).to.eq(
        'User with ID "61a86adfda190c59b6d76c03" not found',
      );
    });
  });
  it('Test PATCH Request with wrong authtoken', () => {
    cy.request({
      method: 'PATCH',
      url: 'http://localhost:3000/users/61a86adfda190c59b6d76c03',
      body: {
        Name: 'Aahoo!!',
      },

      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.be.a('object');
      expect(response.body.message).to.eq('Unauthorized');
    });
  });
  //Delete Request ........

  it('Test Delete Request', () => {
    cy.request({
      method: 'Delete',
      url: 'http://localhost:3000/users/' + userId,
      headers: {
        authorization: 'Bearer ' + authToken,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.empty;
    });
  });
  it('Test Delete Request without authtoken', () => {
    cy.request({
      method: 'Delete',
      url: 'http://localhost:3000/users/' + userId,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.be.a('object');
      expect(response.body.message).to.eq('Unauthorized');
    });
  });
  it('Test Delete Request without userid', () => {
    cy.request({
      method: 'Delete',
      url: 'http://localhost:3000/users/',
      headers: {
        authorization: 'Bearer ' + authToken,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.message).to.eq('Cannot DELETE /users/');
    });
  });
  it('Test Delete Request with wrong userid', () => {
    cy.request({
      method: 'Delete',
      url: 'http://localhost:3000/users/61a86adfda190c59b6d76c03',
      headers: {
        authorization: 'Bearer ' + authToken,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.message).to.eq(
        'User with ID "61a86adfda190c59b6d76c03" not found',
      );
    });
  });
});
