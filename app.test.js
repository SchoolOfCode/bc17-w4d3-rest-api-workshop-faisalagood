import request from "supertest";

import app from "./app.js";
import astronauts from "./libs/data.js";
import { createAstronaut, getAstronautsByName, updateAstronautById } from "./models/astronauts.js";

const astronautToPost = {
  id: "9999",
  firstName: "Nilly",
  lastName: "Vanilly",
  rank: "",
  suitSize: "XXL",
  helmetSize: "XXS",
  specialSkill: "",
  dob: "",
  missions: [
    {
      title: "",
      dates: { start: "", finish: "" },
      extravehicularActivities: 5,
    },
  ],
};

const astronautToDelete = {
  id: "7777",
  firstName: "Gemini",
  lastName: "Harris",
  rank: "",
  suitSize: "XXL",
  helmetSize: "XXS",
  specialSkill: "",
  dob: "",
  missions: [
    {
      title: "",
      dates: { start: "", finish: "" },
      extravehicularActivities: 5,
    },
  ],
};

const astronautToPut = {
  id: "1111",
  firstName: "Curtis",
  lastName: "Mongoose",
  rank: "",
  suitSize: "XXL",
  helmetSize: "XXS",
  specialSkill: "",
  dob: "",
  missions: [
    {
      title: "",
      dates: { start: "", finish: "" },
      extravehicularActivities: 5,
    },
  ],
};

const LEVELS = {
  one: "level_one",
  two: "level_two",
  three: "level_three",
};

describe(LEVELS.one, () => {
  it("app should have a GET request handler that returns all astronauts", async () => {
    const res = await request(app).get("/astronauts");
    const expected = { success: true, payload: astronauts };
    const actual = res.body;

    expect(actual).toEqual(expected);
  });
  it("app should have a POST request handler that creates a new astronaut", async () => {
    const res = await request(app).post("/astronauts").send(astronautToPost);
    const expected = { success: true, payload: astronautToPost };
    const actual = res.body;

    expect(actual).toEqual(expected);
  });
});
describe(LEVELS.two, () => {
  it("app should have a GET request handler that retrieves an astronaut by id", async () => {
    const res = await request(app).get("/astronauts/1111");
    const expected = { success: true, payload: astronauts[0] };
    const actual = res.body;

    expect(actual).toEqual(expected);
  });

  it("app should have a PUT request handler that replaces an astronaut by id", async () => {
    const res = await request(app)
      .put(`/astronauts/${astronautToPut.id}`)
      .send(astronautToPut);
    const expected = { success: true, payload: astronautToPut };
    const actual = res.body;

    expect(actual).toEqual(expected);
  });

  it("app should have a DELETE request handler that deletes an astronaut by id", async () => {
    const astronaut = await createAstronaut(astronautToDelete);
    const res = await request(app).delete(
      `/astronauts/${astronautToDelete.id}`
    );
    const expected = { success: true, payload: astronaut };
    const actual = res.body;

    expect(actual).toEqual(expected);
  });
  it("app should have a PATCH request handler that updates an astronaut by id", async () => {
    const astronautUpdate = {
      firstName: "Zainab",
    };
    const updateID = "1112";
    const astronaut = await updateAstronautById(updateID, astronautUpdate);
    const res = await request(app)
      .patch(`/astronauts/${updateID}`)
      .send(astronautUpdate);
    const expected = { success: true, payload: astronaut };
    const actual = res.body;

    expect(actual).toEqual(expected);
  });
});

describe("level_goku", () => {
	it("app should have a GET request handler that returns an astronaut by name", async () => {
    const res = await request(app).get("/astronauts?name=Denise");
    const expected = { success: true, payload: astronauts[4] };

    expect(res.body).toEqual(expected);
  });
});
