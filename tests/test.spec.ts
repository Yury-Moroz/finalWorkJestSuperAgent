import superagent from "superagent";
import { StatusCode } from "../fixtures/statusCode";
import { url } from "../fixtures/url";
import { Expectations } from "../fixtures/expectations";
import { expectationsUndefined } from "../fixtures/expectationUndifined";
import { Query } from "../fixtures/query";

describe("API_test_1", function () {
  test("checking the test with the get command", async () => {
    const response = await superagent.get(url.posts2);
    expect(response.status).toBe(StatusCode.STATUS_200);
  });
});
describe("status check", function () {
  test("checking the test with the get command", async () => {
    const response = await superagent.get(url.comments2);
    expect(response.status).toBe(StatusCode.STATUS_200);
  });
});
describe("API_test_3", () => {
  it("body check", async () => {
    const response = await superagent.head(url.postId1).query({ name: Query.QUERY_ID });
    expect(response.body).toEqual({});
  });
});
describe("API_test_4", function () {
  test("statusCode check", async () => {
    const response = await superagent.get(url.albums);
    expect(response.status).toBe(StatusCode.STATUS_200);
  });
});
describe("API_test_5", () => {
  test("checking the error response", async () => {
    try {
      await superagent.get(url.users12);
    } catch (error: any) {
      expect(error.status).toBe(StatusCode.STATUS_404);
    }
  });
});

const expectedObj: { name: string; job: string } = {
  name: Expectations.NAME_JOHN,
  job: Expectations.JOB_MANAGER,
};
describe("API_test_6", () => {
  it("add new data", async () => {
    const res = await superagent
      .put(url.comments1)
      .set("Content-Type", "application/json")
      .send({ name: Expectations.NAME_JOHN, job: Expectations.JOB_MANAGER });
    expect(res.statusCode).toBe(StatusCode.STATUS_200);
    expect(res.body.name).toEqual(expectedObj.name);
    expect(res.body.job).toEqual(expectedObj.job);
  });
});
describe("API_test_7", () => {
  test("add not certain data", async () => {
    let response: any;
    try {
      response = await superagent.post(url.posts).set(Expectations.CONTENT_TYPE, Expectations.APPLICATION_JSON).send({
        title: Expectations.NO_CERTAIN,
        body: Expectations.NO_CERTAIN,
      });
    } catch (error: any) {
      throw new Error(`The system gave an error ${error}`);
    }
    expect(response.body.body).toEqual(Expectations.NO_CERTAIN);
    expect(response.body.title).toEqual(Expectations.NO_CERTAIN);
  });
});
describe("API_test_8", () => {
  it("error checking", async () => {
    try {
      await superagent.delete(url.posts1);
    } catch (error: any) {
      expect(error.status).toBe(StatusCode.STATUS_204);
      expect(error.body).toEqual(expectationsUndefined.undefined);
    }
  });
});
describe("API_test_9", () => {
  it("error checking", async () => {
    try {
      await superagent.delete(url.albums5);
    } catch (error: any) {
      expect(error.status).toBe(StatusCode.STATUS_204);
      expect(error.body).toEqual(expectationsUndefined.undefined);
    }
  });
});

describe("API_test_10", () => {
  it("error checking", async () => {
    try {
      await superagent.get(url.usersName);
    } catch (error: any) {
      expect(error.status).toBe(StatusCode.STATUS_404);
      expect(error.body).toEqual(expectationsUndefined.undefined);
    }
  });
});
describe("API_test_11", () => {
  it("data verification", async () => {
    try {
      await superagent.post(url.users).query({ name: Query.QUERY_ERVIN });
    } catch (error: any) {
      throw new Error(`${error}`);
    }
  });
});
describe("API_test_12", () => {
  it("checking data with query parameters", async () => {
    let response: any;
    try {
      response = await superagent.get(url.users).query({ name: Query.QUERY_ERVIN });
    } catch (error: any) {
      throw new Error(`${error}`);
    }
    expect(response.status).toBe(StatusCode.STATUS_200);
  });
});
describe("API_test_13", () => {
  it("adding new data", async () => {
    const myDate: { name: string; email: string } = {
      name: Expectations.NAME_YURY,
      email: Expectations.EMAIL_YURY,
    };
    const response = await superagent
      .post(url.users)
      .set(Expectations.CONTENT_TYPE, Expectations.APPLICATION_JSON)
      .send({ name: myDate[Expectations.NAME_REQUEST], email: myDate[Expectations.EMAIL_REQUEST] });
    expect(response.status).toBe(StatusCode.STATUS_201);
    expect(response.body.name).toEqual(myDate.name);
    expect(response.body.email).toEqual(myDate.email);
  });
});
