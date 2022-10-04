import axios from "axios";

const axiosBase = axios.create({ baseURL: "http://localhost:4444/" });






// -------------- TOURS ------------



// GET ALL
export const getAllTours = () => {
    // GET http://localhost:5099/tours

    // Her definere vi et endpoint, som i dette tilfælde er "tours"

    let response = axiosBase.get("tours")
        .then((resp) => {
            return resp.data;
        })
        .catch((error) => {
            throw new Error("Desværre, der er sket en fejl");
        });
    // Vi thrower en ny Error så den kan blive fanget af vores catch. Hvis vi ikke laver det til en error, tager den det som data som er noget godt, det skal det ikke være når der er fejl.

    return response;
};


// GET ALL (TEASER)
export const getToursTeaser = () => {
    // GET http://localhost:5099/tours/teaser

    // Her definere vi et endpoint, som i dette tilfælde er "tours"

    let response = axiosBase.get("tours/teaser")
        .then((resp) => { return resp.data; })
        .catch((error) => { throw new Error("Desværre, der er sket en fejl"); });
    // Vi thrower en ny Error så den kan blive fanget af vores catch. Hvis vi ikke laver det til en error, tager den det som data som er noget godt, det skal det ikke være når der er fejl.

    return response;
};


// GET BY ID
export const getTourById = (Id) => {
    // GET http://localhost:5099/tours/625c787debadcefe8ed39ac9

    // Her definere vi et endpoint med et id, som i dette tilfælde er "tours/id"

    let response = axiosBase.get("tours/" + Id)
        .then((resp) => {
            return resp.data;
        })
        .catch((error) => {
            throw new Error("Desværre, der er sket en fejl");
        });

    return response;
};


// POST - OPRET NY
export const createTour = (newTour) => {
    // POST http://localhost:5099/tours/admin , formdata

    let response = axiosBase.post("tours/admin", newTour)
        .then((resp) => {
            return resp.data;
        })
        .catch((error) => {
            throw new Error("Desværre, der er sket en fejl");
        });

    return response;
};


// PUT - RET (ud fra id)
export const updateTour = (updatedTour, Id) => {
    // Den har både brug for den rettede tur, og et id så den ved hvilken tour ændret ud
    // PUT http://localhost:5099/tours/admin/6255cfb40b7abe9bb00a7014 , formdata

    let response = axiosBase.put("tours/admin/" + Id, updatedTour)
        .then((resp) => {
            return resp.data;
        })
        .catch((error) => {
            throw new Error("Desværre, der er sket en fejl");
        });

    return response;
};


// DELETE - SLET (ud fra id)
export const deleteTour = (Id) => {
    // DELETE http://localhost:5099/tours/admin/xxxxxxxxxxxxxxxxxxxxx

    let response = axiosBase.delete("tours/admin/" + Id)
        .then((resp) => {
            return resp.data;
        })
        .catch((error) => {
            throw new Error("Desværre, der er sket en fejl");
        });

    return response;
};






// -------------- ABOUT ------------


/* // GET
export const getAbout = () => {
  // GET http://localhost:5099/about

  // Her definere vi et endpoint, som i dette tilfælde er "about"

  let response = axiosBase.get("about")
    .then((resp) => {
      return resp.data;
    })
    .catch((error) => {
      throw new Error("Desværre, der er sket en fejl");
    });
  return response;
}; */




// PUT
export const updateAbout = (aboutData) => {
    // PUT http://localhost:5099/about/admin

    let response = axiosBase.put("about/admin", aboutData)
        .then((resp) => {
            return resp.data;
        })
        .catch((error) => {
            throw new Error("Desværre, der er sket en fejl");
        });

    return response;
};



// -------------- SEARCH ------------



// GET ALL (TEASER)
export const getToursSearch = (searchKey) => {
    // GET http://localhost:5099/tours/soeg/xxxxxxx

    // Her definere vi et endpoint, som i dette tilfælde er "tours"

    let response = axiosBase.get("tours/soeg/" + searchKey)
        .then((resp) => { return resp.data; })
        .catch((error) => { throw new Error("Desværre, der er sket en fejl"); });
    // Vi thrower en ny Error så den kan blive fanget af vores catch. Hvis vi ikke laver det til en error, tager den det som data som er noget godt, det skal det ikke være når der er fejl.

    return response;
};










// --------------** SpaceVentures **------------



// -------------- FOOTER ------------



// GET FOOTER
export const getFooter = () => {
    // GET http://localhost:4444/footer

    // Her definere vi et endpoint, som i dette tilfælde er "tours"

    let response = axiosBase.get("footer")
        .then((resp) => { return resp.data; })
        .catch((error) => { throw new Error("Desværre, der er sket en fejl"); });
    // Vi thrower en ny Error så den kan blive fanget af vores catch. Hvis vi ikke laver det til en error, tager den det som data som er noget godt, det skal det ikke være når der er fejl.

    return response;
};


// -------------- NEWSSUBSCRIPTION ------------



// POST - tilmeld nyhedsbrev
export const subscribeNews = (subscriptionData) => {
    // GET http://localhost:4444/newssubscription/admin (medsend email og name)

    console.log("sub", subscriptionData);

    let response = axiosBase.post("newssubscription", subscriptionData)
        .then((resp) => { return resp.data; })
        .catch((error) => { throw new Error("Desværre, der er sket en fejl"); });
    // Vi thrower en ny Error så den kan blive fanget af vores catch. Hvis vi ikke laver det til en error, tager den det som data som er noget godt, det skal det ikke være når der er fejl.

    return response;
};



// -------------- OUR TEAM ------------


// GET
export const getOurTeam = () => {
    // GET http://localhost:4444/team

    // Her definere vi et endpoint, som i dette tilfælde er "team"

    let response = axiosBase.get("team")
        .then((resp) => {
            return resp.data;
        })
        .catch((error) => {
            throw new Error("Desværre, der er sket en fejl");
        });
    return response;
};




// -------------- ABOUT ------------



// GET ABOUT-US
export const getAbout = () => {
    // GET http://localhost:4444/about

    // Her definere vi et endpoint, som i dette tilfælde er "about"

    let response = axiosBase.get("about")
        .then((resp) => { return resp.data; })
        .catch((error) => { throw new Error("Desværre, der er sket en fejl"); });
    // Vi thrower en ny Error så den kan blive fanget af vores catch. Hvis vi ikke laver det til en error, tager den det som data som er noget godt, det skal det ikke være når der er fejl.

    return response;
};




// -------------- SPACESHUTTLE ------------



// GET SPACESHUTTLE
export const getSpaceShuttle = () => {
    // GET http://localhost:4444/spacecraft

    // Her definere vi et endpoint, som i dette tilfælde er "about"

    let response = axiosBase.get("spacecraft")
        .then((resp) => { return resp.data; })
        .catch((error) => { throw new Error("Desværre, der er sket en fejl"); });
    // Vi thrower en ny Error så den kan blive fanget af vores catch. Hvis vi ikke laver det til en error, tager den det som data som er noget godt, det skal det ikke være når der er fejl.

    return response;
};






// -------------- BANNER ------------



// GET ABOUT-US
export const getBanner = () => {
    // GET http://localhost:4444/banner

    // Her definere vi et endpoint, som i dette tilfælde er "banner"

    let response = axiosBase.get("banner")
        .then((resp) => { return resp.data; })
        .catch((error) => { throw new Error("Desværre, der er sket en fejl"); });
    // Vi thrower en ny Error så den kan blive fanget af vores catch. Hvis vi ikke laver det til en error, tager den det som data som er noget godt, det skal det ikke være når der er fejl.

    return response;
};