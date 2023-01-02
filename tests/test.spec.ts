import superagent from "superagent";
describe("API_test_1", function () {
  test("checking the test with the get command", async () => {
    const response = await superagent.get("https://jsonplaceholder.typicode.com/posts/2");
    console.log(response.body);
    expect(response.status).toBe(200);
  });
});
describe("API_test_2", function () {
  test("checking the test with the get command", async () => {
    const response = await superagent.get("https://jsonplaceholder.typicode.com/comments/2");
    console.log(response.body);
    expect(response.status).toBe(200);
  });
});
describe("API_test_3", () => {
  it("body check", async () => {
    const res = await superagent.head("https://jsonplaceholder.typicode.com/comments?postId=1");
    expect(res.body).toEqual({});
  });
});
describe("API_test_4", function () {
  test("statusCode check", async () => {
    const response = await superagent.get("https://jsonplaceholder.typicode.com/albums");
    console.log(response.statusCode);
    expect(response.status).toBe(200);
  });
});
describe("API_test_5", () => {
  test("checking the error response", async () => {
    try {
      await superagent.get("https://reqres.in/api/users/12");
    } catch (error: any) {
      expect(error.status).toBe(404);
    }
  });
});

const expectedObj: { name: string; job: string } = {
  name: "John",
  job: "manager",
};
describe("API_test_6", () => {
  it("add new data", async () => {
    const res = await superagent
      .put("https://jsonplaceholder.typicode.com/comments/1")
      .set("Content-Type", "application/json")
      .send({ name: "John", job: "manager" });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toEqual(expectedObj.name);
    expect(res.body.job).toEqual(expectedObj.job);
    console.log(res.body);
  });
});
describe("API_test_7", () => {
  test("add not certain data", async () => {
    let response: any;
    try {
      response = await superagent
        .post("https://jsonplaceholder.typicode.com/posts")
        .set("Content-Type", "application/json")
        .send({
          title: "not certain",
          body: "not certain",
        });
    } catch (error: any) {
      throw new Error(`The system gave an error ${error}`);
    }
    console.log("response => ", response.body);

    expect(response.body.body).toEqual("not certain");
    expect(response.body.title).toEqual("not certain");
  });
});
describe("API_test_8", () => {
  it("error checking", async () => {
    try {
      await superagent.delete("https://jsonplaceholder.typicode.com/posts/1");
    } catch (error: any) {
      expect(error.status).toBe(204);
      expect(error.body).toEqual(undefined);
    }
  });
});
describe("API_test_9", () => {
  it("error checking", async () => {
    try {
      await superagent.delete("https://jsonplaceholder.typicode.com/albums/5");
    } catch (error: any) {
      expect(error.status).toBe(204);
      expect(error.body).toEqual(undefined);
    }
  });
});

describe("API_test_10", () => {
  it("error checking", async () => {
    try {
      await superagent.get("https://jsonplaceholder.typicode.com/users?name=Leanne%20Graham");
    } catch (error: any) {
      expect(error.status).toBe(404);
      expect(error.body).toEqual(undefined);
    }
  });
});
describe("API_test_11", () => {
  it("data verification", async () => {
    let response: any;
    try {
      response = await superagent.post("https://jsonplaceholder.typicode.com/users").query({ name: "Ervin Howell" });
    } catch (error: any) {
      throw new Error(`${error}`);
    }

    console.log(response.body);
  });
});
describe("API_test_12", () => {
  it("checking data with query parameters", async () => {
    let response: any;
    try {
      response = await superagent.get("https://jsonplaceholder.typicode.com/users").query({ name: "Ervin Howell" });
    } catch (error: any) {
      throw new Error(`${error}`);
    }
    expect(response.status).toBe(200);
    console.log(response.body);
  });
});
describe("API_test_13", () => {
  it("adding new data", async () => {
    const myDate: { name: string; email: string } = {
      name: "Yury",
      email: "purumpurum@gmail.com",
    };
    const response = await superagent
      .post("https://jsonplaceholder.typicode.com/users")
      .set("Content-Type", "application/json")
      .send({ name: myDate["name"], email: myDate["email"] });
    expect(response.status).toBe(201);
    expect(response.body.name).toEqual(myDate.name);
    expect(response.body.email).toEqual(myDate.email);
    expect(Number(response.body.id)).toBeLessThan(1000);
  });
});
