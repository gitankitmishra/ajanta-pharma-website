// import { createContext, FC, useContext, useState } from "react";
// import { useRouter, useParams } from "next/navigation";

// interface ModuleContextData {
//   moduleUploadFile: () => Promise<void>;
// }

// export const ModuleContext = createContext<ModuleContextData | null>(null);

// const ModuleContextProvider: FC = (props) => {
//   const params = useParams();
//   const router = useRouter();

//   const [courseCode, setCourseCode] = useState<string>("");
//   const [moduleName, setModuleName] = useState<string>("");
//   const [moduleNo, setModuleNo] = useState<string>("");
//   const [moduleFileUrl, setModuleFileUrl] = useState<string>("");

//   const moduleUploadFile = async (): Promise<void> => {
//     try {
//       const formData = new FormData();
//       formData.append("moduleUrl", moduleFileUrl);
//       formData.append("modulename", moduleName);
//       formData.append("moduleNumber", moduleNo);

//       const response = await fetch(
//         `http://localhost:8000/uploadFile/?courseCode=${courseCode}`,
//         {
//           method: "PUT",
//           headers: {
//             "content-type": "application/json",
//           },
//           body: formData,
//         }
//       );
//       if (response.status === 200) {
//         const data = await response.json();
//         console.log("-------------------", data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const moduleData: ModuleContextData = {
//     moduleUploadFile,
//   };

//   return (
//     <ModuleContext.Provider value={moduleData}>
//       {props.children}
//     </ModuleContext.Provider>
//   );
// };

// export default ModuleContextProvider;
