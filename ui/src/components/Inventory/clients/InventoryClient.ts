import axios from "axios";
import { Package } from "../Package";

const baseUrl = "http://localhost:3000"

export async function getPackages(){
   return await axios.get<Package[]>(`${baseUrl}/package`)
}
