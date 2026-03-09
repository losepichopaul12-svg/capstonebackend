

import Applications from "../Model/applicantschema.js";

 export const getMyApplications = async (request, response) => {
  try {

    const email = request.params.email;

   const applications = await Applications.find({
  applicantemail: email
}).populate("jobId");
    response.status(200).json(applications);

  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

