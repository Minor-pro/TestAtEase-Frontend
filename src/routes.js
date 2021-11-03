/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import EditQuestion from "components/EditQuestion/EditQuestion";
import Login from "components/Login/Login";
import ListCard from "components/ListCard/ListCard";
import ImagesUpload from "components/UploadAndCropImage/UploadDiagramAndTextImages";


var routes = [
  {
    path: "/edit",
    name: "EditQuestion",
    icon: "nc-icon nc-bank",
    component: EditQuestion,
    layout: "/admin",
  },
  {
    path: "/upload-crop",
    name: "UplaodAndCrop",
    icon: "nc-icon nc-bank",
    component: ImagesUpload,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "UplaodAndCrop",
    icon: "nc-icon nc-bank",
    component: Login,
    layout: "/admin",
  },
  {
    path: "/letscheck",
    name: "Check",
    icon: "nc-icon nc-bank",
    component: ListCard,
    layout: "/admin",
  }
  
  
];
export default routes;
