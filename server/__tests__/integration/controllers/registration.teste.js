import request from 'supertest';
import createAdminUser from '../../util/createAdminUser';

import app from '../../../src/app';
import truncate from '../../util/truncate';

const credentials = {
  email: 'admin@gympoint.com',
  password: 'password',
};

const defaultPlanData = {
  student_id: 1,
  duration: 1,
  price: 129,
};

describe('Registration/Index', () => {
  beforeEach(async () => {
    await truncate();
    await createAdminUser();
  });

  it('should be able to show a list of registrations', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const response = await request(app)
      .get(`/registrations`)
      .set('Authorization', `Bearer ${token}`);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should not be able to show a list of registrations without autentication', async () => {
    const response = await request(app).get(`/registrations`);

    expect(response.status).toBe(401);
  });
});

describe('Registration/Store', () => {
  beforeEach(async () => {
    await truncate();
    await createAdminUser();
  });

  it('should be able to register', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/registrations')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultPlanData);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register without authenticate', async () => {
    const response = await request(app)
      .post('/registrations')
      .send(defaultPlanData);

    expect(response.status).toBe(401);
  });

  it('should not be able to register without title', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/registrations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        duration: 1,
        price: 129,
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to register without duration', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/registrations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Start',
        price: 129,
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to register with invalid duration', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/registrations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Start',
        duration: -1,
        price: 129,
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to register without price', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/registrations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Start',
        duration: 1,
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to register with invalid price', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/registrations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Start',
        duration: -1,
        price: 0,
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to register with duplicated title', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    await request(app)
      .post('/registrations')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultPlanData);

    const response = await request(app)
      .post('/registrations')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultPlanData);

    expect(response.status).toBe(400);
  });
});

/*
describe('Registration/Update', () => {
  beforeEach(async () => {
    await truncate();
    await createAdminUser();
  });

  it('should be able to update', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const planResponse = await request(app)
      .post('/registrations')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultPlanData);

    const { id } = planResponse.body;

    const response = await request(app)
      .put(`/registrations/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gold',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to update without authenticate', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const planResponse = await request(app)
      .post('/registrations')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultPlanData);

    const { id } = planResponse.body;

    const response = await request(app)
      .post(`/registrations/${id}`)
      .send({
        title: 'Gold',
        duration: 3,
        price: 109,
      });

    expect(response.status).toBe(401);
  });

  it('should not be able to update invalid plan', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const response = await request(app)
      .put(`/registrations/0`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gold',
      });

    expect(response.status).toBe(400);
  });

  it('should be able to update plan title', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const planResponse = await request(app)
      .post('/registrations')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultPlanData);

    const { id } = planResponse.body;

    const response = await request(app)
      .put(`/registrations/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gold',
      });

    expect(response.body).toHaveProperty('title');
    expect(response.body.title).toBe('Gold');
  });

  it('should not be able to update plan title with a already registered title', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const studentResponse = await request(app)
      .post('/registrations')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultPlanData);

    const { id } = studentResponse.body;

    const response = await request(app)
      .put(`/registrations/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: defaultPlanData.title,
      });

    expect(response.status).toBe(400);
  });

  it('should be able to update plan duration', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const planResponse = await request(app)
      .post('/registrations')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultPlanData);

    const { id } = planResponse.body;

    const response = await request(app)
      .put(`/registrations/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        duration: 3,
      });

    expect(response.body).toHaveProperty('duration');
    expect(response.body.duration).toBe(3);
  });

  it('should not be able to update plan with invalid duration', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const planResponse = await request(app)
      .post('/registrations')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultPlanData);

    const { id } = planResponse.body;

    const response = await request(app)
      .put(`/registrations/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        duration: 0,
      });

    expect(response.status).toBe(400);
  });

  it('should be able to update plan price', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const planResponse = await request(app)
      .post('/registrations')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultPlanData);

    const { id } = planResponse.body;

    const response = await request(app)
      .put(`/registrations/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        price: 109.0,
      });

    expect(response.body).toHaveProperty('price');
    expect(response.body.price).toBe(109.0);
  });

  it('should not be able to update plan with invalid price', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const planResponse = await request(app)
      .post('/registrations')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultPlanData);

    const { id } = planResponse.body;

    const response = await request(app)
      .put(`/registrations/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        price: 0.0,
      });

    expect(response.status).toBe(400);
  });
});

describe('Registration/Destroy', () => {
  beforeEach(async () => {
    await truncate();
    await createAdminUser();
  });

  it('should be able to delete specific plan', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const planResponse = await request(app)
      .post('/registrations')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultPlanData);

    const { id } = planResponse.body;

    const response = await request(app)
      .delete(`/registrations/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to delete a plan without authenticate', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const planResponse = await request(app)
      .post('/registrations')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultPlanData);

    const { id } = planResponse.body;

    const response = await request(app).delete(`/registrations/${id}`);

    expect(response.status).toBe(401);
  });

  it('should not be able to delete a invalid plan', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const response = await request(app)
      .delete('/registrations/0')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});
*/
