import axios from "axios";

const axiosBase = axios.create({ baseURL: "http://localhost:4444/" });








// --------------*********** SPACEVENTURES ***********------------





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


// GET - Nyhedsbrev
export const getNewsSubscription = () => {
    // GET http://localhost:4444/newssubscription/admin (medsend email og name)

    console.log("sub");

    let response = axiosBase.get("newssubscription/admin")
        .then((resp) => { return resp.data; })
        .catch((error) => { throw new Error("Desværre, der er sket en fejl"); });
    // Vi thrower en ny Error så den kan blive fanget af vores catch. Hvis vi ikke laver det til en error, tager den det som data som er noget godt, det skal det ikke være når der er fejl.

    return response;
};


// DELETE - SLET Email (ud fra id)
export const deleteEmail = (Id) => {
    // DELETE http://localhost:4444/newssubscription/admin/xxxxxx

    let response = axiosBase.delete("newssubscription/admin/" + Id)
        .then((resp) => {
            return resp.data;
        })
        .catch((error) => {
            throw new Error("Desværre, der er sket en fejl");
        });

    return response;
};








// -------------- OUR TEAM ------------


// GET - HENT DATA
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


// POST - OPRET NY
export const createTeamMember = (newMember) => {
    // POST http://localhost:4444/team/admin , formdata

    let response = axiosBase.post("team/admin", newMember)
        .then((resp) => {
            return resp.data;
        })
        .catch((error) => {
            throw new Error("Desværre, der er sket en fejl");
        });

    return response;
};

// GET BY ID
export const getTeamMemberById = (Id) => {
    // GET http://localhost:4444/team/admin/617af9a11eed823f30d8a32c

    // Her definere vi et endpoint med et id, som i dette tilfælde er "tours/id"

    let response = axiosBase.get("team/" + Id)
        .then((resp) => {
            return resp.data;
        })
        .catch((error) => {
            throw new Error("Desværre, der er sket en fejl");
        });

    return response;
};

    // DELETE - SLET (ud fra id)
    export const deleteTeamMember = (Id) => {
        // DELETE http://localhost:4444/team/admin/617af9a11eed823f30d8a32c

        let response = axiosBase.delete("team/admin/" + Id)
            .then((resp) => {
                return resp.data;
            })
            .catch((error) => {
                throw new Error("Desværre, der er sket en fejl");
            });

        return response;
    };

    // PUT - RET (ud fra id)
    export const updateTeamMember = (updatedTeamMember, Id) => {
        // Den har både brug for den rettede tur, og et id så den ved hvilken tour ændret ud
        // PUT http://localhost:4444/team/admin/617af9a11eed823f30d8a32c , formdata

        let response = axiosBase.put("team/admin/" + Id, updatedTeamMember)
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


// PUT ABOUT-US
export const updateAbout = (aboutData) => {
    // PUT http://localhost:4444/about/admin

    let response = axiosBase.put("about/admin", aboutData)
        .then((resp) => {
            return resp.data;
        })
        .catch((error) => {
            throw new Error("Desværre, der er sket en fejl");
        });

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


// PUT/RET SPACESHUTTLE
export const updateSpaceShuttle = (SpaceShuttleData) => {
    // PUT http://localhost:4444/spacecraft/admin

    let response = axiosBase.put("spacecraft/admin", SpaceShuttleData)
        .then((resp) => {
            return resp.data;
        })
        .catch((error) => {
            throw new Error("Desværre, der er sket en fejl");
        });

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







// -------------- TOURS ------------



// GET ABOUT-US
export const getTours = () => {
    // GET http://localhost:4444/tours

    // Her definere vi et endpoint, som i dette tilfælde er "tours"

    let response = axiosBase.get("tours")
        .then((resp) => { return resp.data; })
        .catch((error) => { throw new Error("Desværre, der er sket en fejl"); });
    // Vi thrower en ny Error så den kan blive fanget af vores catch. Hvis vi ikke laver det til en error, tager den det som data som er noget godt, det skal det ikke være når der er fejl.

    return response;
};


// POST - OPRET NY
export const createTour = (newTour) => {
    // POST http://localhost:4444/tours/admin , formdata

    let response = axiosBase.post("tours/admin", newTour)
        .then((resp) => {
            return resp.data;
        })
        .catch((error) => {
            throw new Error("Desværre, der er sket en fejl");
        });

    return response;
};


// GET BY ID
export const getTourById = (Id) => {
    // GET http://localhost:4444/tours/617af72128fc8765b05fbbc5

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

// DELETE - SLET (ud fra id)
export const deleteTour = (Id) => {
    // DELETE http://localhost:4444/tours/admin/xxxxx

    let response = axiosBase.delete("tours/admin/" + Id)
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
    // PUT http://localhost:4444/tours/admin/617af72128fc8765b05fbbc5 , formdata

    let response = axiosBase.put("tours/admin/" + Id, updatedTour)
        .then((resp) => {
            return resp.data;
        })
        .catch((error) => {
            throw new Error("Desværre, der er sket en fejl");
        });

    return response;
};


// GET ALL
export const getAllTours = () => {
    // GET http://localhost:4444/tours

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





// -------------- GALLERY ------------


// GET GALLERY
export const getGallery = () => {
    // GET http://localhost:4444/gallery

    // Her definere vi et endpoint, som i dette tilfælde er "tours"

    let response = axiosBase.get("gallery")
        .then((resp) => { return resp.data; })
        .catch((error) => { throw new Error("Desværre, der er sket en fejl"); });
    // Vi thrower en ny Error så den kan blive fanget af vores catch. Hvis vi ikke laver det til en error, tager den det som data som er noget godt, det skal det ikke være når der er fejl.

    return response;
};








// -------------- CONTACT ------------

// POST - Send Mail - Kontakt
export const sendMail = (sendData) => {
    // GET http://localhost:4444/contact (medsend email og name)

    console.log("send", sendData);

    let response = axiosBase.post("contact", sendData)
        .then((resp) => { return resp.data; })
        .catch((error) => { throw new Error("Desværre, der er sket en fejl"); });
    // Vi thrower en ny Error så den kan blive fanget af vores catch. Hvis vi ikke laver det til en error, tager den det som data som er noget godt, det skal det ikke være når der er fejl.

    return response;
};









// -------------- SAFETY ------------

// GET SAFETY
export const getSafety = () => {
    // GET http://localhost:4444/safety

    // Her definere vi et endpoint, som i dette tilfælde er "safety"

    let response = axiosBase.get("safety")
        .then((resp) => { return resp.data; })
        .catch((error) => { throw new Error("Desværre, der er sket en fejl"); });
    // Vi thrower en ny Error så den kan blive fanget af vores catch. Hvis vi ikke laver det til en error, tager den det som data som er noget godt, det skal det ikke være når der er fejl.

    return response;
};
