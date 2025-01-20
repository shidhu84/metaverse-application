const axios2 = require("axios");

const axios = {
  post: async (...args) => {
    try {
      const res = await axios2.post(...args);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  get: async (...args) => {
    try {
      const res = await axios2.get(...args);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  put: async (...args) => {
    try {
      const res = await axios2.put(...args);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  delete: async (...args) => {
    try {
      const res = await axios2.delete(...args);
      return res;
    } catch (e) {
      return e.response;
    }
  },
};
const BACKEND_URL = "http://localhost:3000";
const WS_URL = "ws://localhost:3001";

// describe("Authentication", () => {
//   test("User is able to signup only once", async () => {
//     const username = "yenure" + Math.random(); //yenure0.12345
//     const password = "12345";
//     const type = "admin";
//     const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       username,
//       password,
//       type,
//     });
//     expect(response.status).toBe(200);
//     const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       username,
//       password,
//       type,
//     });
//     expect(updatedResponse.status).toBe(400);
//   });

//   test("Username should not be empty", async () => {
//     const password = "12345";
//     const type = "admin";
//     const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       password,
//       type,
//     });
//     expect(response.status).toBe(400);
//   });

//   test("Signin succeeds if username and password are correct", async () => {
//     const username = `yenure${Math.random()}`; //yenure0.12345
//     const password = "123456";
//     const type = "admin";
//     await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       username,
//       password,
//       type,
//     });
//     const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//       username,
//       password,
//     });
//     expect(response.status).toBe(200);
//     expect(response.data.token).toBeDefined();
//   });

//   test("Signin fails if username or password is incorrect", async () => {
//     const username = `yenure${Math.random()}`; //yenure0.12345
//     const password = "123456";
//     const type = "admin";
//     await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       username,
//       password,
//       type,
//     });
//     const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//       username: "wornguser",
//       password,
//     });
//     expect(response.status).toBe(403);
//   });
// });

// describe("User Metadata endpoints", () => {
//   let token = "";
//   let avatarId = "";
//   beforeAll(async () => {
//     const username = `yenure${Math.random()}`; //yenure0.12345
//     const password = "123456";
//     const type = "admin";
//     await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       username,
//       password,
//       type,
//     });
//     const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//       username,
//       password,
//     });

//     token = response.data.token;
//     const avatarResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/avatar`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//         name: "Timmy",
//       },
//       {
//         headers: {
//           authorization: token,
//         },
//       }
//     );
//     avatarId = avatarResponse.data.avatarId;
//     console.log("avatarId@@", avatarId);
//   });
//   test("User can't update the metadata with wrong avatar id", async () => {
//     const avatarResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/user/metadata`,
//       {
//         avatarId: "test123",
//       },
//       {
//         headers: {
//           authorization: token,
//         },
//       }
//     );
//     expect(avatarResponse.status).toBe(400);
//   });
//   test("User can update the metadata with right avatar id", async () => {
//     const avatarResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/user/metadata`,
//       {
//         avatarId,
//       },
//       {
//         headers: {
//           authorization: token,
//         },
//       }
//     );
//     expect(avatarResponse.status).toBe(200);
//   });
//   test("User cant update the metadata if auth header is empty", async () => {
//     const avatarResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/user/metadata`,
//       {
//         avatarId: "test123",
//       },
//       {
//         headers: null,
//       }
//     );
//     expect(avatarResponse.status).toBe(403);
//   });
//   test("User cant update the metadata with empty avatar id or emtpy request body", async () => {
//     const avatarResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/user/metadata`,
//       {},
//       {
//         headers: {
//           authorization: token,
//         },
//       }
//     );
//     expect(avatarResponse.status).toBe(400);
//   });
// });

describe("User Avatar information", () => {
  let token = "";
  let avatarId = "";
  let userId = "";
  beforeAll(async () => {
    const username = `yenure${Math.random()}`; //yenure0.12345
    const password = "123456";
    const type = "admin";
    const signupResposne = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type,
    });
    userId = signupResposne.data.userId;
    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password,
    });
    token = response.data.token;
    const avatarResponse = await axios.post(
      `${BACKEND_URL}/api/v1/admin/avatar`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
        name: "Timmy",
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    avatarId = avatarResponse.data.avatarId;
  });
  test("User can get available avatar list", async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/avatars`, {
      headers: {
        autherization: token,
      },
    });
    expect(response.data.avatars.length).not.toBe(0);
    const currentAvatar = response.data.avatars.find((x) => x.id === avatarId);
    expect(currentAvatar).toBeDefined();
  });
  test("Get back avatar information for user ", async () => {
    const response = await axios.get(
      `${BACKEND_URL}/api/v1/user/metadata/bulk?ids=[${userId}]`
    );
    expect(response.data.avatars.length).toBe(1);
    expect(response.data.avatars[0].userId).toBe(userId);
  });
});

// describe("Space information", () => {
//   let userId = "";
//   let userToken = "";
//   let adminId = "";
//   let adminToken = "";
//   let element1Id = "";
//   let element2Id = "";
//   let mapId = "";
//   beforeAll(async () => {
//     const username = `yenure${Math.random()}`; //yenure0.12345
//     const password = "123456";
//     const type = "admin";
//     const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       username,
//       password,
//       type,
//     });
//     adminId = signupResponse.data.userId;
//     const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//       username,
//       password,
//     });
//     adminToken = response.data.token;
//     const userSignupResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/signup`,
//       {
//         username: `${username}-users`,
//         password,
//         type: "user",
//       }
//     );
//     userId = userSignupResponse.data.userId;
//     const userSignInResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/signin`,
//       {
//         username: `${username}-users`,
//         password,
//       }
//     );
//     userToken = userSignInResponse.data.token;
//     const element1Response = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true, // weather or not the user can sit on top of this element (is it considered as a collission or not)
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     const element2Response = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true, // weather or not the user can sit on top of this element (is it considered as a collission or not)
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     element1Id = element1Response.data.id;
//     element2Id = element2Response.data.id;
//     const elementMap = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/map`,
//       {
//         thumbnail: "https://thumbnail.com/a.png",
//         dimensions: "100x200",
//         name: "100 person interview room",
//         defaultElements: [
//           {
//             elementId: element1Id,
//             x: 20,
//             y: 20,
//           },
//           {
//             elementId: element1Id,
//             x: 18,
//             y: 20,
//           },
//           {
//             elementId: element2Id,
//             x: 19,
//             y: 20,
//           },
//         ],
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     mapId = elementMap.data.id;
//   });

//   test("User is able to create space", async () => {
//     const response = await axios.post(
//       `${BACKEND_URL}/api/v1/space`,
//       {
//         name: "Test",
//         dimensions: "100x200",
//         mapId: mapId,
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     expect(response.data.spaceId).toBeDefined();
//   });

//   test("Create space for user without mapId", async () => {
//     const response = await axios.post(
//       `${BACKEND_URL}/api/v1/space`,
//       {
//         name: "Test",
//         dimensions: "100x200",
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     expect(response.data.spaceId).toBeDefined();
//   });

//   test("User is not able to create space if both mapId and dimentions are not present", async () => {
//     const response = await axios.post(
//       `${BACKEND_URL}/api/v1/space`,
//       {
//         name: "Test",
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     expect(response.statusCode).toBe(400);
//   });

//   test("User is not able to delete space which does not exist", async () => {
//     const response = await axios.delete(
//       `${BACKEND_URL}/api/v1/space/test12345`,
//       {
//         headers: {
//           Autherization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     expect(response.statusCode).toBe(400);
//   });

//   test("User should be able to delete a space that does exist", async () => {
//     const createSpaceResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/space`,
//       {
//         name: "Test",
//         mapId: "map1",
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     const response = await axios.delete(
//       `${BACKEND_URL}/api/v1/space/${createSpaceResponse.spaceId}`,
//       {
//         headers: {
//           Autherization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     expect(response.statusCode).toBe(200);
//   });

//   test("Not allow to delete space of other users", async () => {
//     const createSpaceResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/space`,
//       {
//         name: "Test",
//         mapId: "map1",
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     const response = await axios.delete(
//       `${BACKEND_URL}/api/v1/space/${createSpaceResponse.spaceId}`,
//       {
//         headers: {
//           Autherization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     expect(response.statusCode).toBe(400);
//   });

//   test("Admin has no spaces initially", async () => {
//     const response = await axios.get(`${BACKEND_URL}/api/v1/space/all`);
//     expect(response.data.spaces.length).toBe(0);
//   });

//   test("Admin is able to create space", async () => {
//     const spaceCreateResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/space`,
//       {
//         name: "Test",
//         dimensions: "100x200",
//         mapId: mapId,
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     const response = await axios.get(`${BACKEND_URL}/api/v1/space/all`);
//     const filterSpace = response.data.spaces.filter(
//       (x) => id === spaceCreateResponse.data.spaceId
//     );
//     expect(response.data.spaces.length).toBe(1);
//     expect(filterSpace).toBeDefined();
//   });
// });

// describe("Arena information", () => {
//   let userId = "";
//   let userToken = "";
//   let adminId = "";
//   let adminToken = "";
//   let element1Id = "";
//   let element2Id = "";
//   let mapId = "";
//   let spaceId = "";
//   beforeAll(async () => {
//     const username = `yenure${Math.random()}`; //yenure0.12345
//     const password = "123456";
//     const type = "admin";
//     const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       username,
//       password,
//       type,
//     });
//     adminId = signupResponse.data.userId;
//     const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//       username,
//       password,
//     });
//     adminToken = response.data.token;
//     const userSignupResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/signup`,
//       {
//         username: `${username}-users`,
//         password,
//         type: "user",
//       }
//     );
//     userId = userSignupResponse.data.userId;
//     const userSignInResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/signin`,
//       {
//         username: `${username}-users`,
//         password,
//       }
//     );
//     userToken = userSignInResponse.data.token;
//     const element1Response = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true, // weather or not the user can sit on top of this element (is it considered as a collission or not)
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     const element2Response = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true, // weather or not the user can sit on top of this element (is it considered as a collission or not)
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     element1Id = element1Response.data.id;
//     element2Id = element2Response.data.id;
//     const elementMap = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/map`,
//       {
//         thumbnail: "https://thumbnail.com/a.png",
//         dimensions: "100x200",
//         name: "100 person interview room",
//         defaultElements: [
//           {
//             elementId: element1Id,
//             x: 20,
//             y: 20,
//           },
//           {
//             elementId: element1Id,
//             x: 18,
//             y: 20,
//           },
//           {
//             elementId: element2Id,
//             x: 19,
//             y: 20,
//           },
//         ],
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     mapId = elementMap.data.id;

//     const spaceResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/space`,
//       {
//         name: "Test",
//         dimensions: "100x200",
//         mapId: mapId,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     spaceId = spaceResponse.data.id;
//   });

//   test("Incorrect space id return 400", async () => {
//     const response = await axios.get(`${BACKEND_URL}/api/v1/space/test123`, {
//       headers: {
//         Autherization: `Bearer ${userToken}`,
//       },
//     });
//     expect(response.statusCode).toBe(400);
//   });

//   test("Correct space id returns all the elements", async () => {
//     const response = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
//       headers: {
//         Autherization: `Bearer ${userToken}`,
//       },
//     });
//     expect(response.data.elements.length).toBe(3);
//   });

//   test("Delete end is able to delete the element", async () => {
//     const elementListResponse = await axios.get(
//       `${BACKEND_URL}/api/v1/space/${spaceId}`,
//       {
//         headers: {
//           Autherization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     await axios.delete(
//       `${BACKEND_URL}/api/v1/space/element`,
//       {
//         spaceId,
//         elementId: elementListResponse.data.elements[0].id,
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     const newResponse = await axios.get(
//       `${BACKEND_URL}/api/v1/space/${spaceId}`,
//       {
//         headers: {
//           Autherization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     expect(newResponse.data.elements.length).toBe(2);
//   });

//   test("Add the element to the space", async () => {
//     await axios.post(
//       `${BACKEND_URL}/api/v1/space/element`,
//       {
//         elementId: element1Id,
//         spaceId: spaceId,
//         x: 50,
//         y: 20,
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     const newResponse = await axios.get(
//       `${BACKEND_URL}/api/v1/space/${spaceId}`,
//       {
//         headers: {
//           Autherization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     expect(newResponse.data.elements.length).toBe(3);
//   });

//   test("Adding an element fails if lies outside the dimentions", async () => {
//     const response = await axios.post(
//       `${BACKEND_URL}/api/v1/space/element`,
//       {
//         elementId: element1Id,
//         spaceId: spaceId,
//         x: 1000,
//         y: 210000,
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${userToken}`,
//         },
//       }
//     );

//     expect(response.statusCode).toBe(400);
//   });
// });

// describe("Admin Endpoints", () => {
//   let userId = "";
//   let userToken = "";
//   let adminId = "";
//   let adminToken = "";
//   beforeAll(async () => {
//     const username = `yenure${Math.random()}`; //yenure0.12345
//     const password = "123456";
//     const type = "admin";
//     const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       username,
//       password,
//       type,
//     });
//     adminId = signupResponse.data.userId;
//     const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//       username,
//       password,
//     });
//     adminToken = response.data.token;
//     const userSignupResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/signup`,
//       {
//         username: `${username}-users`,
//         password,
//         type: "user",
//       }
//     );
//     userId = userSignupResponse.data.userId;
//     const userSignInResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/signin`,
//       {
//         username: `${username}-users`,
//         password,
//       }
//     );
//     userToken = userSignInResponse.data.token;
//   });
//   test("User is not able to hit Admin end points", async () => {
//     const elementResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true, // weather or not the user can sit on top of this element (is it considered as a collission or not)
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     const elementMap = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/map`,
//       {
//         thumbnail: "https://thumbnail.com/a.png",
//         dimensions: "100x200",
//         name: "100 person interview room",
//         defaultElements: [],
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     const avatarResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/avatar`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//         name: "Timmy",
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     const updateElementResponse = await axios.put(
//       `${BACKEND_URL}/api/v1/admin/element/123`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     expect(elementResponse.statusCode).toBe(403);
//     expect(elementMap.statusCode).toBe(403);
//     expect(avatarResponse.statusCode).toBe(403);
//     expect(updateElementResponse.statusCode).toBe(403);
//   });
//   test("Admin is able to hit the admin end ponits", async () => {
//     const elementResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true, // weather or not the user can sit on top of this element (is it considered as a collission or not)
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     const elementMap = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/map`,
//       {
//         thumbnail: "https://thumbnail.com/a.png",
//         dimensions: "100x200",
//         name: "100 person interview room",
//         defaultElements: [],
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     const avatarResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/avatar`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//         name: "Timmy",
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     const updateElementResponse = await axios.put(
//       `${BACKEND_URL}/api/v1/admin/element/123`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     expect(elementResponse.statusCode).toBe(200);
//     expect(elementMap.statusCode).toBe(200);
//     expect(avatarResponse.statusCode).toBe(200);
//     expect(updateElementResponse.statusCode).toBe(200);
//   });
//   test("Admin is able to update the imageUrl for the element", async () => {
//     const elementResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true, // weather or not the user can sit on top of this element (is it considered as a collission or not)
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     const updateElementResponse = await axios.put(
//       `${BACKEND_URL}/api/v1/admin/element/${elementResponse.data.id}`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     expect(updateElementResponse.statusCode).toBe(200);
//   });
// });

// describe("Websocket test", () => {
//   let adminUserId;
//   let adminToken;
//   let userId;
//   let userToken;
//   let element1Id = "";
//   let element2Id = "";
//   let mapId = "";
//   let spaceId = "";
//   let ws1;
//   let ws2;
//   let ws1messages = [];
//   let ws2messages = [];
//   let userX;
//   let userY;
//   let adminX;
//   let adminY;

//   async function waitForAndPopLatestMessage(messageArray) {
//     return new Promise((resolve, reject) => {
//       if (messageArray.length > 0) {
//         resolve(messageArray.shift());
//       } else {
//         let interval = setTimeout(() => {
//           if (messageArray.length > 0) {
//             resolve(messageArray.shift());
//             clearInterval(interval);
//           }
//         }, 1000);
//       }
//     });
//   }
//   async function setupHTTP() {
//     const username = `yenure${Math.random()}`; //yenure0.12345
//     const password = "123456";
//     const type = "admin";
//     const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       username,
//       password,
//       type,
//     });
//     const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//       username,
//       password,
//     });
//     adminUserId = signupResponse.data.userId;
//     adminToken = response.data.token;
//     const userSignupResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/signup`,
//       {
//         username: `${username}-users`,
//         password,
//         type: "user",
//       }
//     );
//     const userSignInResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/signin`,
//       {
//         username: `${username}-users`,
//         password,
//       }
//     );
//     userId = userSignupResponse.data.userId;
//     userToken = userSignInResponse.data.token;
//     const element1Response = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true, // weather or not the user can sit on top of this element (is it considered as a collission or not)
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     const element2Response = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true, // weather or not the user can sit on top of this element (is it considered as a collission or not)
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     element1Id = element1Response.data.id;
//     element2Id = element2Response.data.id;
//     const elementMap = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/map`,
//       {
//         thumbnail: "https://thumbnail.com/a.png",
//         dimensions: "100x200",
//         name: "100 person interview room",
//         defaultElements: [
//           {
//             elementId: element1Id,
//             x: 20,
//             y: 20,
//           },
//           {
//             elementId: element1Id,
//             x: 18,
//             y: 20,
//           },
//           {
//             elementId: element2Id,
//             x: 19,
//             y: 20,
//           },
//         ],
//       },
//       {
//         headers: {
//           Autherization: `Bearer ${adminToken}`,
//         },
//       }
//     );
//     mapId = elementMap.data.id;

//     const spaceResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/space`,
//       {
//         name: "Test",
//         dimensions: "100x200",
//         mapId: mapId,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//         },
//       }
//     );
//     spaceId = spaceResponse.data.id;
//   }

//   async function setupWs() {
//     ws1 = new WebSocket(WS_URL);

//     await new Promise((r) => {
//       ws1.onopen = r;
//     });

//     ws1.onmessage = (event) => {
//       ws1messages.push(JSON.parse(event.data));
//     };

//     ws2 = new WebSocket(WS_URL);
//     await new Promise((r) => {
//       ws2.onopen = r;
//     });

//     ws2.onmessage = (event) => {
//       ws2messages.push(JSON.parse(event.data));
//     };
//   }

//   beforeAll(async () => {
//     setupHTTP();
//     setupWs();
//   });

//   test("Get back aknowledgement for joining the space", async () => {
//     ws1.send(
//       JSON.stringify({
//         type: "join",
//         payload: {
//           spaceId: spaceId,
//           token: adminToken,
//         },
//       })
//     );

//     const message1 = await waitForAndPopLatestMessage(ws1messages); //first user i.e in our case admin joining acknowledge

//     ws2.send(
//       JSON.stringify({
//         type: "join",
//         payload: {
//           spaceId: spaceId,
//           token: userToken,
//         },
//       })
//     );
//     const message2 = await waitForAndPopLatestMessage(ws2messages); // second user in our case
//     const message3 = await waitForAndPopLatestMessage(ws1messages); //when user 2 joins the user first will get the user-join event.
//     expect(message1.type).toBe("space-joined");
//     expect(message2.type).toBe("space-joined");
//     expect(message3.type).toBe("user-join");
//     expect(message3.payload.x).toBe(message2.payload.spawn.x);
//     expect(message3.payload.y).toBe(message2.payload.spawn.y);
//     expect(message3.payload.userId).toBe(userId);

//     expect(message1.payload.users.length).toBe(0);
//     expect(message2.payload.users.length).toBe(1);
//     adminX = message1.payload.spawn.x;
//     adminY = message1.payload.spawn.y;
//     userX = message2.payload.spawn.x;
//     userY = message2.payload.spawn.y;
//   });

//   test("User should not be able to move across the boundary of the wall", async () => {
//     ws1.send({
//       type: "movement",
//       payload: {
//         x: 10000,
//         y: 20000,
//       },
//     });
//     const message = await waitForAndPopLatestMessage(ws1messages);
//     expect(message.type).toBe("movement-rejected");
//     expect(message.payload.x).toBe(adminX);
//     expect(message.payload.y).toBe(adminY);
//   });

//   test("User should not be able to move two blocks at the same time", async () => {
//     ws1.send({
//       type: "movement",
//       payload: {
//         x: adminX + 2,
//         y: adminY,
//       },
//     });
//     const message = await waitForAndPopLatestMessage(ws1messages);
//     expect(message.type).toBe("movement-rejected");
//     expect(message.payload.x).toBe(adminX);
//     expect(message.payload.y).toBe(adminY);
//   });

//   test("Current movement should be boradcasted to the other sockets in the room", async () => {
//     ws1.send({
//       type: "movement",
//       payload: {
//         x: adminX + 1,
//         y: adminY,
//         userId: adminId,
//       },
//     });
//     const message = await waitForAndPopLatestMessage(ws2messages); //here user2 will receive the moments from user one
//     expect(message.type).toBe("movement");
//     expect(message.payload.x).toBe(adminX + 1);
//     expect(message.payload.y).toBe(adminY);
//   });

//   test("If the user leaves , other user should recives leave event", async () => {
//     ws1.close();
//     const message = await waitForAndPopLatestMessage(ws2messages);
//     expect(message.type).toBe("user-left");
//     expect(message.payload.userId).toBe(adminUserId);
//   });
// });
