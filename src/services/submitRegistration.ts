import { postRegistrationDetails } from "./apiService";
async function submitRegistration(payload:object){
    const res=postRegistrationDetails("", payload)
    return res
}
export default submitRegistration;