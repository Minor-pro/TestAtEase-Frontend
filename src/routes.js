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
import ImagesUpload from "components/UploadAndCropImage/UploadDiagramAndTextImages";
import QuestionList from "components/QuestionList/QuestionList";
import EditExistingQuestion from "components/EditQuestion/EditExistingQuestion";
import TeacherDashboard from "components/TeacherDashboard/TeacherDashboard";
import TestDashboard from "components/TestDashboard/TestDashboard";


var routes = [
  {
    path: "/edit",
    name: "Edit Question",
    icon: "nc-icon nc-bank",
    component: EditQuestion,
    layout: "/admin",
  },
  {
    path: "/upload-crop",
    name: "Upload And Crop",
    icon: "nc-icon nc-bank",
    component: ImagesUpload,
    layout: "/admin",
  },
  {
    path: "/list",
    name: "My Questions",
    icon: "nc-icon nc-bank",
    component: QuestionList,
    layout: "/admin"
  },
  {
    path: "/editexisting/:qid",
    name: "Edit Existing Question",
    icon: "nc-icon nc-bank",
    component: EditExistingQuestion,
    layout: "/admin",
  },
  {
    path: "/teacherdashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: TeacherDashboard,
    layout: "/admin",
  },
  {
    path: "/testdashboard",
    name: "Test Dashboard",
    icon: "nc-icon nc-bank",
    component: TestDashboard,
    layout: "/admin",
  },
];
export default routes;
