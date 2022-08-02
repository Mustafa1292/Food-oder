const request = require("supertest");
const { response } = require("./index");
const app = require('./index')

describe("app", () => {

    beforeEach(() => {
        console.log("before test");
    });

    afterEach(() => {
        console.log("after test");
    });

    describe("routes", () => {

        /*test('check if the backend is working', async () => {
            const response = await request(app).get("/");
            expect(response.statusCode).toBe(200);
        });*/
    });

    describe("users", () => {

        test('get all users', async () =>{
            const response = await request(app).get("/users");
            expect(response.statusCode).toBe(200);
        })

        test('error from user not being real', async () =>{
            const response = await request(app).get("/users/one/0");
            expect(response.statusCode).toBe(401);
        })

        test('real user is got', async () =>{
            const response = await request(app).get("/users/one/61762570b17f39d297a953c0");
            expect(response.statusCode).toBe(200);
        })

        test('create a user', async () => {
            const response = await request(app).post("/users/create").send({
                first: "unit testing create",
                last: "make new user",
                email: "t@gmail.com",
                password: "1234567890"
            });
            expect(response.statusCode).toBe(200);
        })

        /*test('fail create a user', async () => {
            const response = await request(app).post("/users/create").send({
                id: "dxfb"
            });
            expect(response.statusCode).toBe(401);
        });*/

        test('update a user', async () => {
            const response = await request(app).put("/users/update/6174894127a79df113e5d3ce").send({
                first: "unit testing create",
                last: "update user",
                email: "t@gmail.com",
                password: "1234567890",
            });
            expect(response.statusCode).toBe(200);
        })

        test('fail at updating a user', async () => {
            const response = await request(app).put("/users/update/0").send({
                first: "unit testing create",
                last: "update user",
                email: "t@gmail.com",
                password: "1234567890",
            });
            expect(response.statusCode).toBe(401);
        })

    });

    describe("tables", () => {

        test('get all tables', async () =>{
            const response = await request(app).get("/resv/getall");
            expect(response.statusCode).toBe(200);
        });

        test('got one reservation', async () =>{
            const response = await request(app).get("/resv/getone/308");
            expect(response.statusCode).toBe(200);
        });

        test('fail to get one reservation', async () =>{
            const response = await request(app).get("/resv/getone/6194235b430382d0486b8f58");
            expect(response.statusCode).toBe(401);
        });

        test('create a reservation', async () => {
            const response = await request(app).post("/resv/create").send({
                client: "reservation",
                tables: "table",
                res_cost: "0.00",
                date_resv: new Date("2021-11-16T21:32:11.919+00:00")
            });
            expect(response.statusCode).toBe(200);
        });    

        test('fail create a reservation', async () => {
            const response = await request(app).post("/resv/create").send({
                error:""
            });
            expect(response.statusCode).toBe(401);
        });

        test('get all tables avaliable', async () =>{
            const response = await request(app).get("/resv/tables");
            expect(response.statusCode).toBe(200);
        });

    });

});